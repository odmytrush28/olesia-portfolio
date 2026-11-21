import { Suspense, lazy, useEffect, useLayoutEffect, useRef, type MouseEvent } from 'react'
import { Nav } from './components/Nav'
import { Footer } from './sections/Footer'
import { takeLinkNavigation, useRoute } from './router'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { projects } from './data/content'

/* Other pages load on demand (smaller first download) and are prefetched while the browser is idle. */
const load = {
  about: () => import('./pages/AboutPage'),
  experience: () => import('./pages/ExperiencePage'),
  kpmg: () => import('./pages/KpmgPage'),
  projects: () => import('./pages/ProjectsPage'),
  project: () => import('./pages/ProjectPage'),
  studio: () => import('./pages/StudioPage'),
  contact: () => import('./pages/ContactPage'),
}
const AboutPage = lazy(() => load.about().then((m) => ({ default: m.AboutPage })))
const ExperiencePage = lazy(() => load.experience().then((m) => ({ default: m.ExperiencePage })))
const KpmgPage = lazy(() => load.kpmg().then((m) => ({ default: m.KpmgPage })))
const ProjectsPage = lazy(() => load.projects().then((m) => ({ default: m.ProjectsPage })))
const ProjectPage = lazy(() => load.project().then((m) => ({ default: m.ProjectPage })))
const StudioPage = lazy(() => load.studio().then((m) => ({ default: m.StudioPage })))
const ContactPage = lazy(() => load.contact().then((m) => ({ default: m.ContactPage })))

const TITLES: Record<string, string> = {
  '/': 'Olesia Dmytrush — Business Analyst · AI & Data Solutions · IT Audit & QA',
  '/about': 'About — Olesia Dmytrush',
  '/experience': 'Experience — Olesia Dmytrush',
  '/experience/kpmg': 'KPMG IT Audit & Assurance — Olesia Dmytrush',
  '/projects': 'Projects — Olesia Dmytrush',
  '/studio': 'Creative Studio — Olesia Dmytrush',
  '/contact': 'Contact — Olesia Dmytrush',
}

/** Remembers the scroll position of each page so Back/Forward return to the same spot. */
const scrollMemory = new Map<string, number>()

export function App() {
  const route = useRoute()
  const { parts, path } = route
  const prevPath = useRef(path)
  const lastY = useRef(0)

  // Prefetch the other pages once the first one has settled.
  useEffect(() => {
    type IdleWin = Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }
    const w = window as IdleWin
    const run = () => Object.values(load).forEach((f) => f().catch(() => undefined))
    const id = w.requestIdleCallback ? w.requestIdleCallback(run, { timeout: 4000 }) : window.setTimeout(run, 2500)
    return () => {
      if (!w.requestIdleCallback) clearTimeout(id)
    }
  }, [])

  // Track the scroll position of the current page.
  useEffect(() => {
    const on = () => {
      lastY.current = window.scrollY
    }
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  // Manual scroll handling: new page → top (or the requested section); Back/Forward → where you were.
  useLayoutEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    if (prevPath.current !== path) scrollMemory.set(prevPath.current, lastY.current)
    prevPath.current = path

    const project = parts[0] === 'projects' && parts[1] ? projects.find((p) => p.id === parts[1]) : null
    document.title = project ? `${project.short} — Olesia Dmytrush` : (TITLES[path] ?? TITLES[`/${parts[0] ?? ''}`] ?? TITLES['/'])

    // A section inside a page, e.g. #/about/journey → the element with id="journey".
    const sectionId = parts.length > 1 && parts[0] !== 'projects' && path !== '/experience/kpmg' ? parts[parts.length - 1] : null
    const fromLink = takeLinkNavigation()
    const remembered = fromLink ? undefined : scrollMemory.get(path)
    let raf = 0
    let tries = 0
    const go = () => {
      if (sectionId) {
        const el = document.getElementById(sectionId)
        if (el) {
          const nav = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 76
          window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - nav - 8, behavior: 'auto' })
          return
        }
        if (tries++ < 120) raf = requestAnimationFrame(go)
        return
      }
      if (remembered) {
        // Wait until the page is tall enough to scroll back to where the visitor was.
        if (document.documentElement.scrollHeight - window.innerHeight < remembered && tries++ < 120) {
          raf = requestAnimationFrame(go)
          return
        }
        window.scrollTo({ top: remembered, behavior: 'auto' })
      } else window.scrollTo({ top: 0, behavior: 'auto' })
    }
    go()
    // Move focus to the page for keyboard & screen-reader users (not on first load).
    if (firstRender.current) firstRender.current = false
    else document.getElementById('main')?.focus({ preventScroll: true })
    return () => cancelAnimationFrame(raf)
  }, [path, parts])

  const skip = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const main = document.getElementById('main')
    main?.focus()
    main?.scrollIntoView()
  }

  let page
  if (parts.length === 0) page = <HomePage />
  else if (parts[0] === 'about') page = <AboutPage />
  else if (parts[0] === 'experience' && parts[1] === 'kpmg') page = <KpmgPage />
  else if (parts[0] === 'experience') page = <ExperiencePage />
  else if (parts[0] === 'projects' && parts[1]) page = <ProjectPage id={parts[1]} />
  else if (parts[0] === 'projects') page = <ProjectsPage />
  else if (parts[0] === 'studio') page = <StudioPage />
  else if (parts[0] === 'contact') page = <ContactPage />
  else page = <NotFoundPage />

  return (
    <>
      <a className="skip-link" href="#main" onClick={skip}>
        Skip to content
      </a>
      <Nav path={path} onDark={parts[0] === 'studio' || parts[0] === 'contact'} />
      <main id="main" tabIndex={-1} key={path}>
        <Suspense fallback={<div className="page-loading" aria-busy="true" />}>{page}</Suspense>
      </main>
      <Footer />
    </>
  )
}

const firstRender = { current: true }
