import { motion } from 'motion/react'
import { LOCALE_LABEL, LOCALE_NAME, LOCALES } from '../data/i18n'
import { useI18n } from '../lib/locale'

/**
 * LanguageToggle — switches the whole site between Spanish and English.
 *
 * A two-segment pill rather than a single "ES/EN" button, so both options are
 * visible and the current one is unambiguous. The indicator slides via a shared
 * layoutId instead of two independent opacity fades, which is what makes the
 * motion read as one object moving rather than two states blinking.
 */
export default function LanguageToggle({ className = '' }) {
  const { locale, setLocale } = useI18n()
  const other = locale === 'es' ? 'en' : 'es'

  return (
    <div
      role="group"
      aria-label={LOCALE_NAME[other]}
      className={`flex shrink-0 items-center gap-0.5 rounded-full bg-white/[0.03] p-0.5 ring-1 ring-white/8 ${className}`}
    >
      {LOCALES.map((code) => {
        const active = code === locale
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={active}
            // Announced as "Español, selected" rather than the bare code.
            aria-label={`${LOCALE_NAME[code]}${active ? ', seleccionado' : ''}`}
            className="relative rounded-full px-2 py-1.5 font-mono text-[0.58rem] tracking-[0.12em] uppercase transition-colors duration-300"
          >
            {active && (
              <motion.span
                layoutId="locale-pill"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                className="absolute inset-0 rounded-full bg-peach"
              />
            )}
            <span
              className={`relative z-10 transition-colors duration-300 ${
                active ? 'text-ink' : 'text-slate-dim hover:text-mist'
              }`}
            >
              {LOCALE_LABEL[code]}
            </span>
          </button>
        )
      })}
    </div>
  )
}
