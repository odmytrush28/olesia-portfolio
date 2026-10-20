import { innovation } from '../data/content'
import { SectionHead } from '../components/SectionHead'
import { Reveal } from '../components/Reveal'
import './lab.css'

export function InnovationLab() {
  return (
    <section id="lab" className="section dark lab" aria-labelledby="lab-title">
      <div className="lab__glow" aria-hidden="true" />
      <div className="container">
        <SectionHead
          id="lab-title"
          index="06.B"
          label="Innovation Lab"
          title={['Ideas I want', 'to *build next.*']}
          lead="Honest status: these are concepts — not finished products. They show where my curiosity is heading."
          split
        />
        <ul className="lab__grid">
          {innovation.map((idea, i) => (
            <Reveal as="li" key={idea.id} delay={i * 80} className="idea">
              <div className="idea__top">
                <span className="idea__num">0{i + 1}</span>
                <span className="status status--concept">{idea.status}</span>
              </div>
              <h3 className="idea__name">{idea.name}</h3>
              <p className="idea__text">{idea.text}</p>
              <p className="idea__why">{idea.why}</p>
              <ul className="idea__explore" aria-label="What I would explore">
                {idea.explore.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
