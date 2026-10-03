import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useRef, useState } from 'react'
import FullMenu from './FullMenu'
import LanguageToggle from './LanguageToggle'
import Logo from './Logo'
import PillButton from './PillButton'
import { NAV_LINKS, WHATSAPP_URL } from '../data/site'
import { useI18n } from '../lib/locale'

/**
 * Header — floating glass bar that retracts on scroll-down and returns on
 * scroll-up, so it never fights the content it floats over.
 */
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [condensed, setCondensed] = useState(false)
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()
  const lastY = useRef(0)
  const { t } = useI18n()

  useMotionValueEvent(scrollY, 'change', (y) => {
    setCondensed(y > 48)
    const delta = y - lastY.current
    // Ignore sub-pixel jitter.
    if (Math.abs(delta) < 6) return
    if (y > 120 && delta > 0) setHidden(true)
    else setHidden(false)
    lastY.current = y
  })

  // Derived, not stored: the menu owns the page while it is open, so the bar
  // steps out of the way without a second state variable or an effect.
  const isRetracted = hidden || menuOpen

  return (
    <>
      <motion.header
        animate={{ y: isRetracted ? '-140%' : '0%' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 right-4 left-4 z-80 sm:top-6 sm:right-6 sm:left-6"
      >
        <motion.div
          animate={{
            paddingLeft: condensed ? '0.75rem' : '1rem',
            paddingRight: condensed ? '0.75rem' : '1rem',
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="glass mx-auto flex max-w-6xl items-center justify-between rounded-full"
          style={{
            paddingTop: condensed ? '0.5rem' : '0.625rem',
            paddingBottom: condensed ? '0.5rem' : '0.625rem',
          }}
        >
          <a
            href="#top"
            aria-label={t('ui.backToTop')}
            className="rounded-full transition-opacity duration-500 hover:opacity-70"
          >
            <Logo compact={condensed} />
          </a>

          {/* Desktop: the sections are one click away. The full-screen menu
              stays for touch screens, where there is no room for a bar. */}
          <nav aria-label={t('ui.mainNav')} className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="type-button block rounded-full px-3 py-3 whitespace-nowrap text-slate xl:px-4 transition-colors duration-300 hover:text-mist"
                  >
                    {t(`nav.${link.key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageToggle />

            {/* Circular menu trigger — the icon morphs into an X. Touch only. */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="menu-fullscreen"
              aria-label={menuOpen ? t('ui.closeMenu') : t('ui.openMenu')}
              className="hairline group relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/[0.03] transition-colors duration-500 hover:bg-white/[0.08] lg:hidden"
            >
              <span className="relative block h-3 w-4">
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-0 left-0 block h-px w-full bg-bone"
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-0 left-0 block h-px w-full bg-bone"
                />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {!condensed && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, width: 0 }}
                  animate={{ opacity: 1, scale: 1, width: 'auto' }}
                  exit={{ opacity: 0, scale: 0.9, width: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="hidden overflow-hidden sm:block"
                >
                  <PillButton
                    href={WHATSAPP_URL}
                    variant="primary"
                    size="sm"
                    glow
                    className="whitespace-nowrap"
                  >
                    {t('hero.ctaPrimary')}
                  </PillButton>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.header>

      <FullMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
