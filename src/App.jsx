import { useState } from 'react'
import About from './components/About'
import FooterCTA from './components/FooterCTA'
import GlowCursor from './components/GlowCursor'
import Header from './components/Header'
import HeroStory from './components/HeroStory'
import Portfolio from './components/Portfolio'
import Preloader from './components/Preloader'
import Services from './components/Services'
import { LocaleProvider } from './lib/LocaleProvider'
import { useI18n } from './lib/locale'

function Shell() {
  // Hero entrance waits on this so it plays into a settled page.
  const [ready, setReady] = useState(false)
  const { t } = useI18n()

  return (
    <>
      <Preloader onDone={() => setReady(true)} />

      {/* Decorative pointer light, fine-pointer devices only. */}
      <GlowCursor />

      <a
        href="#proyectos"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-peach focus:px-5 focus:py-3 focus:font-mono focus:text-xs focus:tracking-widest focus:text-ink focus:uppercase"
      >
        {t('ui.skipToContent')}
      </a>

      <Header />

      <main>
        <HeroStory ready={ready} />
        <Portfolio />
        <Services />
        <About />
      </main>

      <FooterCTA />
    </>
  )
}

export default function App() {
  return (
    <LocaleProvider>
      <Shell />
    </LocaleProvider>
  )
}
