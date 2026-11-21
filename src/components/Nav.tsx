import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent as ReactKeyboardEvent, type MouseEvent as ReactMouseEvent } from 'react'
import { asset, experience, nav, profile, projects, resumes } from '../data/content'
import { Link, isActive, navigate } from '../router'
import { useMagnetic } from '../hooks/useMagnetic'
import { ArrowIcon, ArrowUpRight, CloseIcon, DownloadIcon, LinkedInIcon, MailIcon } from './Icons'
import './nav.css'

type NavId = (typeof nav)[number]['id']
const ids: string[] = nav.map((n) => n.id)

/** Small visual shown beside the menu for the hovered / focused item. */
function MenuPreview({ id }: { id: NavId }) {
  switch (id) {
    case 'home':
      return <img className="mprev__img mprev__img--wide" src={asset('hero/hero-desk-1000.webp')} alt="" />
    case 'about':
      return <img className="mprev__img" src={asset('images/olesia-portrait-480.webp')} alt="" />
    case 'experience':
      return (
        <ul className="mprev__list">
          {experience.map((r) => (
            <li key={r.id}>
              <b>{r.company}</b>
              <span>{r.dates}</span>
            </li>
          ))}
        </ul>
      )
    case 'projects':
      return (
        <ul className="mprev__list">
          {projects.map((p) => (
            <li key={p.id}>
              <b>{p.short}</b>
              <span>{p.status}</span>
            </li>
          ))}
        </ul>
      )
    case 'studio':
      return <img className="mprev__img" src={asset('videos/spill-05.webp')} alt="" />
    case 'contact':
      return (
        <p className="mprev__contact">
          <span>{profile.email}</span>
          <span>{profile.location} · open to relocation</span>
        </p>
      )
  }
}

