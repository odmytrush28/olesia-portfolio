import { useEffect, useState } from 'react'
import { useInView } from '../hooks/useInView'
import { useReducedMotion } from '../hooks/useMediaQuery'

const fmt = (n: number) => n.toLocaleString('en-US')

/** Counts up to `value` once visible (instant with reduced motion). Screen readers get the final value. */
export function CountUp({ value, prefix = '', suffix = '', className = 'sfig__value' }: { value: number; prefix?: string; suffix?: string; className?: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>()
  const reduced = useReducedMotion()
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setN(value)
      return
    }
    let raf = 0
    const t0 = performance.now()
    const dur = value > 1000 ? 1700 : 1300
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur)
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduced, value])
  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">
        {prefix}
        {fmt(n)}
        {suffix}
      </span>
      <span className="sr-only">{`${prefix}${fmt(value)}${suffix}`}</span>
    </span>
  )
}
