import { useEffect, useRef } from 'react'
import { CloseIcon } from './Icons'
import './lightbox.css'

type Item = { type: 'image' | 'video'; src: string; alt: string; caption?: string; poster?: string }

type Props = {
  item: Item | null
  onClose: () => void
}

/** Accessible lightbox built on the native <dialog> (focus trap + Escape for free). */
export function Lightbox({ item, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (item && !d.open) d.showModal()
    if (!item && d.open) d.close()
  }, [item])

  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label={item?.alt ?? 'Preview'}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose()
      }}
    >
      {item && (
        <figure className="lightbox__figure">
          {item.type === 'image' ? (
            <img src={item.src} alt={item.alt} />
          ) : (
            <video src={item.src} poster={item.poster} controls playsInline autoPlay aria-label={item.alt} />
          )}
          {item.caption && <figcaption>{item.caption}</figcaption>}
        </figure>
      )}
      <button type="button" className="lightbox__close" onClick={onClose} aria-label="Close preview" autoFocus>
        <CloseIcon />
      </button>
    </dialog>
  )
}
