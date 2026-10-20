import { useState } from 'react'
import { aiApproach, process } from '../data/content'
import { SectionHead } from '../components/SectionHead'
import { Reveal } from '../components/Reveal'
import './how.css'

export function HowIWork() {
  const [active, setActive] = useState(0)

  return (
    <section id="how" className="section how" aria-labelledby="how-title">
      <div className="container">
        <SectionHead
          id="how-title"
          index="06.C"
          label="How I work"
          title={['Curiosity,', 'with a *method.*']}
          lead="The same loop works for an audit, a requirements workshop or a bug hunt."
          split
        />

        <Reveal as="ol" className="steps">
          {process.map((step, i) => (
            <li key={step.title} className={`step${active === i ? ' is-active' : ''}`}>
              <button
                type="button"
                className="step__btn"
                aria-expanded={active === i}
                onClick={() => setActive(i)}
                onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(i)}
                onFocus={() => setActive(i)}
              >
                <span className="step__num">0{i + 1}</span>
                <span className="step__title">{step.title}</span>
              </button>
              <p className="step__text">{step.text}</p>
            </li>
          ))}
        </Reveal>

        <Reveal className="ai-note" delay={100}>
          <span className="ai-note__icon" aria-hidden="true">
            AI
          </span>
          <div>
            <h3>How I use AI</h3>
            <p>{aiApproach}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
