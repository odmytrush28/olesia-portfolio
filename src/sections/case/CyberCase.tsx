import { useState } from 'react'
import { cyberChallenge as c, projects } from '../../data/content'
import { Reveal } from '../../components/Reveal'
import { CaseHead, CaseHero, Pager, Tools } from './CaseParts'
import { CheckIcon } from '../../components/Icons'

const p = projects.find((x) => x.id === 'cybersecurity-challenge')!

/** A tiny playable preview of the idea — written for this portfolio, not taken from the game. */
function ThreatPreview() {
  const [i, setI] = useState(0)
  const [pick, setPick] = useState<'safe' | 'suspicious' | null>(null)
  const [score, setScore] = useState(0)
  const done = i >= c.preview.length
  const q = c.preview[Math.min(i, c.preview.length - 1)]

  const choose = (a: 'safe' | 'suspicious') => {
    if (pick) return
    setPick(a)
    if (a === q.answer) setScore((s) => s + 1)
  }
  const next = () => {
    setPick(null)
    setI((n) => n + 1)
  }
  const restart = () => {
    setI(0)
    setPick(null)
    setScore(0)
  }

  return (
    <div className="threat">
      <div className="threat__top">
        <span className="threat__badge">Concept preview</span>
        <span className="threat__progress" aria-hidden="true">
          {c.preview.map((_, k) => (
            <i key={k} className={k < i ? 'is-done' : k === i ? 'is-now' : ''} />
          ))}
        </span>
        <span className="threat__score">
          Score <b>{score}</b>/{c.preview.length}
        </span>
      </div>

      {done ? (
        <div className="threat__end" role="status">
          <p className="threat__big">
            {score}/{c.preview.length}
          </p>
          <p>{score === c.preview.length ? 'Sharp eye — every threat spotted.' : 'Good start. In the full game, each mistake becomes a short lesson.'}</p>
          <button type="button" className="btn btn--ghost btn--sm" onClick={restart}>
            Play again
          </button>
        </div>
      ) : (
        <div className="threat__q">
          <span className="threat__kind">
            {i + 1} / {c.preview.length} · {q.kind}
          </span>
          <p className="threat__text">{q.text}</p>
          <div className="threat__choices" role="group" aria-label="Is it safe or suspicious?">
            {(['safe', 'suspicious'] as const).map((a) => (
              <button
                key={a}
                type="button"
                className={`threat__btn threat__btn--${a}${pick === a ? (a === q.answer ? ' is-right' : ' is-wrong') : ''}${pick && a === q.answer ? ' is-answer' : ''}`}
                onClick={() => choose(a)}
                disabled={Boolean(pick) && pick !== a && a !== q.answer}
                aria-pressed={pick === a}
              >
                {a === 'safe' ? 'Looks safe' : 'Suspicious'}
              </button>
            ))}
          </div>
          <div className="threat__why" aria-live="polite">
            {pick && (
              <>
                <p>
                  <b>{pick === q.answer ? 'Correct.' : 'Not quite.'}</b> {q.why}
                </p>
                <button type="button" className="btn btn--primary btn--sm" onClick={next}>
                  {i === c.preview.length - 1 ? 'See my score' : 'Next'}
                  <span className="btn__orb" aria-hidden="true">
                    →
                  </span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
      <p className="threat__note">A small playable sketch of the idea, made for this portfolio — not the game itself.</p>
    </div>
  )
}

export function CyberCase() {
  return (
    <div className="page case case--cyber">
      <CaseHero
        p={p}
        meta={[
          { label: 'Project type', value: c.type },
          { label: 'Focus', value: c.focus.join(' · ') },
          { label: 'Status', value: <span className="status">{c.status}</span> },
        ]}
      />

      <section className="section case-sec" aria-labelledby="overview">
        <div className="container case-split">
          <Reveal>
            <CaseHead kicker="01 · Project overview" id="overview" title={<>Security awareness, <span>learned by playing.</span></>} />
            {c.overview.map((t) => (
              <p key={t} className="case-text">
                {t}
              </p>
            ))}
          </Reveal>
          <Reveal delay={100}>
            <ThreatPreview />
          </Reveal>
        </div>
      </section>

      <section className="section section--alt case-sec" aria-labelledby="goals">
        <div className="container">
          <Reveal>
            <CaseHead kicker="02 · Project goals" id="goals" title={<>What the game <span>sets out to do.</span></>} />
          </Reveal>
          <ol className="goals">
            {c.goals.map((g, i) => (
              <Reveal as="li" key={g} delay={i * 70}>
                <span className="goals__num">0{i + 1}</span>
                <p>{g}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section case-sec" aria-labelledby="skills-shown">
        <div className="container">
          <Reveal>
            <CaseHead kicker="03 · Skills demonstrated" id="skills-shown" title={<>Product thinking <span>meets security.</span></>} />
          </Reveal>
          <Reveal as="ul" className="skillgrid" delay={60}>
            {c.skills.map((s) => (
              <li key={s}>
                <CheckIcon size={16} /> {s}
              </li>
            ))}
          </Reveal>
          <Reveal className="case-result" delay={80}>
            <div className="case-result__status">
              <span className="status">In development</span>
              <p>
                {c.status}. Screenshots and a live demo will be added here once the Tech Expo version is ready — nothing shown on this page is a final
                result.
              </p>
            </div>
            <div>
              <span className="label label--plain">Tools & methods</span>
              <Tools items={p.tools} />
            </div>
          </Reveal>
          <Pager id={p.id} />
        </div>
      </section>
    </div>
  )
}
