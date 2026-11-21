import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type Props = {
  index: string
  label: string
  /** Title lines; wrap a word in *asterisks* to color it with the accent. */
  title: string[]
  lead?: ReactNode
  split?: boolean
  id?: string
  /** 1 for the page's main heading. */
  level?: 1 | 2
}

const accentize = (line: string) =>
  line.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith('*') ? (
      <span key={i} className="accent">
        {part.slice(1, -1)}
      </span>
    ) : (
      part
    ),
  )

export function SectionHead({ index, label, title, lead, split, id, level = 2 }: Props) {
  const H = level === 1 ? 'h1' : 'h2'
  return (
    <Reveal className={`section-head${split ? ' section-head--split' : ''}${level === 1 ? ' section-head--page' : ''}`}>
      <span className="label">
        [ <b>{index}</b> ] {label}
      </span>
      <H id={id}>
        {title.map((line, i) => (
          <span key={i} style={{ display: 'block' }}>
            {accentize(line)}
          </span>
        ))}
      </H>
      {lead && <p className="lead">{lead}</p>}
    </Reveal>
  )
}
