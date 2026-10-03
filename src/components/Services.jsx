import { motion } from 'motion/react'
import SplitText from './SplitText'
import { whatsappWith } from '../data/site'
import { useI18n } from '../lib/locale'

/**
 * Services — a numbered editorial list rather than a card grid.
 * Hairline separators and oversized index numerals carry the hierarchy, so
 * four items read as one confident block. Each row is a real link: it opens
 * WhatsApp with a message about that service already typed in, so the arrow
 * promises a click that actually goes somewhere.
 */
export default function Services() {
  const { t } = useI18n()
  const [titleTop, titleBottom] = t('services.titleLines')
  const items = t('services.items')

  return (
    <section
      id="servicios"
      className="relative border-t border-white/8 py-24 md:py-32"
    >
      {/* Soft navy wash so the section separates from the portfolio above. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60rem 30rem at 80% 0%, rgba(30,58,95,0.4) 0%, transparent 65%)',
        }}
      />

      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          {/* Left: heading, sticky on desktop for a slow reveal. */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6 }}
                className="type-label text-peach"
              >
                {t('services.eyebrow')}
              </motion.span>

              <h2 className="type-display-lg mt-3 text-bone">
                <SplitText as="span" text={titleTop} by="word" className="block" />
                <SplitText
                  as="span"
                  text={titleBottom}
                  by="word"
                  className="block"
                  fragmentClassName="text-gradient-peach"
                />
              </h2>

              <p className="mt-6 max-w-sm text-base leading-relaxed text-slate">
                {t('services.lead')}
              </p>
            </div>
          </div>

          {/* Right: the list. */}
          <ul className="lg:col-span-7">
            {items.map((service, i) => (
              <motion.li
                key={service.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.75,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="border-t border-white/8 transition-colors duration-500 last:border-b hover:border-peach/40"
              >
                <a
                  href={whatsappWith(service.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-6 rounded-lg py-8 md:gap-10 md:py-10"
                >
                  <span className="font-display text-[1.75rem] leading-none text-peach/70 transition-colors duration-500 group-hover:text-peach">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <h3 className="type-title text-mist">{service.title}</h3>
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate md:text-base">
                      {service.text}
                    </p>
                  </div>
                  {/* Arrow nudges in on hover. */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                    className="mt-1 h-6 w-6 shrink-0 text-slate transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1.5 group-hover:text-peach"
                  >
                    <path
                      d="M4 12h16M14 6l6 6-6 6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
