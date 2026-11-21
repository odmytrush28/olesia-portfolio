import { medlineCase as m, projects } from '../../data/content'
import { Reveal } from '../../components/Reveal'
import { CountUp } from '../../components/CountUp'
import { CaseHead, CaseHero, JumpNav, Learned, Pager, Tools } from './CaseParts'
import { RollingDemo } from './RollingDemo'

const p = projects.find((x) => x.id === 'medline')!

/* A scatter of tickets — the same issue hides among many others. */
const TICKETS = [
  ['Dock 3', 'WMS'],
  ['Line B', 'Printers'],
  ['Aisle 12', 'Network'],
  ['Dock 5', 'WMS'],
  ['Zone 2', 'Conveyor'],
  ['Office', 'Email'],
  ['Dock 3', 'WMS'],
  ['Line A', 'Printers'],
  ['Aisle 4', 'Network'],
  ['Zone 1', 'Sensors'],
  ['Dock 1', 'Scanners'],
  ['Line B', 'Printers'],
]
const SIMILAR = [0, 3, 6]

export function MedlineCase() {
  return (
    <div className="page case case--medline">
      <CaseHero
        p={p}
        meta={[
          { label: 'My role', value: p.role },
          { label: 'Environment', value: m.environment },
          { label: 'Timeline', value: m.timeline },
          { label: 'Status', value: <span className="status">{p.status}</span> },
        ]}
      >
        <JumpNav
          items={[
            { id: 'problem', label: 'Problem' },
            { id: 'solution', label: 'Solution' },
            { id: 'my-work', label: 'My work' },
            { id: 'result', label: 'Result' },
          ]}
        />
      </CaseHero>

      {/* 01 — Problem */}
      <section className="section case-sec" aria-labelledby="problem">
        <div className="container case-split">
          <Reveal>
            <CaseHead kicker="01 · The problem" id="problem" title={<>Thousands of tickets. <span>One pattern nobody sees.</span></>} />
            <p className="case-text">{m.problem.text}</p>
            <ul className="case-points">
              {m.problem.points.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="tickets" delay={120}>
            <div className="tickets__grid" aria-hidden="true">
              {TICKETS.map(([where, sys], i) => (
                <span key={i} className={`ticket${SIMILAR.includes(i) ? ' is-similar' : ''}`} style={{ ['--i' as string]: i }}>
                  <b>INC-{String(4102 + i * 37).padStart(5, '0')}</b>
                  <em>{where}</em>
                  <small>{sys}</small>
                </span>
              ))}
            </div>
            <p className="tickets__cap">Illustration: three of these describe the same issue — but each is handled as if it were new.</p>
          </Reveal>
        </div>
      </section>

      {/* 02 — Solution */}
      <section className="section section--alt case-sec" aria-labelledby="solution">
        <div className="container">
          <Reveal>
            <CaseHead kicker="02 · The solution" id="solution" title={<>Let AI find the pattern — <span>then route the cause.</span></>} lead={m.solution} />
          </Reveal>
          <Reveal className="rule" delay={80}>
            <span className="rule__big">3</span>
            <p className="rule__text">
              similar incidents within a <b>rolling 24-hour</b> period
              <span className="rule__arrow" aria-hidden="true">
                →
              </span>
              <b className="rule__out">create a Problem Record</b>
            </p>
            <span className="rule__tag">The matching logic I helped define</span>
          </Reveal>

          <Reveal delay={60}>
            <RollingDemo />
          </Reveal>

          <Reveal as="ol" className="flow" delay={80}>
            {m.flow.map((f, i) => (
              <li key={f.title} style={{ ['--i' as string]: i }}>
                <span className="flow__num">0{i + 1}</span>
                <b className="flow__title">{f.title}</b>
                <span className="flow__text">{f.text}</span>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 03 — My work */}
      <section className="section case-sec" aria-labelledby="my-work">
        <div className="container">
          <Reveal className="case-work__head">
            <CaseHead
              kicker="03 · What I did"
              id="my-work"
              title={<>The product & BA side — <span>end to end.</span></>}
              lead="As Product & Business Analyst Lead, my job was to turn an operations problem into something the team could build, test and present."
            />
            <p className="scale">
              <CountUp value={m.scale.value} prefix="~" className="scale__value" />
              <span className="scale__label">{m.scale.label}</span>
            </p>
          </Reveal>
          <ol className="phases">
            {m.work.map((ph, i) => (
              <Reveal as="li" key={ph.phase} delay={i * 80} className="phase">
                <span className="phase__num">0{i + 1}</span>
                <h3 className="phase__name">{ph.phase}</h3>
                <ul>
                  {ph.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 04 — Result */}
      <section className="section section--alt case-sec" aria-labelledby="result">
        <div className="container">
          <Reveal>
            <CaseHead kicker="04 · Result so far" id="result" title={<>Three modules. <span>Honest status.</span></>} />
          </Reveal>
          <Reveal as="ol" className="modules2" delay={60}>
            {m.modules.map((mod, i) => (
              <li key={mod.name}>
                <span className="modules2__num">0{i + 1}</span>
                <b>{mod.name}</b>
                <span>{mod.text}</span>
              </li>
            ))}
          </Reveal>
          <div className="case-result">
            <Reveal className="case-result__status">
              <span className="status">In progress</span>
              <p>{m.status}</p>
            </Reveal>
            <Reveal delay={80}>
              <span className="label label--plain">Tools & methods</span>
              <Tools items={p.tools} />
            </Reveal>
          </div>
          {p.learned && <Learned text={p.learned} />}
          <Pager id={p.id} />
        </div>
      </section>
    </div>
  )
}
