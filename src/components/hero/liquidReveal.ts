/**
 * LiquidReveal — draws IMAGE 2 (the futuristic layer) on a canvas that covers
 * the whole hero, visible only inside an organic, morphing, feathered "liquid"
 * mask that follows the pointer with inertia.
 *
 *  - Image 1 is never touched: it is the normal page underneath.
 *  - Only the mask moves/deforms. Image 2 is composed from the same layout
 *    measurements as the page (see aiLayer.ts), so both stay perfectly aligned.
 *  - WebGL (fast, smooth 60fps); falls back to Canvas 2D if unavailable.
 *  - Renders only while the mask is visible — zero cost when idle.
 */

export type RevealOptions = {
  reducedMotion: boolean
}

type Vec = { x: number; y: number }
type Source = HTMLCanvasElement | HTMLImageElement

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`

const FRAG = `
precision highp float;
varying vec2 v_uv;
uniform sampler2D u_tex;
uniform vec2 u_res;
uniform vec2 u_b0;
uniform vec2 u_b1;
uniform vec2 u_b2;
uniform float u_r;
uniform float u_scale;
uniform float u_time;
uniform float u_feather;

// Signed distance to a wobbling blob: radius modulated by layered sines of the angle.
float blob(vec2 p, vec2 c, float r, float t, float seed) {
  vec2 d = p - c;
  float a = atan(d.y, d.x);
  float n = 0.115 * sin(3.0 * a + t * 1.10 + seed)
          + 0.070 * sin(5.0 * a - t * 1.55 + seed * 1.7)
          + 0.042 * sin(8.0 * a + t * 2.20 + seed * 2.9)
          + 0.022 * sin(13.0 * a - t * 2.85 + seed * 0.7);
  return length(d) - r * (1.0 + n);
}

// Smooth union — melts the trailing blobs into one liquid shape.
float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

