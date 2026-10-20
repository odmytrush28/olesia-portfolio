import type { ElementType, ReactNode, CSSProperties } from 'react'
import { useInView } from '../hooks/useInView'

type Props = {
  as?: ElementType
  children: ReactNode
  className?: string
  delay?: number
  style?: CSSProperties
  id?: string
}

/** Fades/slides its content in once it enters the viewport. */
export function Reveal({ as: Tag = 'div', children, className = '', delay = 0, style, id }: Props) {
  const { ref, inView } = useInView<HTMLElement>()
  return (
    <Tag
      ref={ref}
      id={id}
      className={`reveal${inView ? ' is-visible' : ''} ${className}`.trim()}
      style={{ ...style, ['--delay' as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
