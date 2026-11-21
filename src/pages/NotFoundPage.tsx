import { Link } from '../router'
import { ArrowIcon } from '../components/Icons'

export function NotFoundPage() {
  return (
    <div className="page">
      <section className="section notfound">
        <div className="container">
          <span className="label">
            [ <b>404</b> ] Not found
          </span>
          <h1 className="notfound__title">This page doesn’t exist.</h1>
          <p className="notfound__text">The link may be old or mistyped. Here is the way back:</p>
          <Link to="/" className="btn btn--primary">
            Go to the home page
            <span className="btn__orb" aria-hidden="true">
              <ArrowIcon />
            </span>
          </Link>
        </div>
      </section>
    </div>
  )
}
