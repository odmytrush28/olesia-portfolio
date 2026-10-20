import { Nav } from './components/Nav'
import { Hero } from './components/hero/Hero'
import { About } from './sections/About'
import { Experience } from './sections/Experience'
import { Projects } from './sections/Projects'
import { CreativeStudio } from './sections/CreativeStudio'
import { InnovationLab } from './sections/InnovationLab'
import { HowIWork } from './sections/HowIWork'
import { Skills } from './sections/Skills'
import { Journey } from './sections/Journey'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'

export function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <CreativeStudio />
        <Skills />
        <InnovationLab />
        <HowIWork />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
