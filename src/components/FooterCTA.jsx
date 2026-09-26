import { motion, useReducedMotion } from 'motion/react'
import SplitText from './SplitText'
import { INSTAGRAM_URL, EMAIL, OWNER, WHATSAPP_URL } from '../data/site'

/**
 * GiantCta — the closing action.
 *
 * Micro-interactions, all CSS-driven so they cost nothing per frame:
 * a light sweeps across the face, a ring breathes behind it, and the whole
 * button lifts on hover.
 */
function GiantCta() {
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="flex justify-center"
    >
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribime por WhatsApp para iniciar tu proyecto (se abre en una pestaña nueva)"
        className="group relative isolate inline-flex items-center gap-4 overflow-hidden rounded-full bg-peach px-10 py-6 text-ink shadow-[0_24px_80px_-20px_rgba(232,180,160,0.6)] transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] hover:-translate-y-1.5 hover:shadow-[0_34px_110px_-18px_rgba(232,180,160,0.8)] active:translate-y-0 sm:px-14 sm:py-7"
      >
        {/* Breathing halo behind the pill. */}
        {!reduce && (
          <span
            aria-hidden="true"
            className="absolute inset-0 -z-10 rounded-full ring-1 ring-peach/60"
            style={{ animation: 'cta-halo 3.2s ease-in-out infinite' }}
          />
        )}

        {/* Light sweep across the face on hover. */}
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 translate-x-[-120%] skew-x-12 bg-linear-to-r from-transparent via-white/45 to-transparent transition-transform duration-1000 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-[120%]"
        />

        <span className="font-display text-lg tracking-[0.02em] uppercase sm:text-2xl">
          Iniciar proyecto
        </span>

        {/* WhatsApp glyph */}
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className="h-6 w-6 shrink-0 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-110 sm:h-7 sm:w-7"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.16c-.24.68-1.4 1.32-1.94 1.36-.5.05-.98.23-3.3-.69-2.78-1.1-4.55-3.94-4.69-4.13-.14-.19-1.13-1.5-1.13-2.86 0-1.36.72-2.03.97-2.31.25-.28.55-.35.73-.35l.53.01c.17 0 .4-.06.62.48.24.57.8 1.97.87 2.11.07.14.12.31.02.5-.1.19-.15.31-.29.47l-.44.51c-.14.14-.29.3-.13.59.17.28.74 1.22 1.59 1.98 1.09.97 2.01 1.28 2.3 1.42.28.14.45.12.61-.07.17-.19.7-.81.88-1.09.19-.28.37-.23.62-.14.25.09 1.6.75 1.87.89.28.14.46.21.53.33.07.11.07.66-.17 1.35Z" />
        </svg>
      </a>
    </motion.div>
  )
}

/**
 * FooterCTA — the close. No bio, no form: one question and one action.
 * A slim strip below carries the only remaining metadata.
 */
export default function FooterCTA() {
  return (
    <footer
      id="contacto"
      className="relative scroll-mt-24 overflow-hidden border-t border-white/8 pt-28 pb-10 md:pt-40"
    >
      {/* Aurora-lit backdrop for the finale. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(70rem 36rem at 50% 120%, rgba(30,58,95,0.75) 0%, transparent 62%), radial-gradient(40rem 22rem at 50% 0%, rgba(232,180,160,0.10) 0%, transparent 60%)',
        }}
      />

      <div className="shell flex flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-[0.62rem] tracking-[0.3em] text-peach uppercase"
        >
          Siguiente paso
        </motion.span>

        <h2 className="mt-6 max-w-[18ch] font-display text-[clamp(2.5rem,8.5vw,7rem)] leading-[0.92] text-bone">
          <SplitText
            as="span"
            text="¿Listo para destacar tu negocio en internet?"
            by="word"
            className="block"
          />
        </h2>

        <p className="mt-7 max-w-md text-base leading-relaxed text-slate md:text-lg">
          Contame qué tenés en mente y te paso una idea de cómo se vería tu
          proyecto.
        </p>

        <div className="mt-12">
          <GiantCta />
        </div>

        <p className="mt-5 font-mono text-[0.6rem] tracking-[0.2em] text-slate-dim uppercase">
          Respuesta en menos de 24 horas
        </p>
      </div>

      {/* Slim meta strip */}
      <div className="shell mt-24 border-t border-white/8 pt-8 md:mt-32">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <p className="font-mono text-[0.6rem] tracking-[0.18em] text-slate-dim uppercase">
            © {new Date().getFullYear()} {OWNER.name}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[0.6rem] tracking-[0.18em] text-slate uppercase transition-colors duration-500 hover:text-peach"
            >
              Instagram
            </a>
            <span aria-hidden="true" className="h-3 w-px bg-white/12" />
            <a
              href={`mailto:${EMAIL}`}
              className="font-mono text-[0.6rem] tracking-[0.18em] text-slate uppercase transition-colors duration-500 hover:text-peach"
            >
              {EMAIL}
            </a>
            <span aria-hidden="true" className="h-3 w-px bg-white/12" />
            <span className="font-mono text-[0.6rem] tracking-[0.18em] text-slate-dim uppercase">
              {OWNER.location}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
