import { useLayoutEffect, useRef, useState } from 'react'
import { incidentDemo } from '../data/content'
import { useReducedMotion } from '../hooks/useMediaQuery'
import { ArrowIcon } from '../components/Icons'

type Stage = 'report' | 'group' | 'route'

const steps: { id: Stage; label: string; caption: string }[] = [
  {
    id: 'report',
    label: 'Report',
    caption: 'Eight incidents arrive one by one. Each is a single interruption — on its own, none looks like a pattern.',
  },
  {
    id: 'group',
    label: 'Group',
    caption:
      'Incidents with the same underlying cause are linked to one Problem. Seven incidents turn out to be three Problems; one stays a standalone incident.',
  },
  {
    id: 'route',
    label: 'Route',
    caption: 'Each Problem is routed to the IT team that can fix the root cause — so the same incident stops coming back.',
  },
]

/**
 * Interactive explainer: Incident vs Problem, using illustrative mock data.
 * Chips move between layouts with a FLIP animation (skipped for reduced motion).
 */
export function IncidentDemo() {
  const [stage, setStage] = useState<Stage>('report')
  const reduced = useReducedMotion()
  const nodes = useRef(new Map<string, HTMLElement>())
  const firstRects = useRef(new Map<string, DOMRect>())

  const go = (next: Stage) => {
    if (next === stage) return
    firstRects.current.clear()
    nodes.current.forEach((el, id) => firstRects.current.set(id, el.getBoundingClientRect()))
    setStage(next)
  }

  useLayoutEffect(() => {
    if (reduced || !firstRects.current.size) return
    nodes.current.forEach((el, id) => {
      const first = firstRects.current.get(id)
      if (!first) return
      const last = el.getBoundingClientRect()
      const dx = first.left - last.left
      const dy = first.top - last.top
      if (!dx && !dy) return
      el.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'translate(0, 0)' }], {
        duration: 620,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
      })
    })
    firstRects.current.clear()
  }, [stage, reduced])

  const chip = (inc: (typeof incidentDemo.incidents)[number]) => (
    <li
      key={inc.id}
      ref={(el) => {
        if (el) nodes.current.set(inc.id, el)
        else nodes.current.delete(inc.id)
      }}
      className="inc"
    >
      <span className="inc__id">{inc.id}</span>
      <span className="inc__text">{inc.text}</span>
      <span className="inc__where">{inc.where}</span>
    </li>
  )

  const current = steps.find((s) => s.id === stage)!

  return (
    <div className="demo">
      <div className="demo__bar">
        <div className="demo__steps" role="group" aria-label="Demo steps">
          {steps.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className={`demo__step${stage === s.id ? ' is-active' : ''}`}
              aria-pressed={stage === s.id}
              onClick={() => go(s.id)}
            >
              <span>0{i + 1}</span> {s.label}
            </button>
          ))}
        </div>
        <span className="demo__badge">Illustrative mock data — not Medline data</span>
      </div>

      <p className="demo__caption" aria-live="polite">
        {current.caption}
      </p>

      {stage === 'report' ? (
        <ul className="demo__pool" aria-label="Reported incidents">
          {incidentDemo.incidents.map(chip)}
        </ul>
      ) : (
        <div className="demo__groups">
          {incidentDemo.problems.map((p) => (
            <div key={p.id} className="prob">
              <div className="prob__head">
                <span className="prob__id">{p.id.replace('P', 'PRB-0')}</span>
                <span className="prob__title">{p.title}</span>
              </div>
              <ul className="prob__list" aria-label={`Incidents linked to ${p.title}`}>
                {incidentDemo.incidents.filter((i) => i.problem === p.id).map(chip)}
              </ul>
              <div className={`prob__route${stage === 'route' ? ' is-on' : ''}`} aria-hidden={stage !== 'route'}>
                <ArrowIcon size={14} /> {p.team}
              </div>
            </div>
          ))}
          <div className="prob prob--single">
            <div className="prob__head">
              <span className="prob__id">Incident</span>
              <span className="prob__title">No recurring pattern (yet)</span>
            </div>
            <ul className="prob__list" aria-label="Standalone incidents">
              {incidentDemo.incidents.filter((i) => !i.problem).map(chip)}
            </ul>
            <div className={`prob__route${stage === 'route' ? ' is-on' : ''}`} aria-hidden={stage !== 'route'}>
              <ArrowIcon size={14} /> Fixed as a one-off
            </div>
          </div>
        </div>
      )}

      <dl className="demo__defs">
        <div>
          <dt>Incident</dt>
          <dd>A single unplanned interruption — e.g. one scanner going offline.</dd>
        </div>
        <div>
          <dt>Problem</dt>
          <dd>The underlying cause behind one or more incidents. Fix it, and the incidents stop recurring.</dd>
        </div>
      </dl>
    </div>
  )
}
