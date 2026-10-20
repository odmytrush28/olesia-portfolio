import { useEffect, useRef, useState, type JSX } from 'react'
import { aiVideo, asset, defectAnatomy, incidentDemo, projects, qaCourseModules, type Project, type ProjectCategory } from '../data/content'
import { SectionHead } from '../components/SectionHead'
import { Reveal } from '../components/Reveal'
import { Lightbox } from '../components/Lightbox'
import { ArrowIcon, ArrowUpRight, CloseIcon } from '../components/Icons'
import { IncidentDemo } from './IncidentDemo'
import './projects.css'

const CATEGORIES: ('All' | ProjectCategory)[] = ['All', 'Product & BA', 'QA & Testing', 'Operations', 'Creative & AI']

/* ───────────── Cover art: designed from each project's real content ───────────── */

function MedlineCover() {
  const problems = incidentDemo.problems
  return (
    <div className="cover cover--medline" aria-hidden="true">
      <div className="cover__grid" />
      <div className="mc">
        <div className="mc__col">
          {incidentDemo.incidents.slice(0, 5).map((inc, i) => (
            <span key={inc.id} className="mc__inc" style={{ ['--i' as string]: i }}>
              <b>{inc.id}</b> {inc.text}
            </span>
          ))}
        </div>
        <svg className="mc__flow" viewBox="0 0 60 200" preserveAspectRatio="none">
          <path d="M0 20 C 30 20, 30 100, 60 100 M0 60 C 30 60, 30 100, 60 100 M0 100 L60 100 M0 140 C 30 140, 30 100, 60 100 M0 180 C 30 180, 30 100, 60 100" />
        </svg>
        <div className="mc__col mc__col--problems">
          {problems.map((p, i) => (
            <span key={p.id} className="mc__prob" style={{ ['--i' as string]: i }}>
              <b>{p.id.replace('P', 'PRB-0')}</b>
              {p.title}
              <i>→ {p.team}</i>
            </span>
          ))}
        </div>
      </div>
      <div className="cover__modules">
        <span>Incidents</span>
        <span>Problem Register</span>
        <span>Resolution Manager</span>
      </div>
    </div>
  )
}

function QaCover() {
  return (
    <div className="cover cover--qa" aria-hidden="true">
      <img className="qc__diploma" src={asset('images/qa-diploma-600.webp')} alt="" loading="lazy" decoding="async" />
      <div className="qc__card">
        <span className="qc__row">
          <i>Expected</i> What the requirement says
        </span>
        <span className="qc__row qc__row--fail">
          <i>Actual</i> What really happened
        </span>
        <span className="qc__verdict">Gap → defect report</span>
      </div>
    </div>
  )
}

function RealEstateCover() {
  return (
    <div className="cover cover--re" aria-hidden="true">
      <span className="rc__big">100+</span>
      <span className="rc__label">transactions supported</span>
      <div className="rc__agents">
        {Array.from({ length: 8 }, (_, i) => (
          <span key={i} style={{ ['--i' as string]: i }} />
        ))}
      </div>
      <div className="rc__tags">
        <span>MLS</span>
        <span>Canva</span>
        <span>CapCut</span>
        <span>Excel</span>
      </div>
    </div>
  )
}

function AiVideoCover() {
  return (
    <div className="cover cover--ai" aria-hidden="true">
      {aiVideo.film.scenes.map((s, i) => (
        <img key={s.id} src={asset(`videos/${s.id}.webp`)} alt="" loading="lazy" decoding="async" style={{ ['--i' as string]: i }} />
      ))}
      <span className="ac__play">▶</span>
    </div>
  )
}

const COVERS: Record<string, () => JSX.Element> = {
  medline: MedlineCover,
  qa: QaCover,
  realestate: RealEstateCover,
  aivideo: AiVideoCover,
}

/* ───────────── Case-study details (shown in the dialog) ───────────── */

function Meta({ p }: { p: Project }) {
  return (
    <dl className="case__meta">
      <div>
        <dt>Status</dt>
        <dd>
          <span className={`status${p.statusTone === 'done' ? ' status--done' : ''}`}>{p.status}</span>
        </dd>
      </div>
      <div>
        <dt>My role</dt>
        <dd>{p.role}</dd>
      </div>
      <div>
        <dt>Context</dt>
        <dd>{p.context}</dd>
      </div>
      <div>
        <dt>Tools &amp; methods</dt>
        <dd>
          <ul className="case__tools">
            {p.tools.map((t) => (
              <li key={t} className="tag">
                {t}
              </li>
            ))}
          </ul>
        </dd>
      </div>
      {p.links?.length ? (
        <div>
          <dt>Links</dt>
          <dd className="case__links">
            {p.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
                {l.label} <ArrowUpRight size={14} />
              </a>
            ))}
          </dd>
        </div>
      ) : (
        <div>
          <dt>Links</dt>
          <dd className="case__nolinks">No public repository or live demo yet.</dd>
        </div>
      )}
    </dl>
  )
}

