import { asset, nav, profile, resumes } from '../data/content'
import { Link } from '../router'
import { ArrowIcon, LinkedInIcon, MailIcon, GitHubIcon, DownloadIcon } from '../components/Icons'
import './footer.css'

export function Footer() {
  const general = resumes[0]
  return (
    <footer className="footer dark">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__name">
            {profile.firstName} <b>{profile.lastName}</b>
          </span>
          <span className="footer__tag">Business Analyst · AI &amp; Data Solutions · IT Audit &amp; QA</span>
        </div>
        <nav aria-label="Footer">
          <ul className="footer__nav">
            {nav.slice(1).map((n) => (
              <li key={n.id}>
                <Link to={n.to}>{n.label}</Link>
              </li>
            ))}
            <li>
              <a href={asset(general.file)} download className="footer__resume">
                <DownloadIcon size={14} /> Résumé
              </a>
            </li>
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
          <button type="button" className="footer__top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <ArrowIcon className="footer__top-icon" />
          </button>
        </div>
      </div>
      <div className="container footer__base">
        <span>© 2026 {profile.name}</span>
        <span>Designed &amp; built with React, TypeScript &amp; WebGL</span>
      </div>
    </footer>
  )
}
