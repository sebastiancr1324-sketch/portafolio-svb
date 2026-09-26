import FooterCTA from './components/FooterCTA'
import GlowCursor from './components/GlowCursor'
import Header from './components/Header'
import Hero from './components/Hero'
import Portfolio from './components/Portfolio'
import PortalTransition from './components/PortalTransition'
import Services from './components/Services'

export default function App() {
  return (
    <>
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
        <Hero />
        <PortalTransition />
        <Portfolio />
        <Services />
      </main>

      <FooterCTA />
    </>
  )
}
