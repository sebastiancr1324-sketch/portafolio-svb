import { useState } from 'react'
import About from './components/About'
import FooterCTA from './components/FooterCTA'
import GlowCursor from './components/GlowCursor'
import Header from './components/Header'
import Hero from './components/Hero'
import Portfolio from './components/Portfolio'
import PortalTransition from './components/PortalTransition'
import Preloader from './components/Preloader'
import Services from './components/Services'

export default function App() {
  // Hero entrance waits on this so it plays into a settled page.
  const [ready, setReady] = useState(false)

  return (
    <>
      <Preloader onDone={() => setReady(true)} />

      {/* Decorative pointer light, fine-pointer devices only. */}
      <GlowCursor />

      <a
        href="#proyectos"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-peach focus:px-5 focus:py-3 focus:font-mono focus:text-xs focus:tracking-widest focus:text-ink focus:uppercase"
      >
        Saltar al contenido
      </a>

      <Header />

      <main>
        <Hero ready={ready} />
        <PortalTransition />
        <Portfolio />
        <Services />
        <About />
      </main>

      <FooterCTA />
    </>
  )
}
