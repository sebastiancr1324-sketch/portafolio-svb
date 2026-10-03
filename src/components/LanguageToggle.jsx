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
  const { locale, setLocale, t } = useI18n()

  return (
    <div
      role="group"
      aria-label={t('ui.language')}
      className={`flex shrink-0 items-center gap-0.5 rounded-full bg-white/[0.03] p-0.5 ring-1 ring-white/8 ${className}`}
    >
      {LOCALES.map((code) => {
        const active = code === locale
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            // aria-pressed already announces the selected state, in the
            // reader's own language; the label only names the option.
            aria-pressed={active}
            aria-label={LOCALE_NAME[code]}
            lang={code}
            // The pill stays compact, but an invisible ::after stretches the
            // tap target to 44px tall so it is easy to hit with a thumb.
            className="relative type-label rounded-full px-2.5 py-1.5 transition-colors duration-300 after:absolute after:inset-x-0 after:-inset-y-[9px] after:content-['']"
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
                active ? 'text-ink' : 'text-slate hover:text-mist'
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
