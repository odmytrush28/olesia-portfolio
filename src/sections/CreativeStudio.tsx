import { useEffect, useMemo, useRef, useState } from 'react'
import { aiVideo, asset, creativeWorks, type CreativeWork } from '../data/content'
import { SectionHead } from '../components/SectionHead'
import { Reveal } from '../components/Reveal'
import { Lightbox } from '../components/Lightbox'
import { ArrowIcon, CloseIcon } from '../components/Icons'
import { useFinePointer, useReducedMotion } from '../hooks/useMediaQuery'
import './creative.css'

const scenes = aiVideo.film.scenes
const src = (id: string) => asset(`videos/${id}.mp4`)
const poster = (id: string) => asset(`videos/${id}.webp`)

/** Accessible video viewer. In "story" mode it plays all scenes in order. */
function VideoViewer({ start, story, onClose }: { start: number | null; story: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [i, setI] = useState(0)

  useEffect(() => {
    const d = dialogRef.current
    if (!d) return
    if (start !== null) {
      setI(start)
      if (!d.open) d.showModal()
    } else if (d.open) {
      d.close()
    }
  }, [start])

  useEffect(() => {
    const v = videoRef.current
    if (!v || start === null) return
    v.load()
    v.play().catch(() => undefined)
  }, [i, start])

  const close = () => {
    videoRef.current?.pause()
    onClose()
  }

  const scene = scenes[i]
  return (
    <dialog
      ref={dialogRef}
      className="viewer"
      aria-label={`${aiVideo.film.title} — scene ${i + 1}: ${scene.title}`}
      onClose={close}
      onClick={(e) => e.target === dialogRef.current && close()}
    >
      {start !== null && (
        <div className="viewer__inner">
          <div className="viewer__screen">
            <video
              ref={videoRef}
              key={scene.id}
              src={src(scene.id)}
              poster={poster(scene.id)}
              controls
              playsInline
              preload="auto"
              onEnded={() => story && i < scenes.length - 1 && setI(i + 1)}
            />
          </div>
          <div className="viewer__info">
            <p className="viewer__count">
              Scene <b>0{i + 1}</b> / 0{scenes.length}
              {story && <span className="viewer__mode">Full story</span>}
            </p>
            <h3>{scene.title}</h3>
            <p>{scene.text}</p>
            <div className="viewer__nav">
              <button type="button" className="btn btn--ghost btn--sm" disabled={i === 0} onClick={() => setI(i - 1)}>
                <ArrowIcon className="flip" size={16} /> Previous
              </button>
              <button type="button" className="btn btn--ghost btn--sm" disabled={i === scenes.length - 1} onClick={() => setI(i + 1)}>
                Next <ArrowIcon size={16} />
              </button>
            </div>
            <ol className="viewer__dots" aria-label="Scenes">
              {scenes.map((s, n) => (
                <li key={s.id}>
                  <button type="button" aria-label={`Scene ${n + 1}: ${s.title}`} aria-current={n === i} onClick={() => setI(n)} />
                </li>
              ))}
            </ol>
            <p className="viewer__credit">
              Story & concept: Olesia Dmytrush · Generated with Google Flow (Veo)
            </p>
          </div>
        </div>
      )}
      <button type="button" className="viewer__close" onClick={close} aria-label="Close video">
        <CloseIcon />
      </button>
    </dialog>
  )
}

/** Scene card: hover previews the clip (muted) on desktop; click opens the viewer. */
function SceneCard({ n, onOpen }: { n: number; onOpen: () => void }) {
  const s = scenes[n]
  const fine = useFinePointer()
  const reduced = useReducedMotion()
  const vref = useRef<HTMLVideoElement>(null)
  const [preview, setPreview] = useState(false)

  const enter = () => {
    if (!fine || reduced) return
    setPreview(true)
  }
  // Start the muted preview once the <video> has mounted
  useEffect(() => {
    if (preview) vref.current?.play().catch(() => undefined)
  }, [preview])
  const leave = () => {
    vref.current?.pause()
    setPreview(false)
  }

  return (
    <li className="scene">
      <button type="button" className="scene__btn" onClick={onOpen} onPointerEnter={enter} onPointerLeave={leave}>
        <span className="sr-only">Play scene </span>
        <span className="scene__media">
          <img src={poster(s.id)} alt="" loading="lazy" decoding="async" width={540} height={960} />
          {preview && <video ref={vref} src={src(s.id)} muted autoPlay loop playsInline preload="auto" aria-hidden="true" />}
          <span className="scene__play" aria-hidden="true">
            ▶
          </span>
        </span>
        <span className="scene__num">0{n + 1}</span>
        <span className="scene__title">{s.title}</span>
      </button>
    </li>
  )
}

export function CreativeStudio() {
  const film = aiVideo.film
  const [viewer, setViewer] = useState<{ start: number; story: boolean } | null>(null)
  const [filter, setFilter] = useState('All')
  const [open, setOpen] = useState<CreativeWork | null>(null)
  const categories = useMemo(() => ['All', ...Array.from(new Set(creativeWorks.map((w) => w.category)))], [])
  const items = filter === 'All' ? creativeWorks : creativeWorks.filter((w) => w.category === filter)

  return (
    <section id="studio" className="section dark studio" aria-labelledby="studio-title">
      <div className="studio__glow" aria-hidden="true" />
      <div className="container">
        <SectionHead
          id="studio-title"
          index="05"
          label="Creative Studio"
          title={['AI video &', '*creative experiments.*']}
          lead={aiVideo.subtitle}
          split
        />

        <div className="film">
          <Reveal className="film__screen">
            <button type="button" className="film__poster" onClick={() => setViewer({ start: 0, story: true })}>
              <span className="sr-only">Play {film.title}, full story — </span>
              <img src={poster(scenes[4].id)} alt="" loading="lazy" decoding="async" width={540} height={960} />
              <span className="film__play" aria-hidden="true">
                <span>▶</span>
              </span>
              <span className="film__badge">AI-generated video</span>
            </button>
          </Reveal>

          <Reveal className="film__info" delay={100}>
            <p className="film__status">
              <span className="status status--done">{film.status}</span>
            </p>
            <h3 className="film__title">{film.title}</h3>
            <p className="film__logline">{film.logline}</p>

            <dl className="film__credits">
              {film.credits.map((c) => (
                <div key={c.label}>
                  <dt>{c.label}</dt>
                  <dd>{c.value}</dd>
                </div>
              ))}
            </dl>

            <div className="film__split">
              <div>
                <h4>My part</h4>
                <ul>
                  {film.mine.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
              <div className="film__split-ai">
                <h4>Generated by AI</h4>
                <ul>
                  {film.ai.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
            </div>

            <button type="button" className="btn btn--accent" onClick={() => setViewer({ start: 0, story: true })}>
              Play the full story
              <ArrowIcon />
            </button>
          </Reveal>
        </div>

        <Reveal as="ol" className="scenes" delay={80}>
          {scenes.map((s, n) => (
            <SceneCard key={s.id} n={n} onOpen={() => setViewer({ start: n, story: false })} />
          ))}
        </Reveal>

        {creativeWorks.length > 0 ? (
          <div className="studio__gallery">
            <h3 className="studio__subhead">Design & content</h3>
            {categories.length > 2 && (
              <div className="studio__filters" role="group" aria-label="Filter by category">
                {categories.map((c) => (
                  <button key={c} type="button" aria-pressed={filter === c} className={filter === c ? 'is-active' : ''} onClick={() => setFilter(c)}>
                    {c}
                  </button>
                ))}
              </div>
            )}
            <ul className="studio__grid">
              {items.map((w, i) => (
                <Reveal as="li" key={w.id} delay={(i % 3) * 70} className="work">
                  <button type="button" className="work__btn" onClick={() => setOpen(w)}>
                    <span className="sr-only">Open </span>
                    <span className="work__media" style={{ aspectRatio: String(w.ratio) }}>
                      <img src={asset(w.type === 'image' ? w.src : (w.poster ?? ''))} alt="" loading="lazy" decoding="async" />
                      {w.type === 'video' && (
                        <span className="work__play" aria-hidden="true">
                          ▶
                        </span>
                      )}
                    </span>
                    <span className="work__info">
                      <span className="work__cat">{w.category}</span>
                      <span className="work__title">{w.title}</span>
                    </span>
                  </button>
                </Reveal>
              ))}
            </ul>
          </div>
        ) : (
          <p className="studio__next">
            <span aria-hidden="true">+</span> {aiVideo.next}
          </p>
        )}
      </div>

      <VideoViewer start={viewer?.start ?? null} story={viewer?.story ?? false} onClose={() => setViewer(null)} />
      <Lightbox
        item={
          open
            ? {
                type: open.type,
                src: asset(open.src),
                poster: open.poster ? asset(open.poster) : undefined,
                alt: open.title,
                caption: `${open.description} · ${open.tools.join(', ')}`,
              }
            : null
        }
        onClose={() => setOpen(null)}
      />
    </section>
  )
}
