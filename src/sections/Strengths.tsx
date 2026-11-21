import { useState } from 'react'
import { about, asset } from '../data/content'
import { Reveal } from '../components/Reveal'
import { CountUp } from '../components/CountUp'
import { PlusIcon } from '../components/Icons'
import './strengths.css'

type Strength = (typeof about.strengths)[number]

/** Small animated illustration per strength (decorative). */
function Visual({ id }: { id: Strength['id'] }) {
  if (id === 'analysis')
    return (
      <div className="sv sv--matrix" aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} style={{ ['--d' as string]: `${(i % 4) * 90 + Math.floor(i / 4) * 140}ms` }} className={[1, 4, 6, 9, 11].includes(i) ? 'is-flag' : ''} />
        ))}
      </div>
    )
  if (id === 'communication')
    return (
      <div className="sv sv--langs" aria-hidden="true">
        {['UA', 'PL', 'RU', 'EN'].map((l, i) => (
          <span key={l} style={{ ['--i' as string]: i }}>
            {l}
          </span>
        ))}
      </div>
    )
  if (id === 'requirements')
    return (
      <div className="sv sv--window" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <span key={i} className={[2, 4, 5].includes(i) ? 'is-match' : ''} style={{ ['--i' as string]: i }} />
        ))}
        <b>24h</b>
      </div>
    )
  if (id === 'leadership')
    return (
      <div className="sv sv--eq" aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} style={{ ['--i' as string]: i }} />
        ))}
      </div>
    )
  if (id === 'organization')
    return (
      <div className="sv sv--gantt" aria-hidden="true">
        {[
          [0, 62],
          [18, 50],
          [8, 74],
          [34, 46],
          [22, 58],
        ].map(([l, w], i) => (
          <span key={i} style={{ ['--l' as string]: `${l}%`, ['--w' as string]: `${w}%`, ['--i' as string]: i }} />
        ))}
      </div>
    )
  return (
    <div className="sv sv--film" aria-hidden="true">
      {[1, 2, 3, 5].map((n) => (
        <img key={n} src={asset(`videos/spill-0${n}.webp`)} alt="" loading="lazy" decoding="async" />
      ))}
    </div>
  )
}

function StrengthCard({ s, i }: { s: Strength; i: number }) {
  const [open, setOpen] = useState(false)
  const listId = `strength-${s.id}`
  return (
    <Reveal as="li" delay={(i % 2) * 90} className={`scard scard--${s.id}${open ? ' is-open' : ''}`}>
      <div className="scard__top">
        <span className="scard__num">0{i + 1}</span>
        <ul className="scard__evidence" aria-label="Evidence">
          {s.evidence.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      </div>
      <Visual id={s.id} />
      <p className="sfig">
        <CountUp value={s.figure.value} prefix={s.figure.prefix} suffix={s.figure.suffix} />
        <span className="sfig__label">{s.figure.label}</span>
      </p>
      <h3 className="scard__title">{s.title}</h3>
      <p className="scard__text">{s.text}</p>
      <button type="button" className="scard__more" aria-expanded={open} aria-controls={listId} onClick={() => setOpen((v) => !v)}>
        <PlusIcon size={14} />
        {open ? 'Show less' : 'How it shows up'}
      </button>
      <div className="scard__details" id={listId} hidden={!open}>
        <ul>
          {s.details.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </div>
    </Reveal>
  )
}

export function Strengths() {
  return (
    <div className="strengths">
      <Reveal className="strengths__head">
        <span className="label">What I bring</span>
        <h2 className="strengths__title">
          Six strengths, <span>backed by real work.</span>
        </h2>
      </Reveal>
      <ol className="strengths__grid">
        {about.strengths.map((s, i) => (
          <StrengthCard key={s.id} s={s} i={i} />
        ))}
      </ol>
      <Reveal className="strengths__learning">
        <span className="strengths__plus" aria-hidden="true">
          +
        </span>
        <p>
          <b>{about.learning.title}.</b> {about.learning.text}
        </p>
        <span className="strengths__learning-ev">{about.learning.evidence}</span>
      </Reveal>
    </div>
  )
}
