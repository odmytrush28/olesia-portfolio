import type { ReactNode } from 'react'
import { projects, type Project } from '../../data/content'
import { Link } from '../../router'
import { ProjectCover } from '../../components/ProjectCover'
import { ArrowIcon, ArrowUpRight } from '../../components/Icons'
import './case.css'

/** Top of every case-study page: breadcrumb, title, key facts and the cover art. */
export function CaseHero({ p, meta, children }: { p: Project; meta?: { label: string; value: ReactNode }[]; children?: ReactNode }) {
  const rows = meta ?? [
    { label: 'My role', value: p.role },
    { label: 'Context', value: p.context },
    { label: 'Status', value: <span className={`status${p.statusTone === 'done' ? ' status--done' : ''}`}>{p.status}</span> },
  ]
  return (
    <section className="section case-hero" aria-labelledby="case-title">
      <div className="container">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/projects">
            <ArrowIcon size={14} /> All projects
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{p.short}</span>
        </nav>
        <div className="case-hero__grid">
          <div className="case-hero__text">
            <span className="label">
              Case study <b>{p.index}</b> · {p.category}
            </span>
            <h1 id="case-title" className="case-hero__title">
              {p.name}
            </h1>
            <p className="case-hero__lead">{p.summary}</p>
            <dl className="case-hero__meta">
              {rows.map((r) => (
                <div key={r.label}>
                  <dt>{r.label}</dt>
                  <dd>{r.value}</dd>
                </div>
              ))}
            </dl>
            {children}
          </div>
          <div className="case-hero__visual">
            <ProjectCover id={p.id} />
          </div>
        </div>
      </div>
    </section>
  )
}

/** Section heading inside a case study. */
export function CaseHead({ kicker, title, id, lead }: { kicker: string; title: ReactNode; id?: string; lead?: ReactNode }) {
  return (
    <header className="case-head">
      <span className="label">{kicker}</span>
      <h2 id={id} tabIndex={id ? -1 : undefined}>
        {title}
      </h2>
      {lead && <p className="case-head__lead">{lead}</p>}
    </header>
  )
}

export function Tools({ items }: { items: string[] }) {
  return (
    <ul className="case-tools">
      {items.map((t) => (
        <li key={t} className="tag">
          {t}
        </li>
      ))}
    </ul>
  )
}

export function Learned({ text }: { text: string }) {
  return (
    <blockquote className="case-learned">
      <span className="label label--plain">What I learned</span>
      <p>{text}</p>
    </blockquote>
  )
}

export function Links({ p }: { p: Project }) {
  if (!p.links?.length) return null
  return (
    <p className="case-links">
      {p.links.map((l) => (
        <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
          {l.label} <ArrowUpRight size={14} />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      ))}
    </p>
  )
}

/** Previous / next project. */
export function Pager({ id }: { id: string }) {
  const i = projects.findIndex((p) => p.id === id)
  const prev = projects[(i - 1 + projects.length) % projects.length]
  const next = projects[(i + 1) % projects.length]
  return (
    <nav className="pager" aria-label="More projects">
      <Link to={`/projects/${prev.id}`}>
        <span className="pager__dir">← Previous project</span>
        <span className="pager__name">{prev.short}</span>
      </Link>
      <Link to={`/projects/${next.id}`}>
        <span className="pager__dir">Next project →</span>
        <span className="pager__name">{next.short}</span>
      </Link>
    </nav>
  )
}

/** In-page "jump to" chips (Problem → My work → Solution → Result). */
export function JumpNav({ items }: { items: { id: string; label: string }[] }) {
  const go = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const nav = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 76
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - nav - 16, behavior: reduced ? 'auto' : 'smooth' })
    el.focus({ preventScroll: true })
  }
  return (
    <nav className="jump" aria-label="On this page">
      {items.map((it, i) => (
        <button key={it.id} type="button" onClick={() => go(it.id)}>
          <span>0{i + 1}</span>
          {it.label}
          {i < items.length - 1 && (
            <i aria-hidden="true">
              <ArrowIcon size={14} />
            </i>
          )}
        </button>
      ))}
    </nav>
  )
}
