import { useState } from 'react'
import { projects, type Project, type ProjectCategory } from '../data/content'
import { SectionHead } from '../components/SectionHead'
import { Reveal } from '../components/Reveal'
import { ProjectCover } from '../components/ProjectCover'
import { Link } from '../router'
import { ArrowIcon } from '../components/Icons'
import './projects.css'

const CATEGORIES: ('All' | ProjectCategory)[] = ['All', 'Business Analysis', 'Cybersecurity', 'Leadership', 'QA & Testing', 'Creative & AI']

/** A project card: the whole card opens the case-study page. */
export function ProjectCard({ p, i, size = 'normal', level = 3 }: { p: Project; i: number; size?: 'normal' | 'feature'; level?: 2 | 3 }) {
  const to = `/projects/${p.id}`
  const H = level === 2 ? 'h2' : 'h3'
  return (
    <Reveal as="li" delay={(i % 3) * 80} className={`pcard pcard--${p.id}${size === 'feature' ? ' pcard--feature' : ''}`}>
      <article>
        <div className="pcard__cover" aria-hidden="true">
          <ProjectCover id={p.id} />
          <span className="pcard__index">{p.index}</span>
        </div>
        <div className="pcard__body">
          <p className="pcard__meta">
            <span>{p.category}</span>
            <span className={`status${p.statusTone === 'done' ? ' status--done' : ''}`}>{p.status}</span>
          </p>
          <H className="pcard__title">
            <Link to={to} className="pcard__link">
              {p.name}
            </Link>
          </H>
          <p className="pcard__summary">{p.summary}</p>
          {p.highlight && (
            <p className="pcard__highlight">
              <b>{p.highlight.value}</b> {p.highlight.label}
            </p>
          )}
          <ul className="pcard__tags" aria-label="Tools and methods">
            {p.tools.slice(0, size === 'feature' ? 6 : 4).map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <div className="pcard__actions">
            <span className="pcard__cta" aria-hidden="true">
              View case study
              <span>
                <ArrowIcon size={16} />
              </span>
            </span>
            <span className="pcard__role">My role: {p.role}</span>
          </div>
        </div>
      </article>
    </Reveal>
  )
}

export function Projects() {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>('All')
  const visible = filter === 'All' ? projects : projects.filter((p) => p.category === filter)
  const counts = (c: (typeof CATEGORIES)[number]) => (c === 'All' ? projects.length : projects.filter((p) => p.category === c).length)

  return (
    <section id="projects" className="section projects" aria-labelledby="projects-title">
      <div className="container">
        <SectionHead
          id="projects-title"
          index="04"
          label="Projects"
          level={1}
          title={['Work that shows', '*how I think.*']}
          lead="Case studies: the problem, my role, what I actually did, and what is verified so far — no invented results. Open any project for the full story."
          split
        />

        <div className="pfilters" role="group" aria-label="Filter projects by area">
          {CATEGORIES.map((c) => (
            <button key={c} type="button" aria-pressed={filter === c} className={filter === c ? 'is-active' : ''} onClick={() => setFilter(c)}>
              {c}
              <sup>{counts(c)}</sup>
            </button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          {`Showing ${visible.length} project${visible.length === 1 ? '' : 's'}`}
        </p>

        <ul className={`pgrid${filter === 'All' ? ' pgrid--with-feature' : ''}`} key={filter}>
          {visible.map((p, i) => (
            <ProjectCard key={p.id} p={p} i={i} level={2} size={filter === 'All' && p.featured ? 'feature' : 'normal'} />
          ))}
        </ul>
      </div>
    </section>
  )
}
