/**
 * Builds IMAGE 2 — the hidden "AI layer" — for the WHOLE hero.
 *
 * Everything is measured from the live page, so the layer lines up with the
 * visible hero at any screen size:
 *  - dark "neural" background: grid, circuitry, soft accent glows
 *  - the oversized ghost words re-drawn as neon outlines (same font, same spot)
 *  - the futuristic portrait (transparent PNG/WebP) placed exactly over the photo
 *  - the hero copy re-drawn glyph-by-glyph in light/neon colours, so text stays
 *    readable wherever the liquid mask uncovers the dark layer
 *
 * Text that should be re-drawn is marked in the markup with `data-ai="<role>"`.
 */

type Rect = { x: number; y: number; w: number; h: number }
type Role = 'meta' | 'meta-strong' | 'eyebrow' | 'title' | 'title-accent' | 'intro' | 'hint' | 'scroll'

const PINK = '#ff3f6c'

const ROLE_STYLE: Record<Role, { fill: string; glow?: string; blur?: number; stroke?: string }> = {
  meta: { fill: '#a39fa6' },
  'meta-strong': { fill: '#ffffff' },
  eyebrow: { fill: '#ff9cb5' },
  title: { fill: '#ffffff', glow: 'rgba(255,63,108,0.55)', blur: 26 },
  'title-accent': { fill: PINK, glow: 'rgba(255,63,108,0.95)', blur: 30, stroke: '#ffd0dc' },
  intro: { fill: '#dcd2d9' },
  hint: { fill: '#b7aeb6' },
  scroll: { fill: '#ffffff' },
}

