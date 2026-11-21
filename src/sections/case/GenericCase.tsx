import { useState } from 'react'
import { aiVideo, asset, defectAnatomy, projects, qaCourseModules, type Project } from '../../data/content'
import { Reveal } from '../../components/Reveal'
import { Lightbox } from '../../components/Lightbox'
import { Link } from '../../router'
import { ArrowIcon } from '../../components/Icons'
import { CaseHead, CaseHero, Learned, Links, Pager, Tools } from './CaseParts'

function QaVisual({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="qa">
      <button type="button" className="qa__diploma" onClick={onOpen}>
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

function AiVisual() {
  return (
    <div className="aiv">
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
      <Link to="/studio" className="btn btn--primary">
        Watch it in the Creative Studio
        <span className="btn__orb" aria-hidden="true">
          <ArrowIcon />
        </span>
      </Link>
    </div>
  )
}

/** Case-study layout for projects described with the generic fields (QA, AI film). */
export function GenericCase({ p }: { p: Project }) {
  const [lightbox, setLightbox] = useState(false)
  const blocks = [
    { k: p.id === 'aivideo' ? 'The idea' : 'The problem', v: p.problem },
    { k: 'The goal', v: p.goal },
  ].filter((b) => b.v)

  return (
    <div className={`page case case--${p.id}`}>
      <CaseHero p={p} />

      <section className="section case-sec" aria-labelledby="story">
        <div className="container">
          <Reveal>
            <CaseHead kicker="01 · The story" id="story" title={<>Problem, goal <span>and my part.</span></>} />
          </Reveal>
          <div className="story-grid">
            {blocks.map((b, i) => (
              <Reveal key={b.k} className="story-card" delay={i * 80}>
                <h3>{b.k}</h3>
                <p>{b.v}</p>
              </Reveal>
            ))}
            {p.work && (
              <Reveal className="story-card story-card--wide" delay={160}>
                <h3>What I did</h3>
                <ul className="case-points case-points--list">
                  {p.work.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <section className="section section--alt case-sec" aria-labelledby="evidence">
        <div className="container">
          <Reveal>
            <CaseHead kicker="02 · Evidence" id="evidence" title={p.id === 'qa' ? <>Diploma & <span>method.</span></> : <>Five scenes, <span>one message.</span></>} />
          </Reveal>
          <Reveal delay={60}>{p.id === 'qa' ? <QaVisual onOpen={() => setLightbox(true)} /> : <AiVisual />}</Reveal>
          <div className="case-result">
            <Reveal className="case-result__status">
              <span className={`status${p.statusTone === 'done' ? ' status--done' : ''}`}>{p.status}</span>
              <p>{p.outcome}</p>
            </Reveal>
            <Reveal delay={80}>
              <span className="label label--plain">Tools & methods</span>
              <Tools items={p.tools} />
              <Links p={p} />
            </Reveal>
          </div>
          {p.learned && <Learned text={p.learned} />}
          <Pager id={p.id} />
        </div>
      </section>

      {p.id === 'qa' && (
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
      )}
    </div>
  )
}

export const findProject = (id: string) => projects.find((p) => p.id === id)
