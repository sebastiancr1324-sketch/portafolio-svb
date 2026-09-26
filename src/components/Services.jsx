import { motion } from 'motion/react'
import { SERVICES } from '../data/projects'
import SplitText from './SplitText'

/**
 * Services — a numbered editorial list rather than a card grid.
 * Hairline separators and oversized index numerals carry the hierarchy, so
 * four items read as one confident block.
 */
export default function Services() {
  return (
    <section
      id="servicios"
      className="relative scroll-mt-24 border-t border-white/8 py-28 md:py-36"
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
                className="font-mono text-[0.62rem] tracking-[0.3em] text-peach uppercase"
              >
                Qué hago
              </motion.span>

              <h2 className="mt-4 font-display text-[clamp(2.5rem,6vw,4.5rem)] text-bone">
                <SplitText as="span" text="Del primer" by="word" className="block" />
                <SplitText
                  as="span"
                  text="clic a la venta"
                  by="word"
                  className="block text-gradient-peach"
                />
              </h2>

              <p className="mt-6 max-w-sm text-base leading-relaxed text-slate">
                Construyo sitios pensados para una sola cosa: que alguien que
                llega desde un anuncio termine hablando con vos por WhatsApp.
              </p>
            </div>
          </div>

          {/* Right: the list. */}
          <ul className="lg:col-span-7">
            {SERVICES.map((service, i) => (
              <motion.li
                key={service.index}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.75,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group border-t border-white/8 py-8 transition-colors duration-500 last:border-b hover:border-peach/40 md:py-10"
              >
                <div className="flex items-start gap-6 md:gap-10">
                  <span className="mt-1 font-display text-2xl text-peach/70 transition-colors duration-500 group-hover:text-peach md:text-3xl">
                    {service.index}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-xl text-bone md:text-2xl">
                      {service.title}
                    </h3>
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
                    className="mt-2 hidden h-6 w-6 shrink-0 text-slate-dim transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1.5 group-hover:text-peach md:block"
                  >
                    <path
                      d="M4 12h16M14 6l6 6-6 6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
