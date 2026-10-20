import { nav, profile } from '../data/content'
import { ArrowIcon, LinkedInIcon, MailIcon, GitHubIcon } from '../components/Icons'
import './footer.css'

export function Footer() {
  return (
    <footer className="footer dark">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__name">
            {profile.firstName} <b>{profile.lastName}</b>
          </span>
          <span className="footer__tag">IT Audit · Business Analysis · QA · Technology</span>
        </div>
        <nav aria-label="Footer">
          <ul className="footer__nav">
            {nav.slice(1).map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`}>{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="footer__social">
          <a href={`mailto:${profile.email}`} aria-label="Email Olesia">
            <MailIcon />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)">
            <LinkedInIcon />
          </a>
          {profile.github && (
            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)">
              <GitHubIcon />
            </a>
          )}
          <a href="#home" className="footer__top" aria-label="Back to top">
            <ArrowIcon className="footer__top-icon" />
          </a>
        </div>
      </div>
      <div className="container footer__base">
        <span>© 2026 {profile.name}</span>
        <span>Designed &amp; built with React, TypeScript &amp; WebGL</span>
      </div>
    </footer>
  )
}
