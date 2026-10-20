import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { experience, type Role } from '../data/content'
import { SectionHead } from '../components/SectionHead'
import { Reveal } from '../components/Reveal'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { PinIcon, PlusIcon } from '../components/Icons'
import './experience.css'

function RoleDetails({ role, idPrefix }: { role: Role; idPrefix: string }) {
  const [more, setMore] = useState(false)
  const shown = more ? role.bullets : role.bullets.slice(0, 2)
  const hidden = role.bullets.length - 2
  return (
    <div className="role" key={role.id}>
      <div className="role__head">
        <div>
          <p className="role__dates">{role.dates}</p>
          <h3 className="role__company">{role.company}</h3>
          <p className="role__title">{role.title}</p>
        </div>
        <div className="role__meta">
          {role.status && <span className={`status${role.status === 'In progress' ? '' : ' status--done'}`}>{role.status}</span>}
          <span className="role__loc">
            <PinIcon size={14} /> {role.location}
          </span>
        </div>
      </div>
      <p className="role__summary">{role.summary}</p>
      <ul className="role__bullets" id={`${idPrefix}-${role.id}-list`}>
        {shown.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
      {hidden > 0 && (
        <button
          type="button"
          className="role__more"
          aria-expanded={more}
          aria-controls={`${idPrefix}-${role.id}-list`}
          onClick={() => setMore((v) => !v)}
        >
          <PlusIcon size={14} className={more ? 'is-open' : ''} />
          {more ? 'Show less' : `Show all details (+${hidden})`}
        </button>
      )}
      <ul className="role__tags" aria-label="Skills used">
        {role.tags.map((t) => (
          <li key={t} className="tag">
            {t}
          </li>
        ))}
      </ul>
      {role.note && <p className="role__note">{role.note}</p>}
    </div>
  )
}

export function Experience() {
  const desktop = useMediaQuery('(min-width: 1024px)')
  const [active, setActive] = useState(0)
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({ [experience[0].id]: true })
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const uid = useId()

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next = i
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (i + 1) % experience.length
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (i - 1 + experience.length) % experience.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = experience.length - 1
    else return
    e.preventDefault()
    setActive(next)
    tabs.current[next]?.focus()
  }

  return (
    <section id="experience" className="section section--alt experience" aria-labelledby="exp-title">
      <div className="container">
        <SectionHead
          id="exp-title"
          index="03"
          label="Experience"
          title={['Where I’ve', '*tested, coordinated*', 'and delivered.']}
          lead="From IT audit at KPMG to real-estate operations and a client technology project — each role added a different kind of rigor."
          split
        />

        {desktop ? (
          <Reveal className="exp">
            <div className="exp__tabs" role="tablist" aria-label="Roles" aria-orientation="vertical">
              <span className="exp__track" aria-hidden="true">
                <span style={{ transform: `translateY(${active * 100}%)`, height: `${100 / experience.length}%` }} />
              </span>
              {experience.map((r, i) => (
                <button
                  key={r.id}
                  ref={(el) => {
                    tabs.current[i] = el
                  }}
                  role="tab"
                  id={`${uid}-tab-${r.id}`}
                  aria-selected={active === i}
                  aria-controls={`${uid}-panel`}
                  tabIndex={active === i ? 0 : -1}
                  className={`exp__tab${active === i ? ' is-active' : ''}`}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => onKey(e, i)}
                >
                  <span className="exp__tab-dates">{r.dates}</span>
                  <span className="exp__tab-company">{r.company}</span>
                  <span className="exp__tab-title">{r.title}</span>
                </button>
              ))}
            </div>
            <div
              className="exp__panel card"
              role="tabpanel"
              id={`${uid}-panel`}
              aria-labelledby={`${uid}-tab-${experience[active].id}`}
            >
              <RoleDetails key={experience[active].id} role={experience[active]} idPrefix={uid} />
            </div>
          </Reveal>
        ) : (
          <ol className="exp-acc">
            {experience.map((r) => {
              const open = Boolean(openItems[r.id])
              return (
                <Reveal as="li" key={r.id} className={`exp-acc__item${open ? ' is-open' : ''}`}>
                  <h3 className="exp-acc__heading">
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={`${uid}-acc-${r.id}`}
                      onClick={() => setOpenItems((s) => ({ ...s, [r.id]: !s[r.id] }))}
                    >
                      <span className="exp__tab-dates">{r.dates}</span>
                      <span className="exp__tab-company">{r.company}</span>
                      <span className="exp__tab-title">{r.title}</span>
                      <PlusIcon className="exp-acc__icon" />
                    </button>
                  </h3>
                  <div id={`${uid}-acc-${r.id}`} className="exp-acc__panel" hidden={!open}>
                    <RoleDetails role={r} idPrefix={`${uid}-m`} />
                  </div>
                </Reveal>
              )
            })}
          </ol>
        )}
      </div>
    </section>
  )
}
