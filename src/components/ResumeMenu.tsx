import { useEffect, useId, useRef, useState } from 'react'
import { asset, resumes } from '../data/content'
import { DownloadIcon } from './Icons'
import './resume-menu.css'

type Props = {
  /** Small variant for the navigation bar. */
  compact?: boolean
  /** Opens upward (e.g. near the bottom of a dark section). */
  up?: boolean
  dark?: boolean
}

/** "Download résumé" button with a choice of four role-specific versions. */
export function ResumeMenu({ compact, up, dark }: Props) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const listId = useId()

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        rootRef.current?.querySelector('button')?.focus()
      }
    }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={rootRef} className={`resume${compact ? ' resume--compact' : ''}${up ? ' resume--up' : ''}${dark ? ' resume--dark' : ''}`}>
      <button
        type="button"
        className={compact ? 'resume__trigger' : 'btn btn--ghost resume__btn'}
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
      >
        <DownloadIcon size={compact ? 16 : 18} />
        {compact ? 'Résumé' : 'Download résumé'}
      </button>
      <div id={listId} className={`resume__panel${open ? ' is-open' : ''}`} hidden={!open}>
        <p className="resume__hint">Choose the version that fits your role (PDF)</p>
        <ul>
          {resumes.map((r) => (
            <li key={r.id}>
              <a href={asset(r.file)} download onClick={() => setOpen(false)}>
                <span className="resume__label">{r.label}</span>
                <span className="resume__focus">{r.focus}</span>
                <DownloadIcon size={16} className="resume__icon" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
