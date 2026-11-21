import { about, asset } from '../data/content'
import { SectionHead } from '../components/SectionHead'
import { Reveal } from '../components/Reveal'
import { Strengths } from './Strengths'
import './about.css'

export function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container">
        <SectionHead
          id="about-title"
          index="02"
          label="About"
          level={1}
          title={[about.title[0], `a *${about.title[1].replace('a ', '')}*`]}
          lead={about.subtitle}
        />

        <div className="about__grid">
          <Reveal className="about__media">
            <figure className="about__photo">
              <img
                src={asset('images/olesia-portrait.webp')}
                srcSet={`${asset('images/olesia-portrait-480.webp')} 480w, ${asset('images/olesia-portrait.webp')} 800w, ${asset('images/olesia-portrait-1024.webp')} 1024w`}
                sizes="(max-width: 899px) 90vw, 40vw"
                width={800}
                height={1000}
                alt={about.photoAlt}
                fetchPriority="high"
                decoding="async"
              />
              <figcaption>
                <span className="pill">
                  <span className="pill__icon">●</span> UA · PL · RU · EN
                </span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="about__body">
            {about.paragraphs.map((p, i) => (
              <Reveal as="p" key={i} delay={i * 80} className={i === 0 ? 'about__lead' : 'about__p'}>
                {p}
              </Reveal>
            ))}

            <Reveal as="dl" className="about__facts" delay={120}>
              {about.facts.map((f) => (
                <div key={f.label} className="fact">
                  <dt>{f.label}</dt>
                  <dd>
                    <span className="fact__value">{f.value}</span>
                    <span className="fact__detail">{f.detail}</span>
                  </dd>
                </div>
              ))}
            </Reveal>
          </div>
        </div>

        <Strengths />
      </div>
    </section>
  )
}
