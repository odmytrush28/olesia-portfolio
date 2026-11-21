import { Experience } from '../sections/Experience'
import { Skills } from '../sections/Skills'
import { Reveal } from '../components/Reveal'
import { Link } from '../router'
import { ArrowIcon } from '../components/Icons'
import '../sections/home.css'

const SPOTLIGHTS = [
  {
    to: '/experience/kpmg',
    kicker: 'Spotlight · KPMG Poland',
    title: 'IT Audit & Assurance',
    text: 'Nearly three years assessing technology risk, testing IT and business controls, and documenting evidence for senior review.',
  },
  {
    to: '/projects/medline',
    kicker: 'Case study · i.c.stars',
    title: 'Medline — Operations Problem Navigator',
    text: 'Product & BA Lead: requirements, ~47,672 incidents analyzed, AI matching logic, MVP and sprint planning.',
  },
  {
    to: '/projects/cycle-soundtrack',
    kicker: 'Leadership · i.c.stars Gift',
    title: 'Cycle Soundtrack',
    text: 'A video and event for Chicago Cycle 60 that scored 100% on the Gift Scorecard and was shown at TechBash.',
  },
]

export function ExperiencePage() {
  return (
    <div className="page">
      <Experience />
      <section className="section spotlights-sec" aria-label="Spotlights">
        <div className="container">
          <ul className="spotlights">
            {SPOTLIGHTS.map((s, i) => (
              <Reveal as="li" key={s.to} delay={i * 80}>
                <Link to={s.to} className="spotlight">
                  <span className="spotlight__kicker">{s.kicker}</span>
                  <b className="spotlight__title">{s.title}</b>
                  <span className="spotlight__text">{s.text}</span>
                  <span className="spotlight__go" aria-hidden="true">
                    <ArrowIcon size={16} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <Skills />
    </div>
  )
}