export function Nav({ path, onDark = false }: { path: string; onDark?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState<NavId>('home')
  const [resumeOpen, setResumeOpen] = useState(false)
  const [origin, setOrigin] = useState({ x: '92%', y: '40px' })
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.2)
  const menuBtnRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const activeIndex = Math.max(
    0,
    nav.findIndex((n) => isActive(path, n.to)),
  )
  const activeItem = nav[activeIndex]

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [path])

  const openMenu = (from?: HTMLElement | null) => {
    const el = from ?? menuBtnRef.current
    if (el) {
      const r = el.getBoundingClientRect()
      setOrigin({ x: `${r.left + r.width / 2}px`, y: `${r.top + r.height / 2}px` })
    }
    setHovered(activeItem.id)
    setResumeOpen(false)
    setOpen(true)
  }

  const closeMenu = useCallback((returnFocus = true) => {
    setOpen(false)
    if (returnFocus) menuBtnRef.current?.focus({ preventScroll: true })
  }, [])

  // Close the menu whenever the page changes (e.g. Back button).
  useEffect(() => {
    setOpen(false)
  }, [path])

  // Lock page scroll, Escape closes, focus the current page's link when opened
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu()
    }
    window.addEventListener('keydown', onKey)
    const t = window.setTimeout(() => {
      const panel = panelRef.current
      ;(panel?.querySelector<HTMLElement>('.mnav__link.is-current') ?? panel?.querySelector<HTMLElement>('.mnav__link'))?.focus()
    }, 80)
    return () => {
      clearTimeout(t)
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, closeMenu])

  // Keep keyboard focus inside the open menu
  const trapFocus = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab' || !panelRef.current) return
    const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')).filter(
      (el) => el.offsetParent !== null,
    )
    if (!items.length) return
    const first = items[0]
    const last = items[items.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  const go = (to: string) => (e: ReactMouseEvent) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return
    e.preventDefault()
    closeMenu(false)
    // Let the scroll lock lift before the page changes.
    window.setTimeout(() => navigate(to), 40)
  }

  const ring = 2 * Math.PI * 15

  return (
    <>
      <header className={`nav${scrolled ? ' is-scrolled' : ''}${onDark ? ' nav--on-dark' : ''}`}>
        <div className="nav__inner container">
          <Link to="/" className="brand" aria-label="Olesia Dmytrush — home">
            <span className="brand__line" aria-hidden="true" />
            <span className="brand__name">
              {profile.firstName} <b>{profile.lastName}</b>
            </span>
          </Link>

          <nav className="nav__links" aria-label="Main">
            <ul>
              {nav.slice(1).map((item) => {
                const current = isActive(path, item.to)
                return (
                  <li key={item.id}>
                    <Link to={item.to} className={current ? 'is-current' : undefined} aria-current={current ? 'page' : undefined}>
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="nav__actions">
            <button type="button" className="nav__now" onClick={(e) => openMenu(e.currentTarget)}>
              <span className="sr-only">Current page: </span>
              <svg className="nav__ring" viewBox="0 0 36 36" aria-hidden="true">
                <circle cx="18" cy="18" r="15" />
                <circle cx="18" cy="18" r="15" style={{ strokeDasharray: ring, strokeDashoffset: ring * (1 - progress) }} />
              </svg>
              <span className="nav__now-num">0{activeIndex + 1}</span>
              <span className="nav__now-label" key={activeItem.id}>
                {activeItem.label}
              </span>
              <span className="sr-only"> — open menu</span>
            </button>

            <Link ref={ctaRef} to="/contact" className="btn btn--primary btn--sm nav__cta">
              Let’s connect
              <span className="btn__orb" aria-hidden="true">
                <ArrowIcon size={15} />
              </span>
            </Link>
            <Link to="/contact" className="nav__mail" aria-label="Contact Olesia">
              <MailIcon size={18} />
            </Link>

            <button
              ref={menuBtnRef}
              type="button"
              className="nav__menu"
              aria-label="Menu"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => openMenu()}
            >
              <span className="nav__menu-label">Menu</span>
              <span className="nav__menu-icon" aria-hidden="true">
                <i />
                <i />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu */}
      <div
        id="site-menu"
        ref={panelRef}
        className={`mnav${open ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!open}
        inert={!open}
        onKeyDown={trapFocus}
        style={{ '--ox': origin.x, '--oy': origin.y } as CSSProperties}
      >
        <div className="mnav__grain" aria-hidden="true" />
        <div className="mnav__top container">
          <span className="brand brand--light">
            <span className="brand__line" aria-hidden="true" />
            <span className="brand__name">
              {profile.firstName} <b>{profile.lastName}</b>
            </span>
          </span>
          <button type="button" className="mnav__close" onClick={() => closeMenu()}>
            <span>Close</span>
            <span className="mnav__close-icon" aria-hidden="true">
              <CloseIcon size={20} />
            </span>
          </button>
        </div>

        <div className="mnav__body container">
          <nav className="mnav__nav" aria-label="Pages">
            <ol className="mnav__list" onMouseLeave={() => setHovered(activeItem.id)}>
              {nav.map((item, i) => {
                const current = isActive(path, item.to)
                return (
                  <li key={item.id} style={{ '--i': i } as CSSProperties} className={hovered === item.id ? 'is-hovered' : undefined}>
                    <a
                      href={`#${item.to}`}
                      className={`mnav__link${current ? ' is-current' : ''}`}
                      aria-current={current ? 'page' : undefined}
                      onClick={go(item.to)}
                      onMouseEnter={() => setHovered(item.id)}
                      onFocus={() => setHovered(item.id)}
                    >
                      <span className="mnav__num">0{i + 1}</span>
                      <span className="mnav__label" data-text={item.menuLabel}>
                        {item.menuLabel}
                      </span>
                      <span className="mnav__sub">{item.sub}</span>
                    </a>
                  </li>
                )
              })}
              <li style={{ '--i': nav.length } as CSSProperties} className="mnav__resume">
                <button
                  type="button"
                  className="mnav__link mnav__link--btn"
                  aria-expanded={resumeOpen}
                  aria-controls="menu-resumes"
                  onClick={() => setResumeOpen((v) => !v)}
                >
                  <span className="mnav__num">
                    <DownloadIcon size={14} />
                  </span>
                  <span className="mnav__label mnav__label--sm">Download résumé</span>
                </button>
                <ul id="menu-resumes" className={`mnav__resumes${resumeOpen ? ' is-open' : ''}`} hidden={!resumeOpen}>
                  {resumes.map((r) => (
                    <li key={r.id}>
                      <a href={asset(r.file)} download>
                        <span>{r.label}</span>
                        <small>{r.focus}</small>
                        <DownloadIcon size={15} />
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ol>
          </nav>

          <aside className="mnav__preview" aria-hidden="true">
            {open && (
              <div className="mprev" key={hovered}>
                <span className="mprev__num">0{ids.indexOf(hovered) + 1}</span>
                <div className="mprev__visual">
                  <MenuPreview id={hovered} />
                </div>
                <p className="mprev__sub">{nav.find((n) => n.id === hovered)?.sub}</p>
              </div>
            )}
          </aside>
        </div>

        <div className="mnav__foot container">
          <a href={`mailto:${profile.email}`} className="mnav__contact">
            <MailIcon size={16} /> {profile.email}
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="mnav__contact">
            <LinkedInIcon size={16} /> LinkedIn <ArrowUpRight size={14} />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          <span className="mnav__avail">
            <i aria-hidden="true" /> {profile.availability}
          </span>
        </div>
      </div>
    </>
  )
}
