import { useState } from 'react'
import { asset, cycleSoundtrack as c, projects } from '../../data/content'
import { Reveal } from '../../components/Reveal'
import { Lightbox } from '../../components/Lightbox'
import { CaseHead, CaseHero, Pager, Tools } from './CaseParts'

const p = projects.find((x) => x.id === 'cycle-soundtrack')!
type Photo = (typeof c.photos)[number]

export function SoundtrackCase() {
  const [open, setOpen] = useState<Photo | null>(null)

  return (
    <div className="page case case--sound">
      <CaseHero
        p={p}
        meta={[
          { label: 'Created by', value: c.creators },
          { label: 'Program', value: `i.c.stars · ${c.cycle}` },
          { label: 'Status', value: <span className="status status--done">{c.presented}</span> },
        ]}
      />

      {/* The film */}
      <section className="section case-sec" aria-labelledby="film">
        <div className="container">
          <Reveal>
            <CaseHead kicker="01 · The Gift" id="film" title={<>Cycle Soundtrack — <span>our 14-week story.</span></>} lead={c.story} />
          </Reveal>
          <Reveal className="film2" delay={80}>
            <div className="film2__frame">
              <video
                controls
                playsInline
                preload="none"
                poster={asset(c.video.poster)}
                src={asset(c.video.src)}
                aria-label="Cycle Soundtrack — video by Olesia Dmytrush and Jordan Stephens"
              />
            </div>
            <p className="film2__cap">
              <span>Video · {c.video.duration}</span>
              <span>Created with Jordan Stephens for {c.cycle}</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* What a Gift is + score */}
      <section className="section section--alt case-sec" aria-labelledby="why">
        <div className="container case-split">
          <Reveal>
            <CaseHead kicker="02 · Leadership in Action" id="why" title={<>Giving when <span>resources are scarce.</span></>} />
            {c.gift.map((t) => (
              <p key={t} className="case-text">
                {t}
              </p>
            ))}
            <p className="case-text">{c.techbash}</p>
          </Reveal>
          <Reveal className="score" delay={100}>
            <span className="score__value">{c.score.value}</span>
            <span className="score__label">{c.score.label}</span>
            <ul className="score__list">
              {c.score.criteria.map((k) => (
                <li key={k}>
                  <span>{k}</span>
                  <i aria-hidden="true" />
                  <b>Full marks</b>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Recognition */}
      <section className="section case-sec" aria-labelledby="recognition">
        <div className="container">
          <Reveal>
            <CaseHead kicker="03 · Recognition" id="recognition" title={<>What the program <span>said about it.</span></>} />
          </Reveal>
          <ul className="quotes">
            {c.quotes.map((q, i) => (
              <Reveal as="li" key={q.quote} delay={i * 80} className="quote">
                <blockquote>
                  <p>“{q.quote}”</p>
                </blockquote>
                <p className="quote__by">
                  <b>{q.by}</b>
                  <span>{q.role}</span>
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* TechBash */}
      <section className="section section--alt case-sec" aria-labelledby="techbash">
        <div className="container">
          <Reveal>
            <CaseHead
              kicker="04 · TechBash 2026"
              id="techbash"
              title={<>Shown to Chicago’s <span>tech community.</span></>}
              lead="A celebratory evening of connection & creativity — where our Gift was shown on the big screen."
            />
          </Reveal>
          <ul className="photos">
            {c.photos.map((ph, i) => (
              <Reveal as="li" key={ph.file} delay={(i % 3) * 70} className={`photo${ph.w > ph.h ? ' photo--wide' : ''}`}>
                <button type="button" onClick={() => setOpen(ph)}>
                  <span className="sr-only">Enlarge photo: </span>
                  <img
                    src={asset(`images/techbash/${ph.file}-560.webp`)}
                    srcSet={`${asset(`images/techbash/${ph.file}-560.webp`)} 560w, ${asset(`images/techbash/${ph.file}.webp`)} 1100w`}
                    sizes="(max-width: 719px) 92vw, 34vw"
                    width={ph.w}
                    height={ph.h}
                    alt={ph.alt}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="photo__cap">{ph.caption}</span>
                </button>
              </Reveal>
            ))}
          </ul>
          <div className="case-result">
            <div className="case-result__status">
              <span className="status status--done">Completed</span>
              <p>
                Presented on Nov 10, 2026 and recognized by the i.c.stars Program Director in a message to the i.c.stars community on Nov 16, 2026.
              </p>
            </div>
            <div>
              <span className="label label--plain">My role</span>
              <p className="case-text case-text--sm">{p.role}</p>
              <Tools items={p.tools} />
            </div>
          </div>
          <Pager id={p.id} />
        </div>
      </section>

      <Lightbox
        item={open ? { type: 'image', src: asset(`images/techbash/${open.file}.webp`), alt: open.alt, caption: open.caption } : null}
        onClose={() => setOpen(null)}
      />
    </div>
  )
}
