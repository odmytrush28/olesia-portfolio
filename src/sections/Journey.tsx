import { useEffect, useRef, useState } from 'react'
import { education, journey, training, type Milestone } from '../data/content'
import { SectionHead } from '../components/SectionHead'
import { Reveal } from '../components/Reveal'
import { useReducedMotion } from '../hooks/useMediaQuery'
import './journey.css'

const filters: { id: 'all' | Milestone['kind']; label: string }[] = [
  { id: 'all', label: 'Everything' },
  { id: 'life', label: 'Life' },
  { id: 'education', label: 'Education' },
  { id: 'work', label: 'Work' },
]

export function Journey() {
  const [filter, setFilter] = useState<(typeof filters)[number]['id']>('all')
  const listRef = useRef<HTMLOListElement>(null)
  const reduced = useReducedMotion()

  // Scroll-linked progress line + "passed" milestones
  useEffect(() => {
    const list = listRef.current
    if (!list) return
    if (reduced) {
      list.style.setProperty('--progress', '1')
      list.querySelectorAll('.tl__item').forEach((el) => el.classList.add('is-passed'))
      return
    }
    let raf = 0
    const update = () => {
      raf = 0
      const r = list.getBoundingClientRect()
      const focus = window.innerHeight * 0.62
      const p = Math.min(1, Math.max(0, (focus - r.top) / r.height))
      list.style.setProperty('--progress', p.toFixed(4))
      list.querySelectorAll<HTMLElement>('.tl__item').forEach((el) => {
        const dot = el.getBoundingClientRect().top + 14
        el.classList.toggle('is-passed', dot < focus)
      })
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [reduced])

  return (
    <section id="journey" className="section journey" aria-labelledby="journey-title">
      <div className="container">
        <SectionHead
          id="journey-title"
          index="07"
          label="Journey"
          title={['One path.', 'Three countries.', '*Four degrees.*']}
          lead="Every move was a choice to keep growing — new country, new language, new field."
          split
        />

        <div className="tl__filters" role="group" aria-label="Filter milestones">
          {filters.map((f) => (
            <button key={f.id} type="button" aria-pressed={filter === f.id} className={filter === f.id ? 'is-active' : ''} onClick={() => setFilter(f.id)}>
              <span className={`tl__swatch tl__swatch--${f.id}`} aria-hidden="true" />
              {f.label}
            </button>
          ))}
        </div>

        <ol ref={listRef} className="tl">
          {journey.map((m, i) => {
            const dim = filter !== 'all' && filter !== m.kind
            return (
              <li key={m.title} className={`tl__item tl__item--${m.kind}${dim ? ' is-dim' : ''}${i % 2 ? ' tl__item--right' : ''}`}>
                <span className="tl__dot" aria-hidden="true" />
                <Reveal className="tl__card">
                  <p className="tl__when">{m.when}</p>
                  <h3 className="tl__title">{m.title}</h3>
                  <p className="tl__text">{m.text}</p>
                  <p className="tl__place">
                    <span className={`tl__kind tl__kind--${m.kind}`}>{m.kind}</span>
                    {m.place}
                  </p>
                </Reveal>
              </li>
            )
          })}
        </ol>

        <div className="edu">
          <Reveal className="edu__head">
            <span className="label">Education</span>
            <h3 className="edu__title">
              A bachelor’s and three master’s degrees — <span>earned in Polish, while working.</span>
            </h3>
          </Reveal>
          <ul className="edu__grid">
            {education.map((e, i) => (
              <Reveal as="li" key={e.degree} delay={i * 70} className="degree">
                <span className="degree__years">{e.years}</span>
                <h4 className="degree__name">{e.degree}</h4>
                <p className="degree__school">{e.school}</p>
                <p className="degree__place">{e.place}</p>
              </Reveal>
            ))}
          </ul>
          <Reveal className="training">
            <span className="label label--plain">Additional training</span>
            <ul>
              {training.map((t) => (
                <li key={t.name}>
                  <span className="training__name">{t.name}</span>
                  {(t.by || t.proof) && (
                    <span className="training__by">{[t.by, t.proof].filter(Boolean).join(' · ')}</span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
