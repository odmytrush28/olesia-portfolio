import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { contact, profile } from '../data/content'
import { Reveal } from '../components/Reveal'
import { ResumeMenu } from '../components/ResumeMenu'
import { ArrowIcon, ArrowUpRight, CheckIcon, GitHubIcon, LinkedInIcon, MailIcon, PinIcon } from '../components/Icons'
import './contact.css'

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim() ?? ''
const ENDPOINT = 'https://api.web3forms.com/submit'

type Fields = { name: string; email: string; subject: string; message: string }
type Errors = Partial<Record<keyof Fields, string>>
type Status = 'idle' | 'sending' | 'sent' | 'error' | 'mailto'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(v: Fields): Errors {
  const e: Errors = {}
  if (v.name.trim().length < 2) e.name = 'Please enter your name.'
  if (!EMAIL_RE.test(v.email.trim())) e.email = 'Please enter a valid email address.'
  if (v.message.trim().length < 10) e.message = 'Please write at least a short message (10+ characters).'
  if (v.subject.length > 140) e.subject = 'Please keep the subject under 140 characters.'
  return e
}

export function Contact() {
  const [values, setValues] = useState<Fields>({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [copied, setCopied] = useState(false)
  const startedAt = useRef(Date.now())
  const honeypot = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const set = (k: keyof Fields) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const mailtoHref = () => {
    const subject = values.subject.trim() || 'Hello from your portfolio'
    const body = `${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`
    return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const errs = validate(values)
    setErrors(errs)
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0]
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    // Spam protection: hidden honeypot + "faster than a human" check.
    if (honeypot.current?.checked || Date.now() - startedAt.current < 2500) {
      setStatus('sent')
      return
    }
    if (!ACCESS_KEY) {
      window.location.href = mailtoHref()
      setStatus('mailto')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: values.subject.trim() || `Portfolio message from ${values.name.trim()}`,
          from_name: 'Olesia Dmytrush — Portfolio',
          name: values.name.trim(),
          email: values.email.trim(),
          replyto: values.email.trim(),
          message: values.message.trim(),
          botcheck: '',
        }),
      })
      const data = (await res.json().catch(() => ({}))) as { success?: boolean }
      if (res.ok && data.success) {
        setStatus('sent')
        setValues({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  const field = (k: keyof Fields, label: string, opts: { type?: string; textarea?: boolean; autoComplete?: string; optional?: boolean }) => (
    <div className={`field${errors[k] ? ' has-error' : ''}`}>
      <label htmlFor={`f-${k}`}>
        {label}
        {opts.optional && <span className="field__opt"> (optional)</span>}
      </label>
      {opts.textarea ? (
        <textarea
          id={`f-${k}`}
          name={k}
          rows={5}
          value={values[k]}
          onChange={set(k)}
          aria-invalid={Boolean(errors[k])}
          aria-describedby={errors[k] ? `e-${k}` : undefined}
          required={!opts.optional}
          maxLength={4000}
        />
      ) : (
        <input
          id={`f-${k}`}
          name={k}
          type={opts.type ?? 'text'}
          value={values[k]}
          onChange={set(k)}
          autoComplete={opts.autoComplete}
          aria-invalid={Boolean(errors[k])}
          aria-describedby={errors[k] ? `e-${k}` : undefined}
          required={!opts.optional}
          maxLength={k === 'subject' ? 140 : 200}
        />
      )}
      {errors[k] && (
        <p className="field__error" id={`e-${k}`}>
          {errors[k]}
        </p>
      )}
    </div>
  )

  return (
    <section id="contact" className="section dark contact" aria-labelledby="contact-title">
      <div className="contact__glow" aria-hidden="true" />
      <div className="container contact__grid">
        <Reveal className="contact__intro">
          <span className="label">
            [ <b>08</b> ] Contact
          </span>
          <h2 id="contact-title" className="contact__title">
            <span>{contact.title[0]}</span>
            <span className="accent">{contact.title[1]}</span>
          </h2>
          <p className="contact__text">{contact.text}</p>

          <ul className="contact__links">
            <li>
              <a href={`mailto:${profile.email}`} className="clink">
                <MailIcon />
                <span>
                  <span className="clink__label">Email</span>
                  <span className="clink__value">{profile.email}</span>
                </span>
              </a>
              <button type="button" className="clink__copy" onClick={copyEmail} aria-label="Copy email address">
                {copied ? <CheckIcon /> : 'Copy'}
              </button>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="clink">
                <LinkedInIcon />
                <span>
                  <span className="clink__label">LinkedIn</span>
                  <span className="clink__value">in/olesia-dmytrush</span>
                </span>
                <ArrowUpRight className="clink__arrow" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
            {profile.github && (
              <li>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="clink">
                  <GitHubIcon />
                  <span>
                    <span className="clink__label">GitHub</span>
                    <span className="clink__value">{profile.github.replace('https://github.com/', '@')}</span>
                  </span>
                  <ArrowUpRight className="clink__arrow" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            )}
          </ul>

          <div className="contact__extras">
            <ResumeMenu up dark />
            <p className="contact__where">
              <PinIcon /> {profile.location} · {profile.availability}
            </p>
          </div>
          <span className="sr-only" aria-live="polite">
            {copied ? 'Email address copied to clipboard.' : ''}
          </span>
        </Reveal>

        <Reveal className="contact__card" delay={100}>
          {status === 'sent' ? (
            <div className="sent" role="status">
              <span className="sent__icon" aria-hidden="true">
                <CheckIcon size={28} />
              </span>
              <h3>Message sent — thank you!</h3>
              <p>I read every message and will reply by email as soon as I can.</p>
              <button type="button" className="btn btn--ghost btn--sm" onClick={() => setStatus('idle')}>
                Send another
              </button>
            </div>
          ) : (
            <form ref={formRef} className="form" onSubmit={onSubmit} noValidate>
              <h3 className="form__title">Send a message</h3>
              {!ACCESS_KEY && (
                <p className="form__notice" role="note">
                  Direct form delivery isn’t switched on yet — pressing send opens your email app with your message
                  filled in.
                </p>
              )}
              <div className="form__row">
                {field('name', 'Name', { autoComplete: 'name' })}
                {field('email', 'Email', { type: 'email', autoComplete: 'email' })}
              </div>
              {field('subject', 'Subject', { optional: true })}
              {field('message', 'Message', { textarea: true })}

              {/* Honeypot — invisible to people, tempting to bots */}
              <label className="form__hp" aria-hidden="true">
                Leave this unchecked
                <input ref={honeypot} type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" />
              </label>

              <div className="form__foot">
                <button type="submit" className="btn btn--accent" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Send message'}
                  <ArrowIcon />
                </button>
                <p className="form__status" role="status" aria-live="polite">
                  {status === 'error' && (
                    <>
                      Something went wrong and the message wasn’t sent. Please{' '}
                      <a href={mailtoHref()}>email me directly</a>.
                    </>
                  )}
                  {status === 'mailto' && <>Your email app should have opened with the message ready to send.</>}
                </p>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
