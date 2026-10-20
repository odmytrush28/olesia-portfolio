import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react'
import { asset, hero } from '../../data/content'
import { LiquidReveal, loadImage } from './liquidReveal'
import { buildAiLayer } from './aiLayer'
import { useFinePointer, useReducedMotion } from '../../hooks/useMediaQuery'
import { useMagnetic } from '../../hooks/useMagnetic'
import { ArrowIcon } from '../Icons'
import './hero.css'

/** Where the face sits inside the portrait (0–1), used for the keyboard / tap toggle. */
const FACE = { x: 0.425, y: 0.33 }
const HOLD_MS = 170
const MOVE_TOLERANCE = 10
const INTERACTIVE = 'a, button, input, textarea, select, label'

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const revealRef = useRef<LiquidReveal | null>(null)
  const portraitRef = useRef<HTMLImageElement | null>(null)
  const loadState = useRef<'idle' | 'loading' | 'ready'>('idle')
  const pinned = useRef(false)

  const reduced = useReducedMotion()
  const fine = useFinePointer()
  const [aiOn, setAiOn] = useState(false)

  const primaryRef = useMagnetic<HTMLAnchorElement>(0.22)
  const secondaryRef = useMagnetic<HTMLAnchorElement>(0.18)

  const portraitSrc = () => {
    const w = stageRef.current?.getBoundingClientRect().width ?? 1000
    return asset(w * Math.min(window.devicePixelRatio || 1, 2) > 1100 ? 'hero/hero-ai-portrait.webp' : 'hero/hero-ai-portrait-1000.webp')
  }

  /** (Re)compose IMAGE 2 from the current layout and hand it to the engine. */
  const rebuild = useCallback(() => {
    const reveal = revealRef.current
    const heroEl = heroRef.current
    const stage = stageRef.current
    const portrait = portraitRef.current
    if (!reveal || !heroEl || !stage || !portrait) return
    reveal.resize()
    reveal.setSource(buildAiLayer({ hero: heroEl, stage, portrait, maxTextureSize: reveal.maxTextureSize }))
  }, [])

  /** Create the engine lazily (first interaction) so the first paint stays light. */
  const ensureLoaded = useCallback(() => {
    if (!canvasRef.current || loadState.current !== 'idle') return
    loadState.current = 'loading'
    if (!revealRef.current) {
      revealRef.current = new LiquidReveal(canvasRef.current, { reducedMotion: reduced })
      revealRef.current.resize()
    }
    Promise.all([loadImage(portraitSrc()), document.fonts?.ready ?? Promise.resolve()])
      .then(([img]) => {
        portraitRef.current = img
        rebuild()
        loadState.current = 'ready'
      })
      .catch(() => {
        loadState.current = 'idle'
      })
  }, [reduced, rebuild])

  // Keep IMAGE 2 aligned when the hero changes size (resize, rotation, font swap).
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    let t = 0
    const ro = new ResizeObserver(() => {
      if (loadState.current !== 'ready') return
      clearTimeout(t)
      t = window.setTimeout(rebuild, 160)
    })
    ro.observe(el)
    return () => {
      clearTimeout(t)
      ro.disconnect()
    }
  }, [rebuild])

  useEffect(
    () => () => {
      revealRef.current?.destroy()
      revealRef.current = null
      loadState.current = 'idle'
    },
    [],
  )

  useEffect(() => {
    revealRef.current?.setReducedMotion(reduced)
  }, [reduced])

  /** While the browser is idle, only prefetch the bytes — no main-thread work. */
  useEffect(() => {
    type IdleWin = Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }
    const w = window as IdleWin
    const prefetch = () => {
      const link = document.createElement('link')
      link.rel = 'prefetch'
      link.as = 'image'
      link.href = portraitSrc()
      document.head.appendChild(link)
    }
    const id = w.requestIdleCallback ? w.requestIdleCallback(prefetch, { timeout: 2500 }) : window.setTimeout(prefetch, 1200)
    return () => {
      if (w.cancelIdleCallback) w.cancelIdleCallback(id)
      else clearTimeout(id)
    }
  }, [])

  /** Client → hero-local coordinates. */
  const local = (clientX: number, clientY: number) => {
    const r = heroRef.current!.getBoundingClientRect()
    return { x: clientX - r.left, y: clientY - r.top }
  }

  const showAtFace = useCallback(() => {
    const heroEl = heroRef.current
    const stage = stageRef.current
    if (!heroEl || !stage) return
    ensureLoaded()
    const h = heroEl.getBoundingClientRect()
    const s = stage.getBoundingClientRect()
    revealRef.current?.reset()
    revealRef.current?.move(s.left - h.left + s.width * FACE.x, s.top - h.top + s.height * FACE.y)
  }, [ensureLoaded])

  // ── Mouse / pen: the reveal follows the pointer anywhere in the hero ──
  const onPointerMove = (e: ReactPointerEvent) => {
    if (e.pointerType === 'touch') return
    ensureLoaded()
    const p = local(e.clientX, e.clientY)
    revealRef.current?.move(p.x, p.y)
    const c = cursorRef.current
    if (c) {
      c.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`
      c.classList.toggle('is-over-ui', Boolean((e.target as Element).closest?.(INTERACTIVE)))
    }
  }

  const onPointerEnter = (e: ReactPointerEvent) => {
    if (e.pointerType === 'touch') return
    ensureLoaded()
    if (!pinned.current) revealRef.current?.reset()
    cursorRef.current?.classList.add('is-on')
  }

  const onPointerLeave = (e: ReactPointerEvent) => {
    if (e.pointerType === 'touch') return
    cursorRef.current?.classList.remove('is-on')
    if (pinned.current) showAtFace()
    else revealRef.current?.hide()
  }

  // ── Touch: tap = short peek; press & hold = drag the reveal (page scroll paused) ──
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    let holdTimer = 0
    let hideTimer = 0
    let start = { x: 0, y: 0 }
    let holding = false
    let moved = false
    let ignore = false

    const onStart = (e: TouchEvent) => {
      ignore = e.touches.length !== 1 || Boolean((e.target as Element).closest?.(INTERACTIVE))
      if (ignore) return
      ensureLoaded()
      const t = e.touches[0]
      start = { x: t.clientX, y: t.clientY }
      moved = false
      holding = false
      clearTimeout(hideTimer)
      holdTimer = window.setTimeout(() => {
        if (moved) return
        holding = true
        const p = local(start.x, start.y)
        revealRef.current?.reset()
        revealRef.current?.move(p.x, p.y)
      }, HOLD_MS)
    }
    const onMove = (e: TouchEvent) => {
      if (ignore) return
      const t = e.touches[0]
      if (!t) return
      if (holding) {
        e.preventDefault() // the reveal owns this gesture
        const p = local(t.clientX, t.clientY)
        revealRef.current?.move(p.x, p.y)
        return
      }
      if (Math.hypot(t.clientX - start.x, t.clientY - start.y) > MOVE_TOLERANCE) {
        moved = true // it's a scroll — stay out of the way
        clearTimeout(holdTimer)
      }
    }
    const onEnd = () => {
      if (ignore) return
      clearTimeout(holdTimer)
      const settle = () => {
        if (pinned.current) showAtFace()
        else revealRef.current?.hide()
      }
      if (holding) {
        holding = false
        hideTimer = window.setTimeout(settle, 650)
      } else if (!moved) {
        // Quick tap: a short peek at the tapped spot.
        const p = local(start.x, start.y)
        revealRef.current?.reset()
        revealRef.current?.move(p.x, p.y)
        hideTimer = window.setTimeout(settle, 1400)
      }
    }
    el.addEventListener('touchstart', onStart, { passive: true })
    el.addEventListener('touchmove', onMove, { passive: false })
    el.addEventListener('touchend', onEnd)
    el.addEventListener('touchcancel', onEnd)
    return () => {
      clearTimeout(holdTimer)
      clearTimeout(hideTimer)
      el.removeEventListener('touchstart', onStart)
      el.removeEventListener('touchmove', onMove)
      el.removeEventListener('touchend', onEnd)
      el.removeEventListener('touchcancel', onEnd)
    }
  }, [ensureLoaded, showAtFace])

  // ── Accessible toggle (keyboard, touch, reduced motion) ──
  const toggleAi = () => {
    const next = !aiOn
    setAiOn(next)
    pinned.current = next
    if (next) showAtFace()
    else revealRef.current?.hide()
  }

  // ── Subtle parallax of the floating chips (the ghost words stay put so the
  //    neon copies in the AI layer line up exactly) ──
  useEffect(() => {
    const el = heroRef.current
    if (!el || !fine || reduced) return
    let raf = 0
    const onMove = (e: PointerEvent) => {
      const x = e.clientX / window.innerWidth - 0.5
      const y = e.clientY / window.innerHeight - 0.5
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--px', x.toFixed(3))
        el.style.setProperty('--py', y.toFixed(3))
      })
    }
    el.addEventListener('pointermove', onMove)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('pointermove', onMove)
    }
  }, [fine, reduced])

  const [l1, accentWord, l3, l4] = hero.headline

  return (
    <section
      id="home"
      ref={heroRef}
      className="hero"
      aria-labelledby="hero-title"
      onPointerMove={onPointerMove}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      // Absolute URL: a url() inside a CSS variable resolves against the stylesheet, not the page.
      style={{ '--eye': `url(${new URL(asset('hero/hero-ai-eye.webp'), document.baseURI).href})` } as CSSProperties}
    >
      <div className="hero__ghost" aria-hidden="true">
        <span className="ghost ghost--1">{hero.ghostWords[0]}</span>
        <span className="ghost ghost--2">{hero.ghostWords[1]}</span>
        <span className="ghost ghost--3">{hero.ghostWords[2]}</span>
      </div>

      <div className="hero__meta container" aria-hidden="true">
        <span className="hero__index" data-ai="meta">
          [ <b>01</b> ] &nbsp;Index / Home
        </span>
        <span className="hero__avail" data-ai="meta">
          <i /> Open to opportunities — nationwide
        </span>
      </div>

      <div ref={stageRef} className="hero__stage">
        <img
          className="hero__img"
          src={asset('hero/hero-clean.webp')}
          srcSet={`${asset('hero/hero-clean-700.webp')} 700w, ${asset('hero/hero-clean.webp')} 1000w`}
          sizes="(max-width: 899px) 120vw, 62vw"
          width={1000}
          height={934}
          alt="Portrait of Olesia Dmytrush in a white blazer"
          fetchPriority="high"
          decoding="async"
          draggable={false}
        />
        <ul className="hero__chips" aria-hidden="true">
          {hero.chips.map((c, i) => (
            <li key={c.text} className={`pill hero__chip hero__chip--${i + 1}`}>
              <span className="pill__icon">{c.icon}</span>
              {c.text}
            </li>
          ))}
        </ul>
      </div>

      <div className="hero__content container">
        <p className="hero__eyebrow" data-ai="eyebrow">
          {hero.eyebrow.map((w, i) => (
            <span key={w}>
              {i > 0 && <i aria-hidden="true">•</i>}
              {w}
            </span>
          ))}
        </p>
        <h1 id="hero-title" className="hero__title" data-ai="title">
          <span className="line">{l1}</span>
          <span className="line line--accent">{accentWord}</span>
          <span className="line">{l3}</span>
          <span className="line">
            {l4}
            <span className="dot">.</span>
          </span>
        </h1>
        <p className="hero__intro" data-ai="intro">
          {hero.intro}
        </p>
        <div className="hero__ctas">
          <a ref={primaryRef} className="btn btn--primary" href="#contact">
            Let’s connect
            <span className="btn__orb btn__orb--eye" aria-hidden="true">
              <ArrowIcon />
            </span>
          </a>
          <a ref={secondaryRef} className="btn btn--ghost" href="#projects">
            View my work
          </a>
        </div>
      </div>

      {/* IMAGE 2 — the hidden AI layer, revealed through the liquid mask */}
      <canvas ref={canvasRef} className="hero__fx" aria-hidden="true" />

      <div className="hero__foot container">
        <div className="hero__hint">
          <span className="hero__hint-text hero__hint-text--fine" data-ai="hint">
            ( Move your cursor to discover more )
          </span>
          <span className="hero__hint-text hero__hint-text--touch" data-ai="hint">
            ( Touch &amp; hold to discover )
          </span>
          <button
            type="button"
            className={`hero__toggle${aiOn ? ' is-on' : ''}`}
            aria-pressed={aiOn}
            onClick={toggleAi}
            onFocus={ensureLoaded}
          >
            <span className="hero__toggle-icon" aria-hidden="true" />
            {aiOn ? 'Hide AI side' : 'Reveal AI side'}
          </button>
        </div>
        <a className="hero__scroll" href="#about" data-ai="scroll">
          Scroll
          <span aria-hidden="true" />
        </a>
      </div>

      <span className="hero__vertical" aria-hidden="true">
        Portfolio — © 2026
      </span>

      <div ref={cursorRef} className="hero__cursor" aria-hidden="true">
        <span className="hero__cursor-dot" />
        <span className="hero__cursor-label">Reveal</span>
      </div>

      <p className="sr-only" aria-live="polite">
        {aiOn ? 'Futuristic AI layer shown over the portrait.' : ''}
      </p>
    </section>
  )
}
