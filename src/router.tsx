/**
 * Tiny hash router (no dependency).
 *
 * Pages live at #/about, #/projects/medline … so the site works on GitHub Pages
 * without server rewrites, and every page change is a real browser-history
 * entry — the browser's Back button returns to the previous page instead of
 * leaving the site.
 */
import { useEffect, useState, type AnchorHTMLAttributes, type MouseEvent, type ReactNode, type Ref } from 'react'

export type Route = {
  /** e.g. "/projects/medline" */
  path: string
  /** e.g. ["projects", "medline"] */
  parts: string[]
}

/** Old one-page anchors (#projects, #contact …) still open the right page. */
const LEGACY: Record<string, string> = {
  home: '/',
  main: '/',
  about: '/about',
  journey: '/about/journey',
  skills: '/experience/skills',
  experience: '/experience',
  projects: '/projects',
  studio: '/studio',
  contact: '/contact',
}

export function parseHash(hash: string): Route {
  let raw = decodeURIComponent(hash.replace(/^#/, ''))
  if (!raw.startsWith('/')) raw = LEGACY[raw] ?? (raw ? `/${raw}` : '/')
  const parts = raw.split('/').filter(Boolean)
  return { path: `/${parts.join('/')}`, parts }
}

export const href = (to: string) => `#${to === '/' ? '/' : to}`

/** Link clicks open a page at its top; Back/Forward restore the previous position. */
let linkNavigation = false
export const markLinkNavigation = () => {
  linkNavigation = true
}
export const takeLinkNavigation = () => {
  const v = linkNavigation
  linkNavigation = false
  return v
}

export function navigate(to: string) {
  markLinkNavigation()
  const next = href(to)
  if (window.location.hash === next) {
    window.dispatchEvent(new HashChangeEvent('hashchange'))
    return
  }
  window.location.hash = next
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash))
  useEffect(() => {
    const on = () => setRoute(parseHash(window.location.hash))
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return route
}

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  to: string
  children: ReactNode
  ref?: Ref<HTMLAnchorElement>
}

/** In-app link. Plain <a href="#/…"> so it works without JS, opens in new tabs, etc. */
export function Link({ to, children, onClick, ref, ...rest }: LinkProps) {
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    markLinkNavigation()
    // Same URL: re-run the scroll logic (e.g. clicking "Projects" while on Projects).
    if (window.location.hash === href(to)) {
      e.preventDefault()
      navigate(to)
    }
  }
  return (
    <a ref={ref} href={href(to)} onClick={handle} {...rest}>
      {children}
    </a>
  )
}

/** Whether `current` is `to` or a sub-page of it. */
export const isActive = (current: string, to: string) => (to === '/' ? current === '/' : current === to || current.startsWith(`${to}/`))