void main() {
  vec2 uv = vec2(v_uv.x, 1.0 - v_uv.y);
  vec2 p = uv * u_res;
  float R = u_r * u_scale;

  // Low-frequency domain warp keeps the edge liquid even when the pointer rests.
  p += vec2(sin(p.y * 0.011 + u_time * 0.9), cos(p.x * 0.010 - u_time * 0.75)) * (u_r * 0.06);

  float d = blob(p, u_b0, R, u_time, 0.0);
  d = smin(d, blob(p, u_b1, R * 0.80, u_time * 1.08, 2.1), R * 0.5);
  d = smin(d, blob(p, u_b2, R * 0.58, u_time * 1.21, 4.3), R * 0.5);

  float mask = 1.0 - smoothstep(-u_feather, u_feather, d);

  // Gentle fade at the very bottom so the reveal never ends in a hard line.
  float edge = smoothstep(0.0, 0.025, 1.0 - uv.y);

  vec4 col = texture2D(u_tex, uv);
  float a = mask * edge;

  // Soft accent glow hugging the outside of the liquid edge.
  float outside = max(d, 0.0);
  float rim = exp(-pow(outside / (u_feather * 1.5), 2.0)) * (1.0 - mask) * 0.34 * edge * smoothstep(0.15, 0.5, u_scale);
  // Thin bright line just inside the edge, like light on a glass lens.
  float inner = exp(-pow((d + u_feather * 0.6) / (u_feather * 0.45), 2.0)) * mask * 0.32 * edge;

  vec3 pink = vec3(1.0, 0.247, 0.424);
  vec3 rgb = col.rgb * a + pink * (rim + inner);
  float alpha = clamp(a + rim * 0.75, 0.0, 1.0);
  gl_FragColor = vec4(min(rgb, vec3(alpha + inner)), alpha);
}`

export class LiquidReveal {
  private canvas: HTMLCanvasElement
  private opts: RevealOptions
  private gl: WebGLRenderingContext | null = null
  private loc: Record<string, WebGLUniformLocation | null> = {}
  private tex: WebGLTexture | null = null
  private ctx2d: CanvasRenderingContext2D | null = null
  private mask2d: HTMLCanvasElement | null = null
  private source: Source | null = null
  private ready = false

  private dpr = 1
  private target: Vec = { x: 0, y: 0 }
  private balls: Vec[] = [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]
  private scale = 0
  private scaleTarget = 0
  private time = 3.7
  private last = 0
  private raf = 0
  private placed = false
  private destroyed = false

  /** Base radius in CSS px; the visible blob spans roughly 2.2× this. */
  radius = 150

  constructor(canvas: HTMLCanvasElement, opts: RevealOptions) {
    this.canvas = canvas
    this.opts = opts
    this.initGL() || this.init2D()
  }

  get isWebGL() {
    return Boolean(this.gl)
  }

  /** Largest texture this device accepts (used to size Image 2). */
  get maxTextureSize() {
    return this.gl ? (this.gl.getParameter(this.gl.MAX_TEXTURE_SIZE) as number) : 4096
  }

  /** Use a canvas or image as IMAGE 2 (call again after the layout changes). */
  setSource(source: Source) {
    if (this.destroyed) return
    this.source = source
    this.upload()
    this.ready = true
    if (this.scale > 0.001 || this.scaleTarget > 0) this.kick()
  }

  setReducedMotion(v: boolean) {
    this.opts.reducedMotion = v
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect()
    this.dpr = Math.min(window.devicePixelRatio || 1, 2)
    const W = Math.max(1, Math.round(rect.width * this.dpr))
    const H = Math.max(1, Math.round(rect.height * this.dpr))
    if (this.canvas.width !== W || this.canvas.height !== H) {
      this.canvas.width = W
      this.canvas.height = H
      if (this.mask2d) {
        this.mask2d.width = Math.ceil(W / 2)
        this.mask2d.height = Math.ceil(H / 2)
      }
    }
    // Scale the blob with the hero, but keep it within ~200–390px overall.
    this.radius = Math.max(92, Math.min(176, Math.min(rect.width, rect.height) * 0.17))
    if (this.scale > 0.001) this.kick()
  }

  /** Pointer position in CSS px relative to the canvas. */
  move(x: number, y: number) {
    this.target.x = x
    this.target.y = y
    if (!this.placed) {
      // First contact: start the liquid where the pointer is (no sweep-in from 0,0).
      this.balls.forEach((b) => {
        b.x = x
        b.y = y
      })
      this.placed = true
    }
    this.scaleTarget = 1
    this.kick()
  }

  /** Collapse the mask (pointer left the interaction area). */
  hide() {
    this.scaleTarget = 0
    this.kick()
  }

  /** Forget the last position so the next reveal starts where the pointer enters. */
  reset() {
    this.placed = false
  }

  destroy() {
    this.destroyed = true
    cancelAnimationFrame(this.raf)
    const ext = this.gl?.getExtension('WEBGL_lose_context')
    ext?.loseContext()
  }

  // ───────────────────────── internals ─────────────────────────

  private kick() {
    if (this.raf || this.destroyed) return
    this.last = performance.now()
    this.raf = requestAnimationFrame(this.frame)
  }

  private frame = (now: number) => {
    this.raf = 0
    const dt = Math.min(64, now - this.last) / 16.667
    this.last = now
    const reduced = this.opts.reducedMotion

    // Frame-rate independent easing toward targets.
    const ease = (k: number) => 1 - Math.pow(1 - k, dt)
    const [b0, b1, b2] = this.balls
    const k0 = reduced ? 1 : ease(0.2)
    const k1 = reduced ? 1 : ease(0.11)
    const k2 = reduced ? 1 : ease(0.07)
    b0.x += (this.target.x - b0.x) * k0
    b0.y += (this.target.y - b0.y) * k0
    b1.x += (b0.x - b1.x) * k1
    b1.y += (b0.y - b1.y) * k1
    b2.x += (b1.x - b2.x) * k2
    b2.y += (b1.y - b2.y) * k2

    const ks = reduced ? 1 : ease(this.scaleTarget > this.scale ? 0.12 : 0.13)
    this.scale += (this.scaleTarget - this.scale) * ks
    if (!reduced) this.time += dt / 60

    this.draw()

    const settled = this.scaleTarget === 0 && this.scale < 0.015
    if (settled) {
      this.scale = 0
      this.clear()
      return
    }
    // Keep animating while visible (the edge morphs continuously).
    if (!reduced || Math.abs(this.scaleTarget - this.scale) > 0.001) {
      this.raf = requestAnimationFrame(this.frame)
    }
  }

  private draw() {
    if (!this.ready) return
    if (this.gl) this.drawGL()
    else this.draw2D()
  }

  private clear() {
    if (this.gl) {
      this.gl.clearColor(0, 0, 0, 0)
      this.gl.clear(this.gl.COLOR_BUFFER_BIT)
    } else if (this.ctx2d) {
      this.ctx2d.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
  }

  // ── WebGL path ──

  private initGL(): boolean {
    let gl: WebGLRenderingContext | null = null
    try {
      gl = this.canvas.getContext('webgl', {
        premultipliedAlpha: true,
        alpha: true,
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: 'low-power',
      })
    } catch {
      gl = null
    }
    if (!gl) return false

    const compile = (type: number, src: string) => {
      const sh = gl!.createShader(type)!
      gl!.shaderSource(sh, src)
      gl!.compileShader(sh)
      if (!gl!.getShaderParameter(sh, gl!.COMPILE_STATUS)) {
        console.warn(gl!.getShaderInfoLog(sh))
        return null
      }
      return sh
    }
    const vs = compile(gl.VERTEX_SHADER, VERT)
    const fs = compile(gl.FRAGMENT_SHADER, FRAG)
    if (!vs || !fs) return false
    const prog = gl.createProgram()!
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return false
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(prog, 'a_pos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    for (const name of ['u_tex', 'u_res', 'u_b0', 'u_b1', 'u_b2', 'u_r', 'u_scale', 'u_time', 'u_feather']) {
      this.loc[name] = gl.getUniformLocation(prog, name)
    }
    this.gl = gl

    this.canvas.addEventListener('webglcontextlost', (e) => {
      e.preventDefault()
      cancelAnimationFrame(this.raf)
      this.raf = 0
      this.ready = false
      this.tex = null
    })
    this.canvas.addEventListener('webglcontextrestored', () => {
      this.initGL()
      if (this.source) {
        this.upload()
        this.ready = true
      }
    })
    return true
  }

  private upload() {
    const gl = this.gl
    if (!gl || !this.source) return
    if (!this.tex) this.tex = gl.createTexture()
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, this.tex)
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.source)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.uniform1i(this.loc.u_tex, 0)
  }

  private drawGL() {
    const gl = this.gl!
    const d = this.dpr
    gl.viewport(0, 0, this.canvas.width, this.canvas.height)
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.uniform2f(this.loc.u_res, this.canvas.width, this.canvas.height)
    const [b0, b1, b2] = this.balls
    gl.uniform2f(this.loc.u_b0, b0.x * d, b0.y * d)
    gl.uniform2f(this.loc.u_b1, b1.x * d, b1.y * d)
    gl.uniform2f(this.loc.u_b2, b2.x * d, b2.y * d)
    gl.uniform1f(this.loc.u_r, this.radius * d)
    gl.uniform1f(this.loc.u_scale, this.scale)
    gl.uniform1f(this.loc.u_time, this.time)
    gl.uniform1f(this.loc.u_feather, 11 * d)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  }

  // ── Canvas 2D fallback (same shape math, drawn as paths) ──

  private init2D() {
    this.ctx2d = this.canvas.getContext('2d')
    this.mask2d = document.createElement('canvas')
  }

  private blobPath(ctx: CanvasRenderingContext2D, c: Vec, r: number, t: number, seed: number, s: number) {
    const steps = 72
    ctx.beginPath()
    for (let i = 0; i <= steps; i++) {
      const a = (i / steps) * Math.PI * 2 - Math.PI
      const n =
        0.115 * Math.sin(3 * a + t * 1.1 + seed) +
        0.07 * Math.sin(5 * a - t * 1.55 + seed * 1.7) +
        0.042 * Math.sin(8 * a + t * 2.2 + seed * 2.9) +
        0.022 * Math.sin(13 * a - t * 2.85 + seed * 0.7)
      const rr = r * (1 + n)
      const x = (c.x + Math.cos(a) * rr) * s
      const y = (c.y + Math.sin(a) * rr) * s
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.closePath()
    ctx.fill()
  }

  private draw2D() {
    const ctx = this.ctx2d
    const m = this.mask2d
    if (!ctx || !m || !this.source) return
    const mctx = m.getContext('2d')!
    const s = (this.dpr * m.width) / Math.max(1, this.canvas.width)
    mctx.clearRect(0, 0, m.width, m.height)
    mctx.filter = `blur(${Math.round(7 * this.dpr * s)}px)`
    mctx.fillStyle = '#000'
    const R = this.radius * this.scale
    const t = this.time
    this.blobPath(mctx, this.balls[0], R, t, 0, s)
    this.blobPath(mctx, this.balls[1], R * 0.8, t * 1.08, 2.1, s)
    this.blobPath(mctx, this.balls[2], R * 0.58, t * 1.21, 4.3, s)
    mctx.filter = 'none'

    const W = this.canvas.width
    const H = this.canvas.height
    ctx.globalCompositeOperation = 'source-over'
    ctx.clearRect(0, 0, W, H)
    ctx.drawImage(this.source, 0, 0, W, H)
    ctx.globalCompositeOperation = 'destination-in'
    ctx.drawImage(m, 0, 0, W, H)
    ctx.globalCompositeOperation = 'source-over'
  }
}

/** Loads and decodes an image off the main thread. */
export function loadImage(src: string): Promise<HTMLImageElement> {
  const img = new Image()
  img.decoding = 'async'
  img.src = src
  return img.decode().then(() => img)
}
