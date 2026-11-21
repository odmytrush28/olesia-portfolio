import { useState } from 'react'
import { experience, kpmgSpotlight as k } from '../data/content'
import { Reveal } from '../components/Reveal'
import { Link } from '../router'
import { ArrowIcon, PinIcon } from '../components/Icons'
import { CaseHead, Tools } from '../sections/case/CaseParts'
import '../sections/case/case.css'

const role = experience.find((r) => r.id === 'kpmg')!

export function KpmgPage() {
  const [step, setStep] = useState(0)
  return (
    <div className="page case case--kpmg">
      <section className="section case-hero" aria-labelledby="kpmg-title">
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/experience">
              <ArrowIcon size={14} /> Experience
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">KPMG</span>
          </nav>
          <div className="kpmg-hero">
            <div>
              <span className="label">
                Experience spotlight · <b>{k.company}</b>
              </span>
              <h1 id="kpmg-title" className="case-hero__title">
                {k.title}
              </h1>
              <p className="kpmg-hero__role">
                <b>{k.role}</b>
                <span>{k.dates}</span>
                <span>
                  <PinIcon size={14} /> {role.location}
                </span>
              </p>
              <p className="case-hero__lead">{k.lead}</p>
            </div>
            <dl className="kpmg-facts">
              {k.facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>
                    <b>{f.value}</b>
                    <span>{f.detail}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="section section--alt case-sec" aria-labelledby="cycle">
        <div className="container">
          <Reveal>
            <CaseHead
              kicker="01 · How an IT audit works"
              id="cycle"
              title={
                <>
                  From process <span>to proof.</span>
                </>
              }
              lead="The cycle I worked in on every engagement — each step is something I did myself. Select a step."
            />
          </Reveal>
          <Reveal className="cycle" delay={60}>
            <ol className="cycle__steps" role="list">
              {k.cycle.map((c, i) => (
                <li key={c.step}>
                  <button type="button" className={`cycle__btn${step === i ? ' is-active' : ''}${i < step ? ' is-done' : ''}`} aria-pressed={step === i} onClick={() => setStep(i)} onMouseEnter={() => setStep(i)}>
                    <span className="cycle__num">0{i + 1}</span>
                    <span className="cycle__name">{c.step}</span>
                  </button>
                </li>
              ))}
            </ol>
            <div className="cycle__panel" aria-live="polite">
              <span className="cycle__kicker">
                Step 0{step + 1} · {k.cycle[step].step}
              </span>
              <h3>{k.cycle[step].title}</h3>
              <p>{k.cycle[step].text}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section case-sec" aria-labelledby="resp">
        <div className="container">
          <Reveal>
            <CaseHead kicker="02 · What I was responsible for" id="resp" title={<>Four kinds of work, <span>one standard of evidence.</span></>} />
          </Reveal>
          <ul className="resp">
            {k.groups.map((g, i) => (
              <Reveal as="li" key={g.title} delay={i * 70} className="resp__card">
                <span className="resp__num">0{i + 1}</span>
                <h3>{g.title}</h3>
                <ul>
                  {g.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ul>
          <Reveal className="case-result" delay={60}>
            <div>
              <span className="label label--plain">Tools & methods</span>
              <Tools items={k.tools} />
            </div>
            <div className="case-result__status">
              <span className="status status--done">Dec 2021 – Aug 2024</span>
              <p>{role.note}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--alt case-sec" aria-labelledby="carries">
        <div className="container">
          <Reveal>
            <CaseHead kicker="03 · Why it matters for my next role" id="carries" title={<>The audit mindset, <span>carried forward.</span></>} />
          </Reveal>
          <ul className="carries">
            {k.carries.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 80}>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </Reveal>
            ))}
          </ul>
          <nav className="pager" aria-label="Continue">
            <Link to="/experience">
              <span className="pager__dir">← Back to</span>
              <span className="pager__name">All experience</span>
            </Link>
            <Link to="/projects/medline">
              <span className="pager__dir">Next: case study →</span>
              <span className="pager__name">Medline</span>
            </Link>
          </nav>
        </div>
      </section>
    </div>
  )
}
