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

export function SectionHead({ index, label, title, lead, split, id }: Props) {
  return (
    <Reveal className={`section-head${split ? ' section-head--split' : ''}`}>
      <span className="label">
        [ <b>{index}</b> ] {label}
      </span>
      <h2 id={id}>
        {title.map((line, i) => (
          <span key={i} style={{ display: 'block' }}>
            {accentize(line)}
          </span>
        ))}
      </h2>
      {lead && <p className="lead">{lead}</p>}
    </Reveal>
  )
}
