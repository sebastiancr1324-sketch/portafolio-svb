import { motion } from 'motion/react'
import SplitText from './SplitText'
import { CURRENT_CITY, FACTS } from '../data/about'
import { useI18n } from '../lib/locale'

/**
 * Origin → current location. Small typographic device, no map image needed.
 */
function Journey() {
  const { t } = useI18n()
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8 }}
      className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3 border-y border-white/8 py-5 sm:gap-x-6"
    >
      <span className="font-display text-2xl text-bone md:text-3xl">
        {FACTS.originCity}
      </span>
      <span className="flex items-center gap-2" aria-hidden="true">
        <span className="h-px w-8 bg-white/15 sm:w-12" />
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-3.5 w-3.5 text-peach"
        >
          <path
            d="M4 12h15M14 6l6 6-6 6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="font-display text-2xl text-peach md:text-3xl">
        {CURRENT_CITY}
      </span>
      <span className="w-full font-mono text-[0.58rem] tracking-[0.2em] text-slate-dim uppercase sm:w-auto sm:ml-auto">
        {t('about.journeyNote')(FACTS.yearsInArgentina)}
      </span>
    </motion.div>
  )
}

function Stat({ value, label, note, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      className="border-t border-white/8 pt-5"
    >
      <div className="font-display text-5xl text-bone md:text-6xl">
        {value}
        <span className="text-peach">.</span>
      </div>
      <div className="mt-2 font-mono text-[0.62rem] tracking-[0.2em] text-mist uppercase">
        {label}
      </div>
      {note && (
        <div className="mt-1 text-xs leading-relaxed text-slate-dim">{note}</div>
      )}
    </motion.div>
  )
}

/**
 * About — who is behind the work.
 *
 * Placed before the closing CTA on purpose: the story builds trust, then the
 * ask converts. Sticky heading on desktop, stacked on mobile.
 */
export default function About() {
  const { t } = useI18n()
  const [titleTop, titleBottom] = t('about.titleLines')
  const bio = t('about.bio')
  const stats = t('about.stats')
  const drivers = t('about.drivers')
  const tech = t('tech')

  return (
    <section
      id="sobre-mi"
      className="relative scroll-mt-24 border-t border-white/8 py-28 md:py-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(55rem 30rem at 20% 100%, rgba(30,58,95,0.42) 0%, transparent 65%)',
        }}
      />

      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Heading, sticky on desktop. */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6 }}
                className="font-mono text-[0.62rem] tracking-[0.3em] text-peach uppercase"
              >
                {t('about.eyebrow')}
              </motion.span>

              <h2 className="mt-4 font-display text-[clamp(2.5rem,6vw,4.5rem)] text-bone">
                <SplitText as="span" text={titleTop} className="block" />
                <SplitText
                  as="span"
                  text={titleBottom}
                  className="block text-gradient-peach"
                />
              </h2>

              <Journey />
            </div>
          </div>

          {/* Bio + stats + drivers. */}
          <div className="lg:col-span-7">
            <div className="space-y-6">
              {bio.map((paragraph, i) => (
                <motion.p
                  key={paragraph.slice(0, 24)}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`leading-relaxed text-slate ${
                    i === 0
                      ? 'text-lg text-mist md:text-xl'
                      : 'text-base md:text-lg'
                  }`}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            <ul className="mt-12 grid gap-8 sm:grid-cols-3">
              {stats.map((stat, i) => (
                <li key={stat.label}>
                  <Stat {...stat} delay={i * 0.1} />
                </li>
              ))}
            </ul>

            {/* Tech chips. Doubles as scannable credentials and as SEO
                surface for the technologies the site is actually built with. */}
            <div className="mt-14">
              <motion.h3
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-mono text-[0.6rem] tracking-[0.24em] text-slate-dim uppercase"
              >
                {t('about.techLabel')}
              </motion.h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {tech.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                      duration: 0.55,
                      delay: i * 0.045,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="rounded-full bg-white/[0.04] px-4 py-2 font-mono text-[0.62rem] tracking-[0.12em] text-mist uppercase ring-1 ring-white/8 transition-colors duration-500 hover:text-peach hover:ring-peach/40"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>

            <ul className="mt-16 flex flex-col">
              {drivers.map((driver, i) => (
                <motion.li
                  key={driver.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.75,
                    delay: i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group border-t border-white/8 py-7 last:border-b hover:border-peach/40"
                >
                  <div className="flex items-baseline gap-5">
                    <span className="font-mono text-[0.6rem] text-peach/70 transition-colors duration-500 group-hover:text-peach">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-display text-xl text-bone">
                        {driver.title}
                      </h3>
                      <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate">
                        {driver.text}
                      </p>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
