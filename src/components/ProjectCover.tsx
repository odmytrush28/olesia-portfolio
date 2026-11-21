import type { JSX } from 'react'
import { aiVideo, asset, rollingDemo } from '../data/content'
import '../sections/projects.css'

/* Cover art — designed from each project's real content (decorative, aria-hidden). */

function MedlineCover() {
  const cats = rollingDemo.categories
  const list = rollingDemo.incidents.slice(0, 5)
  return (
    <div className="cover cover--medline" aria-hidden="true">
      <div className="cover__grid" />
      <div className="mc">
        <div className="mc__col">
          {list.map((inc, i) => (
            <span key={inc.id} className="mc__inc" style={{ ['--i' as string]: i }}>
              <b>{inc.id}</b> {cats[inc.cat].label}
            </span>
          ))}
        </div>
        <svg className="mc__flow" viewBox="0 0 60 200" preserveAspectRatio="none">
          <path d="M0 20 C 30 20, 30 100, 60 100 M0 60 C 30 60, 30 100, 60 100 M0 100 L60 100 M0 140 C 30 140, 30 100, 60 100 M0 180 C 30 180, 30 100, 60 100" />
        </svg>
        <div className="mc__col mc__col--problems">
          <span className="mc__rule">
            <b>3</b> similar <i>in a rolling 24 h</i>
          </span>
          <span className="mc__prob" style={{ ['--i' as string]: 1 }}>
            <b>PRB-001</b>
            {cats.scanner.label} · recurring
            <i>→ {cats.scanner.team}</i>
          </span>
        </div>
      </div>
      <div className="cover__modules">
        <span>AI analysis</span>
        <span>Problem Record</span>
        <span>Resolution</span>
      </div>
    </div>
  )
}

function CyberCover() {
  return (
    <div className="cover cover--cyber" aria-hidden="true">
      <div className="cover__grid" />
      <div className="cy__card">
        <span className="cy__kind">Incoming email</span>
        <p className="cy__text">“Your account will be closed today — verify your password here.”</p>
        <div className="cy__choices">
          <span className="cy__btn">Safe</span>
          <span className="cy__btn cy__btn--hot">Suspicious</span>
        </div>
      </div>
      <div className="cy__shield">
        <svg viewBox="0 0 48 56">
          <path d="M24 2 4 10v14c0 14 8.6 24.4 20 30 11.4-5.6 20-16 20-30V10L24 2Z" />
          <path d="m15 28 6.5 6.5L34 22" />
        </svg>
      </div>
      <div className="cy__level">
        <span>Level 1</span>
        <i style={{ ['--w' as string]: '64%' }} />
      </div>
    </div>
  )
}

function SoundtrackCover() {
  return (
    <div className="cover cover--sound" aria-hidden="true">
      <img src={asset('images/techbash/techbash-500-560.webp')} alt="" loading="lazy" decoding="async" />
      <div className="sc__eq">
        {Array.from({ length: 18 }, (_, i) => (
          <span key={i} style={{ ['--i' as string]: i }} />
        ))}
      </div>
      <span className="sc__score">
        <b>100%</b> Gift Scorecard
      </span>
      <span className="sc__title">
        Cycle
        <br />
        Soundtrack
      </span>
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
  'cybersecurity-challenge': CyberCover,
  'cycle-soundtrack': SoundtrackCover,
  qa: QaCover,
  aivideo: AiVideoCover,
}

export function ProjectCover({ id }: { id: string }) {
  const C = COVERS[id]
  return C ? <C /> : <div className="cover cover--plain" aria-hidden="true" />
}
