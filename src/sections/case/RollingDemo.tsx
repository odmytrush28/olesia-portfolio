import { useEffect, useMemo, useRef, useState } from 'react'
import { rollingDemo } from '../../data/content'
import { useReducedMotion } from '../../hooks/useMediaQuery'

type Cat = keyof typeof rollingDemo.categories
const CATS = Object.keys(rollingDemo.categories) as Cat[]
const { hours: H, window: WIN, threshold: N, incidents } = rollingDemo

/** When each Problem Record is created: the moment a category reaches N incidents inside a rolling window. */
function problemTimes() {
  const out: { cat: Cat; t: number; ids: string[] }[] = []
  for (const cat of CATS) {
    const list = incidents.filter((i) => i.cat === cat)
    for (const inc of list) {
      const inWin = list.filter((x) => x.t <= inc.t && x.t > inc.t - WIN)
      if (inWin.length >= N) {
        out.push({ cat, t: inc.t, ids: inWin.map((x) => x.id) })
        break
      }
    }
  }
  return out.sort((a, b) => a.t - b.t)
}

const pct = (t: number) => `${(t / H) * 100}%`

/**
 * Interactive explainer for the Medline rule:
 * 3 similar incidents within a rolling 24-hour window → a Problem Record.
 * Uses illustrative data only.
 */
export function RollingDemo() {
  const reduced = useReducedMotion()
  const [now, setNow] = useState(0)
  const [playing, setPlaying] = useState(false)
  const raf = useRef(0)
  const records = useMemo(problemTimes, [])
  const created = records.filter((r) => r.t <= now)
  const winStart = Math.max(0, now - WIN)

  useEffect(() => {
    if (!playing) return
    let last = performance.now()
    const speed = H / 11 // whole timeline in ~11 s
    const tick = (t: number) => {
      const dt = (t - last) / 1000
      last = t
      setNow((n) => {
        const next = Math.min(H, n + dt * speed)
        if (next >= H) setPlaying(false)
        return next
      })
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [playing])

  const play = () => {
    if (reduced) {
      setNow(H)
      return
    }
    if (now >= H) setNow(0)
    setPlaying((p) => !p)
  }

  const countIn = (cat: Cat) => incidents.filter((i) => i.cat === cat && i.t <= now && i.t > now - WIN).length
  const latest = created[created.length - 1]

  return (
    <div className="rdemo">
      <div className="rdemo__bar">
        <button type="button" className="btn btn--primary btn--sm rdemo__play" onClick={play} aria-pressed={playing}>
          {playing ? 'Pause' : now >= H ? 'Replay' : now > 0 ? 'Resume' : 'Play the 48 hours'}
          <span className="btn__orb" aria-hidden="true">
            {playing ? '❚❚' : '▶'}
          </span>
        </button>
        <label className="rdemo__slider">
          <span>
            Hour <b>{Math.floor(now)}</b> / {H}
          </span>
          <input
            type="range"
            min={0}
            max={H}
            step={0.5}
            value={now}
            aria-valuetext={`Hour ${Math.floor(now)}`}
            onChange={(e) => {
              setPlaying(false)
              setNow(Number(e.target.value))
            }}
          />
        </label>
        <span className="rdemo__note">Illustrative data — not Medline data</span>
      </div>

      <div className="rdemo__chart" role="img" aria-label={`Timeline of incidents over ${H} hours. The highlighted band is the last ${WIN} hours.`}>
        <div className={`rdemo__window${now - winStart < 7 ? ' is-narrow' : ''}`} style={{ left: pct(winStart), width: pct(now - winStart) }}>
          <span>last {WIN} h</span>
        </div>
        <div className="rdemo__now" style={{ left: pct(now) }} />
        {CATS.map((cat, row) => (
          <div key={cat} className="rdemo__lane" style={{ ['--row' as string]: row }}>
            <span className="rdemo__lane-name">
              {rollingDemo.categories[cat].label}
              <b className={countIn(cat) >= N ? 'is-hot' : ''}>
                {countIn(cat)}/{N}
              </b>
            </span>
            {incidents
              .filter((i) => i.cat === cat)
              .map((i) => {
                const seen = i.t <= now
                const inWin = seen && i.t > now - WIN
                const grouped = created.some((r) => r.ids.includes(i.id))
                return (
                  <span
                    key={i.id}
                    className={`rdemo__dot${seen ? ' is-seen' : ''}${inWin ? ' is-in' : ''}${grouped ? ' is-grouped' : ''}`}
                    style={{ left: pct(i.t) }}
                    title={`${i.id} · ${rollingDemo.categories[cat].label} · ${i.where} · hour ${i.t}`}
                  />
                )
              })}
          </div>
        ))}
        <div className="rdemo__axis" aria-hidden="true">
          {Array.from({ length: H / 6 + 1 }, (_, k) => (
            <span key={k} style={{ left: pct(k * 6) }}>
              {k * 6}h
            </span>
          ))}
        </div>
      </div>

      <div className="rdemo__records">
        <span className="label label--plain">Problem Records</span>
        {created.length === 0 ? (
          <p className="rdemo__empty">None yet — each incident is still being looked at on its own.</p>
        ) : (
          <ul>
            {created.map((r, k) => (
              <li key={r.cat} className="rdemo__record">
                <b>PRB-00{k + 1}</b>
                <span>
                  {rollingDemo.categories[r.cat].label} · recurring
                  <small>
                    Created at hour {r.t} from {r.ids.join(', ')}
                  </small>
                </span>
                <i>→ {rollingDemo.categories[r.cat].team}</i>
              </li>
            ))}
          </ul>
        )}
        <p className="rdemo__hint">
          Watch the label-printer lane: at hour 33 it has only 2 incidents in the window — the one from hour 4 has rolled out. At hour 38 it reaches 3.
        </p>
        <p className="sr-only" aria-live="polite">
          {latest ? `Problem Record created: ${rollingDemo.categories[latest.cat].label}, at hour ${latest.t}.` : ''}
        </p>
      </div>
    </div>
  )
}
