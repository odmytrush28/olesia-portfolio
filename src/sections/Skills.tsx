import { useState } from 'react'
import { evidenceSources, languageLevels, otherTools, skills, type EvidenceId, type Skill } from '../data/content'
import { SectionHead } from '../components/SectionHead'
import { Reveal } from '../components/Reveal'
import './skills.css'

type Sel = { kind: 'skill'; skill: Skill } | { kind: 'source'; id: EvidenceId } | null

const sourceName = (id: EvidenceId) => evidenceSources.find((s) => s.id === id)?.label ?? id

export function Skills() {
  const [pinned, setPinned] = useState<Sel>(null)
  const [preview, setPreview] = useState<Sel>(null)
  const sel = preview ?? pinned

  const litSources = new Set<EvidenceId>(sel?.kind === 'skill' ? sel.skill.evidence : sel?.kind === 'source' ? [sel.id] : [])
  const isSkillLit = (s: Skill) =>
    sel?.kind === 'skill' ? sel.skill.name === s.name : sel?.kind === 'source' ? s.evidence.includes(sel.id) : false
  const dimSkills = sel?.kind === 'source'

  const group = (title: string, note: string, list: Skill[], tone: 'pro' | 'dev') => {
    const selectedHere = sel?.kind === 'skill' && list.some((s) => s.name === sel.skill.name) ? sel.skill : null
    return (
      <Reveal className={`skills__group skills__group--${tone}`}>
        <div className="skills__group-head">
          <h3>{title}</h3>
          <p>{note}</p>
        </div>
        <ul className="skills__chips">
          {list.map((s) => {
            const lit = isSkillLit(s)
            return (
              <li key={s.name}>
                <button
                  type="button"
                  className={`chip${lit ? ' is-lit' : ''}${dimSkills && !lit ? ' is-dim' : ''}`}
                  aria-pressed={pinned?.kind === 'skill' && pinned.skill.name === s.name}
                  onClick={() => {
                    setPreview(null)
                    setPinned((cur) => (cur?.kind === 'skill' && cur.skill.name === s.name ? null : { kind: 'skill', skill: s }))
                  }}
                  onPointerEnter={(e) => e.pointerType === 'mouse' && setPreview({ kind: 'skill', skill: s })}
                  onPointerLeave={(e) => e.pointerType === 'mouse' && setPreview(null)}
                >
                  <span className="chip__name">{s.name}</span>
                  <span className="chip__level">{s.level}</span>
                </button>
              </li>
            )
          })}
        </ul>
        <p className="skills__readout" aria-live="polite">
          {selectedHere ? (
            <>
              <b>{selectedHere.name}</b> — {selectedHere.level.toLowerCase()} · evidence: {selectedHere.evidence.map(sourceName).join(', ')}
            </>
          ) : (
            <span className="skills__readout-hint">Select a skill to see where I used it.</span>
          )}
        </p>
      </Reveal>
    )
  }

  return (
    <section id="skills" className="section section--alt skills" aria-labelledby="skills-title">
      <div className="container">
        <SectionHead
          id="skills-title"
          index="06"
          label="Skills"
          title={['Proven skills,', '*growing* skills.']}
          lead="No percentage bars. Each skill is tied to where I actually used it — and professional strengths are kept separate from the technical skills I’m still building."
          split
        />

        <div className="skills__layout">
          <div className="skills__groups">
            {group('Professional strengths', 'Used in paid work, at a professional level.', skills.professional, 'pro')}
            {group('Developing technical skills', 'Foundational — learning and practicing them now.', skills.developing, 'dev')}
          </div>

          <Reveal className="evidence" delay={100}>
            <div className="evidence__head">
              <span className="label label--plain">Evidence map</span>
              {pinned && (
                <button type="button" className="evidence__clear" onClick={() => setPinned(null)}>
                  Clear
                </button>
              )}
            </div>
            <ul className="evidence__list">
              {evidenceSources.map((src) => {
                const lit = litSources.has(src.id)
                return (
                  <li key={src.id}>
                    <button
                      type="button"
                      className={`source${lit ? ' is-lit' : ''}${sel && !lit ? ' is-dim' : ''}`}
                      aria-pressed={pinned?.kind === 'source' && pinned.id === src.id}
                      onClick={() => setPinned((cur) => (cur?.kind === 'source' && cur.id === src.id ? null : { kind: 'source', id: src.id }))}
                      onPointerEnter={(e) => e.pointerType === 'mouse' && setPreview({ kind: 'source', id: src.id })}
                      onPointerLeave={(e) => e.pointerType === 'mouse' && setPreview(null)}
                    >
                      <span className="source__dot" aria-hidden="true" />
                      <span className="source__label">{src.label}</span>
                      <span className="source__sub">{src.sub}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
            <p className="evidence__tip">Tip: select a source to highlight the skills it proves.</p>
          </Reveal>
        </div>

        <div className="skills__extra">
          <Reveal className="extra">
            <h3 className="extra__title">Languages</h3>
            <ul className="langs">
              {languageLevels.map((l) => (
                <li key={l.name}>
                  <span className="langs__name">{l.name}</span>
                  <span className="langs__level">{l.level}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="extra" delay={80}>
            <h3 className="extra__title">Also in my toolkit</h3>
            <ul className="extra__tags">
              {otherTools.map((t) => (
                <li key={t} className="tag">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
