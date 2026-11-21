import { Hero } from '../components/hero/Hero'
import { asset, experience, focusAreas, projects, resumes } from '../data/content'
import { Reveal } from '../components/Reveal'
import { SectionHead } from '../components/SectionHead'
import { ProjectCard } from '../sections/Projects'
import { Link } from '../router'
import { ArrowIcon, DownloadIcon } from '../components/Icons'
import '../sections/home.css'

const ICONS: Record<string, string> = { ba: '◇', ai: '✦', audit: '✓', lead: '♪' }

export function HomePage() {
  const featured = ['medline', 'cybersecurity-challenge', 'cycle-soundtrack'].map((id) => projects.find((p) => p.id === id)!)
  return (
    <div className="page page--home">
      <Hero />

      <section id="what-i-do" className="section home-focus" aria-labelledby="focus-title">
        <div className="container">
          <SectionHead
            id="focus-title"
            index="01"
            label="What I do"
            title={['Four areas,', '*one way of thinking.*']}
            lead="Four areas, each backed by real work. Select one to see the proof."
            split
          />
          <ul className="focus">
            {focusAreas.map((f, i) => (
              <Reveal as="li" key={f.id} delay={i * 80} className={`focus__item focus__item--${f.id}`}>
                <Link to={f.to} className="focus__link">
                  <span className="focus__icon" aria-hidden="true">
                    {ICONS[f.id]}
                  </span>
                  <span className="focus__num">0{i + 1}</span>
                  <h3 className="focus__title">{f.title}</h3>
                  <p className="focus__text">{f.text}</p>
                  <span className="focus__proof">
                    {f.proof}
                    <ArrowIcon size={15} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--alt home-work" aria-labelledby="work-title">
        <div className="container">
          <SectionHead
            id="work-title"
            index="02"
            label="Featured work"
            title={['Case studies,', '*not just cards.*']}
            lead="The Medline case study first — then the projects that show security thinking and leadership."
            split
          />
          <ul className="pgrid pgrid--home">
            {featured.map((p, i) => (
              <ProjectCard key={p.id} p={p} i={i} size={i === 0 ? 'feature' : 'normal'} />
            ))}
          </ul>
          <Reveal className="home-work__more">
            <Link to="/projects" className="btn btn--ghost">
              All projects
              <ArrowIcon />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section home-path" aria-labelledby="path-title">
        <div className="container">
          <SectionHead id="path-title" index="03" label="Experience" title={['Where I’ve', '*tested, coordinated* and led.']} split />
          <ol className="path">
            {experience.map((r, i) => (
              <Reveal as="li" key={r.id} delay={i * 70} className="path__item">
                <Link to={r.spotlight ?? '/experience'} className="path__link">
                  <span className="path__dates">{r.dates}</span>
                  <b className="path__company">{r.company}</b>
                  <span className="path__title">{r.title}</span>
                  <span className="path__go" aria-hidden="true">
                    <ArrowIcon size={16} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ol>
          <Reveal className="cta-band dark" delay={80}>
            <div>
              <h2>
                Let’s create <span>something meaningful.</span>
              </h2>
              <p>Open to roles in business analysis, IT risk & GRC, and QA — nationwide, and open to relocation.</p>
            </div>
            <div className="cta-band__actions">
              <Link to="/contact" className="btn btn--accent">
                Contact me
                <ArrowIcon />
              </Link>
              <a href={asset(resumes[0].file)} download className="btn btn--ghost">
                <DownloadIcon size={16} /> Résumé (PDF)
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