function Story({ p }: { p: Project }) {
  return (
    <div className="case__story">
      <div className="case__block">
        <h4>{p.id === 'aivideo' ? 'Idea' : 'Problem'}</h4>
        <p>{p.problem}</p>
      </div>
      <div className="case__block">
        <h4>Goal</h4>
        <p>{p.goal}</p>
      </div>
      <div className="case__block">
        <h4>What I did</h4>
        <ul className="case__work">
          {p.work.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
      </div>
      <div className="case__block">
        <h4>Result / status</h4>
        <p>{p.outcome}</p>
      </div>
      {p.learned && (
        <blockquote className="case__takeaway">
          <span className="label label--plain">What I learned</span>
          <p>{p.learned}</p>
        </blockquote>
      )}
    </div>
  )
}

function MedlineVisual() {
  return (
    <div className="case__visual">
      <div className="modules" aria-label="Application modules">
        {['Incidents', 'Problem Register', 'Resolution Manager'].map((m, i) => (
          <div key={m} className="module">
            <span className="module__num">0{i + 1}</span>
            <span className="module__name">{m}</span>
          </div>
        ))}
      </div>
      <IncidentDemo />
    </div>
  )
}

function QaVisual({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="case__visual qa">
      <button type="button" className="qa__diploma" onClick={onOpen} aria-label="Click to enlarge: QC/QA Engineer diploma">
        <img
          src={asset('images/qa-diploma-600.webp')}
          srcSet={`${asset('images/qa-diploma-600.webp')} 600w, ${asset('images/qa-diploma.webp')} 1218w`}
          sizes="(max-width: 899px) 92vw, 540px"
          width={600}
          height={421}
          alt="Diploma: Olesya Dmytrush has successfully completed QC/QA Engineer, TOMMY Online University"
          loading="lazy"
          decoding="async"
        />
        <span className="qa__zoom">Click to enlarge</span>
      </button>

      <div className="qa__modules">
        <span className="label label--plain">Course modules</span>
        <ul>
          {qaCourseModules.map((m) => (
            <li key={m} className="tag">
              {m}
            </li>
          ))}
        </ul>
      </div>

      <div className="bug">
        <div className="bug__bar" aria-hidden="true">
          <i />
          <i />
          <i />
          <span>defect-report.template</span>
        </div>
        <p className="bug__intro">How I structure a defect report</p>
        <dl className="bug__fields">
          {defectAnatomy.map((f, i) => (
            <div key={f.field} className={`bug__row${i === 3 || i === 4 ? ' bug__row--key' : ''}`}>
              <dt>{f.field}</dt>
              <dd>{f.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}

function RealEstateVisual({ p }: { p: Project }) {
  return (
    <div className="case__visual re">
      <ul className="re__figures">
        {p.figures?.map((f) => (
          <li key={f.label}>
            <span className="re__value">{f.value}</span>
            <span className="re__label">{f.label}</span>
          </li>
        ))}
      </ul>
      <div className="re__hub" aria-label="People I coordinated with">
        <span className="re__core">Coordination</span>
        {['Clients', 'Agents', 'Attorneys', 'Transaction partners'].map((s, i) => (
          <span key={s} className={`re__node re__node--${i + 1}`}>
            {s}
          </span>
        ))}
        <svg className="re__lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M50 50 L18 20 M50 50 L82 20 M50 50 L18 80 M50 50 L82 80" />
        </svg>
      </div>
    </div>
  )
}

function AiVisual({ onWatch }: { onWatch: () => void }) {
  return (
    <div className="case__visual aiv">
      <ol className="aiv__strip">
        {aiVideo.film.scenes.map((s, i) => (
          <li key={s.id}>
            <img src={asset(`videos/${s.id}.webp`)} alt={`Scene ${i + 1}: ${s.title}`} loading="lazy" decoding="async" />
            <span>
              0{i + 1} · {s.title}
            </span>
          </li>
        ))}
      </ol>
      <button type="button" className="btn btn--primary" onClick={onWatch}>
        Watch it in the Creative Studio
        <span className="btn__orb" aria-hidden="true">
          <ArrowIcon />
        </span>
      </button>
    </div>
  )
}

/* ───────────── Section ───────────── */

export function Projects() {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>('All')
  const [openId, setOpenId] = useState<string | null>(null)
  const [lightbox, setLightbox] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const openProject = projects.find((p) => p.id === openId) ?? null

  useEffect(() => {
    const d = dialogRef.current
    if (!d) return
    if (openId && !d.open) {
      d.showModal()
      d.scrollTop = 0
    }
    if (!openId && d.open) d.close()
  }, [openId])

  const visible = filter === 'All' ? projects : projects.filter((p) => p.category === filter)
  const counts = (c: (typeof CATEGORIES)[number]) => (c === 'All' ? projects.length : projects.filter((p) => p.category === c).length)

  const watchFilm = () => {
    setOpenId(null)
    window.setTimeout(() => document.getElementById('studio')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
  }

  return (
    <section id="projects" className="section projects" aria-labelledby="projects-title">
      <div className="container">
        <SectionHead
          id="projects-title"
          index="04"
          label="Projects"
          title={['Work that shows', '*how I think.*']}
          lead="Mini case studies: the problem, my role, what I actually did, and what is verified so far — no invented results."
          split
        />

        <div className="pfilters" role="group" aria-label="Filter projects by category">
          {CATEGORIES.map((c) => (
            <button key={c} type="button" aria-pressed={filter === c} className={filter === c ? 'is-active' : ''} onClick={() => setFilter(c)}>
              {c}
              <sup>{counts(c)}</sup>
            </button>
          ))}
        </div>

        <ul className="pgrid">
          {visible.map((p, i) => {
            const Cover = COVERS[p.id]
            return (
              <Reveal as="li" key={p.id} delay={(i % 2) * 90} className={`pcard pcard--${p.id}`}>
                <article>
                  <div className="pcard__cover" onClick={() => setOpenId(p.id)} aria-hidden="true">
                    {Cover ? <Cover /> : null}
                    <span className="pcard__index">{p.index}</span>
                  </div>
                  <div className="pcard__body">
                    <p className="pcard__meta">
                      <span>{p.category}</span>
                      <span className={`status${p.statusTone === 'done' ? ' status--done' : ''}`}>{p.status}</span>
                    </p>
                    <h3 className="pcard__title">{p.name}</h3>
                    <p className="pcard__summary">{p.summary}</p>
                    <ul className="pcard__tags" aria-label="Tools">
                      {p.tools.slice(0, 4).map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                    <div className="pcard__actions">
                      <button type="button" className="pcard__cta" onClick={() => setOpenId(p.id)}>
                        View details
                        <span aria-hidden="true">
                          <ArrowIcon size={16} />
                        </span>
                        <span className="sr-only">: {p.name}</span>
                      </button>
                      <span className="pcard__role">My role: {p.role}</span>
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </ul>
      </div>

      <dialog
        ref={dialogRef}
        className="pdialog"
        aria-labelledby="pdialog-title"
        onClose={() => setOpenId(null)}
        onClick={(e) => e.target === dialogRef.current && setOpenId(null)}
      >
        {openProject && (
          <div className="pdialog__inner">
            <header className="pdialog__head">
              <div className="pdialog__cover">{COVERS[openProject.id]?.()}</div>
              <div className="pdialog__titles">
                <span className="label">
                  Case study <b>{openProject.index}</b> · {openProject.category}
                </span>
                <h3 id="pdialog-title" className="pdialog__title">
                  {openProject.name}
                </h3>
              </div>
            </header>
            <div className="case__grid">
              <aside className="case__aside">
                <Meta p={openProject} />
              </aside>
              <Story p={openProject} />
            </div>
            {openProject.id === 'medline' && <MedlineVisual />}
            {openProject.id === 'qa' && <QaVisual onOpen={() => setLightbox(true)} />}
            {openProject.id === 'realestate' && <RealEstateVisual p={openProject} />}
            {openProject.id === 'aivideo' && <AiVisual onWatch={watchFilm} />}
          </div>
        )}
        <button type="button" className="pdialog__close" onClick={() => setOpenId(null)} aria-label="Close case study" autoFocus>
          <CloseIcon />
        </button>
      </dialog>

      <Lightbox
        item={
          lightbox
            ? {
                type: 'image',
                src: asset('images/qa-diploma.webp'),
                alt: 'Diploma: Olesya Dmytrush has successfully completed QC/QA Engineer, TOMMY Online University',
                caption: 'QC/QA Engineer diploma — TOMMY Online University (name spelled “Olesya” on the certificate).',
              }
            : null
        }
        onClose={() => setLightbox(false)}
      />
    </section>
  )
}