/** Tiny deterministic PRNG so the artwork is identical on every build. */
function rng(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

function relRect(el: Element, origin: DOMRect): Rect {
  const r = el.getBoundingClientRect()
  return { x: r.left - origin.left, y: r.top - origin.top, w: r.width, h: r.height }
}

/**
 * Draws the text inside `el` character by character at the exact positions the
 * browser laid it out (letter-spacing, wrapping and transforms included).
 */
function drawGlyphs(
  ctx: CanvasRenderingContext2D,
  el: Element,
  origin: DOMRect,
  paint: (ch: string, x: number, y: number, parent: HTMLElement) => void,
) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
  const range = document.createRange()
  let node: Node | null
  while ((node = walker.nextNode())) {
    const text = node as Text
    const parent = text.parentElement
    if (!parent) continue
    const cs = getComputedStyle(parent)
    if (cs.display === 'none' || cs.visibility === 'hidden') continue
    ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`
    const metrics = ctx.measureText('Hg')
    const ascent = metrics.fontBoundingBoxAscent || parseFloat(cs.fontSize) * 0.8
    const upper = cs.textTransform === 'uppercase'
    const data = text.data
    for (let i = 0; i < data.length; i++) {
      const raw = data[i]
      if (/\s/.test(raw)) continue
      range.setStart(text, i)
      range.setEnd(text, i + 1)
      const r = range.getClientRects()[0]
      if (!r || r.width === 0) continue
      paint(upper ? raw.toUpperCase() : raw, r.left - origin.left, r.top - origin.top + ascent, parent)
    }
  }
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

function codePanel(
  ctx: CanvasRenderingContext2D,
  mono: string,
  x: number,
  y: number,
  w: number,
  title: string,
  lines: string[],
  alpha = 1,
) {
  const lh = 19
  const h = 46 + lines.length * lh + 16
  ctx.save()
  ctx.globalAlpha = alpha
  roundRect(ctx, x, y, w, h, 14)
  ctx.fillStyle = 'rgba(24,13,24,0.82)'
  ctx.fill()
  ctx.strokeStyle = 'rgba(255,63,108,0.38)'
  ctx.lineWidth = 1
  ctx.stroke()
  ;['#ff5f57', '#febc2e', PINK].forEach((c, i) => {
    ctx.beginPath()
    ctx.arc(x + 18 + i * 14, y + 18, 3.5, 0, Math.PI * 2)
    ctx.fillStyle = c
    ctx.fill()
  })
  ctx.font = `500 11px ${mono}`
  ctx.fillStyle = 'rgba(255,205,218,0.75)'
  ctx.fillText(title, x + 70, y + 22)
  ctx.fillStyle = 'rgba(255,63,108,0.25)'
  ctx.fillRect(x + 12, y + 34, w - 24, 1)
  ctx.font = `400 12px ${mono}`
  lines.forEach((ln, i) => {
    const yy = y + 56 + i * lh
    if (ln.startsWith('#')) {
      // "#" lines render as abstract code bars
      let xx = x + 16
      ln.slice(1)
        .split(',')
        .forEach((seg, j) => {
          const len = Number(seg)
          ctx.fillStyle = ['rgba(255,63,108,0.55)', 'rgba(190,120,220,0.5)', 'rgba(240,225,232,0.35)'][j % 3]
          roundRect(ctx, xx, yy - 8, len, 7, 3.5)
          ctx.fill()
          xx += len + 9
        })
    } else {
      ctx.fillStyle = 'rgba(255,190,210,0.85)'
      ctx.fillText(ln, x + 16, yy)
    }
  })
  ctx.restore()
  return h
}

export type AiLayerInput = {
  hero: HTMLElement
  stage: HTMLElement
  portrait: HTMLImageElement
  maxTextureSize: number
}

export function buildAiLayer({ hero, stage, portrait, maxTextureSize }: AiLayerInput): HTMLCanvasElement {
  const origin = hero.getBoundingClientRect()
  const W = origin.width
  const H = origin.height
  const scale = Math.min(window.devicePixelRatio || 1, 2, (maxTextureSize * 0.98) / Math.max(W, H, 1))
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.round(W * scale))
  canvas.height = Math.max(1, Math.round(H * scale))
  const ctx = canvas.getContext('2d')!
  ctx.scale(scale, scale)
  ctx.textBaseline = 'alphabetic'

  const rootStyle = getComputedStyle(document.documentElement)
  const mono = rootStyle.getPropertyValue('--font-mono').trim() || 'monospace'
  const st = relRect(stage, origin)
  const face = { x: st.x + st.w * 0.425, y: st.y + st.h * 0.33 }
  const title = hero.querySelector('.hero__title')
  const tr = title ? relRect(title, origin) : { x: W * 0.05, y: H * 0.35, w: W * 0.4, h: H * 0.3 }

  // ── 1. Background ──
  const bg = ctx.createLinearGradient(0, 0, 0, H)
  bg.addColorStop(0, '#140b16')
  bg.addColorStop(1, '#08070b')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, W, H)

  const glow = (x: number, y: number, r: number, color: string) => {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r)
    g.addColorStop(0, color)
    g.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, W, H)
  }
  glow(face.x, face.y, Math.max(W, H) * 0.5, 'rgba(255,63,108,0.30)')
  glow(tr.x + tr.w * 0.45, tr.y + tr.h * 0.5, Math.max(tr.w, 320) * 0.9, 'rgba(150,40,130,0.24)')
  glow(W * 0.05, H, W * 0.35, 'rgba(255,63,108,0.10)')

  // Grid
  ctx.lineWidth = 1
  ctx.strokeStyle = 'rgba(255,63,108,0.07)'
  const step = 48
  ctx.beginPath()
  for (let x = (W % step) / 2; x < W; x += step) {
    ctx.moveTo(Math.round(x) + 0.5, 0)
    ctx.lineTo(Math.round(x) + 0.5, H)
  }
  for (let y = 0; y < H; y += step) {
    ctx.moveTo(0, Math.round(y) + 0.5)
    ctx.lineTo(W, Math.round(y) + 0.5)
  }
  ctx.stroke()
  ctx.fillStyle = 'rgba(255,150,180,0.22)'
  for (let x = (W % step) / 2; x < W; x += step * 2) {
    for (let y = 0; y < H; y += step * 2) ctx.fillRect(Math.round(x) - 1, y - 1, 2, 2)
  }

  // Circuit traces (deterministic)
  const rand = rng(20261017)
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  for (let i = 0; i < Math.round((W * H) / 52000); i++) {
    let x = Math.round((rand() * W) / step) * step + (W % step) / 2
    let y = Math.round((rand() * H) / step) * step
    ctx.beginPath()
    ctx.moveTo(x, y)
    const segs = 2 + Math.floor(rand() * 4)
    for (let s = 0; s < segs; s++) {
      const len = step * (1 + Math.floor(rand() * 3))
      const dir = Math.floor(rand() * 4)
      if (dir === 0) x += len
      else if (dir === 1) y += len
      else if (dir === 2) {
        x += len * 0.7
        y += len * 0.7
      } else {
        x -= len * 0.7
        y += len * 0.7
      }
      ctx.lineTo(x, y)
    }
    ctx.strokeStyle = `rgba(255,63,108,${0.16 + rand() * 0.18})`
    ctx.lineWidth = 1.2
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(x, y, 2.6, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(255,120,160,0.75)'
    ctx.fill()
  }

  // ── 2. Ghost words → neon outlines, at the exact same spot ──
  hero.querySelectorAll('.ghost').forEach((g) => {
    drawGlyphs(ctx, g, origin, (ch, x, y) => {
      ctx.save()
      ctx.shadowColor = 'rgba(255,63,108,0.8)'
      ctx.shadowBlur = 18
      ctx.lineWidth = 1.6
      ctx.strokeStyle = 'rgba(255,63,108,0.65)'
      ctx.strokeText(ch, x, y)
      ctx.restore()
      ctx.fillStyle = 'rgba(255,63,108,0.05)'
      ctx.fillText(ch, x, y)
    })
  })

  // ── 3. Code panels beside the portrait ──
  const pw = Math.min(330, Math.max(220, st.w * 0.36))
  codePanel(ctx, mono, st.x + st.w * 0.66, st.y + st.h * 0.15, pw, 'problem_patterns.sql', [
    'SELECT incident_id, area,',
    '       COUNT(*) AS repeats',
    'FROM   incidents',
    'GROUP  BY incident_id, area',
    'HAVING COUNT(*) > 1;',
    '#90,56,40',
  ])
  codePanel(ctx, mono, st.x + st.w * 0.7, st.y + st.h * 0.53, pw * 0.92, 'qa_checklist.md', [
    'expected == actual  ->  PASS',
    '#70,110',
    '#50,90,36',
  ], 0.9)

  // ── 4. The futuristic portrait, exactly over the photo ──
  const tmp = document.createElement('canvas')
  tmp.width = Math.max(1, Math.round(st.w * scale))
  tmp.height = Math.max(1, Math.round(st.h * scale))
  const tctx = tmp.getContext('2d')!
  tctx.drawImage(portrait, 0, 0, tmp.width, tmp.height)
  // Mobile layout fades the photo's lower edge — match it.
  const fade = getComputedStyle(stage, '::after').content
  if (fade && fade !== 'none') {
    const g = tctx.createLinearGradient(0, tmp.height * 0.74, 0, tmp.height * 0.97)
    g.addColorStop(0, 'rgba(0,0,0,0)')
    g.addColorStop(1, 'rgba(0,0,0,1)')
    tctx.globalCompositeOperation = 'destination-out'
    tctx.fillStyle = g
    tctx.fillRect(0, tmp.height * 0.74, tmp.width, tmp.height * 0.26)
  }
  ctx.drawImage(tmp, st.x, st.y, st.w, st.h)

  // ── 5. Small terminal block, only where there is free space ──
  const ctas = hero.querySelector('.hero__ctas')
  if (ctas) {
    const cr = relRect(ctas, origin)
    const lines = [
      '> load profile ........ olesia_dmytrush',
      '> experience .......... kpmg · i.c.stars',
      '> languages ........... ua · pl · ru · en',
      '> status .............. open_to_work ✓',
    ]
    const room = H - (cr.y + cr.h)
    if (room > 120 && cr.x + 330 < st.x + st.w * 0.2) {
      ctx.font = `400 11.5px ${mono}`
      lines.forEach((l, i) => {
        ctx.fillStyle = i === 3 ? 'rgba(255,120,160,0.9)' : 'rgba(220,200,212,0.55)'
        ctx.fillText(l, cr.x, cr.y + cr.h + 34 + i * 18)
      })
    }
  }

  // Subtle scanlines (under the copy, so text stays crisp)
  ctx.fillStyle = 'rgba(0,0,0,0.12)'
  for (let y = 0; y < H; y += 3) ctx.fillRect(0, y, W, 1)

  // ── 6. Hero copy, re-drawn in light / neon colours ──
  hero.querySelectorAll<HTMLElement>('[data-ai]').forEach((el) => {
    const role = el.dataset.ai as Role
    drawGlyphs(ctx, el, origin, (ch, x, y, parent) => {
      let r: Role = role
      if (parent.closest('.line--accent')) r = 'title-accent'
      else if (parent.matches('.dot, i') || parent.closest('.hero__eyebrow i')) r = 'title-accent'
      else if (role === 'meta' && parent.matches('b')) r = 'meta-strong'
      const s = ROLE_STYLE[r]
      if (s.glow) {
        ctx.save()
        ctx.shadowColor = s.glow
        ctx.shadowBlur = s.blur ?? 20
        ctx.fillStyle = s.fill
        ctx.fillText(ch, x, y)
        ctx.restore()
      }
      ctx.fillStyle = s.fill
      ctx.fillText(ch, x, y)
      if (s.stroke) {
        ctx.lineWidth = 1
        ctx.strokeStyle = s.stroke
        ctx.strokeText(ch, x, y)
      }
    })
  })

  return canvas
}
