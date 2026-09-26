import { motion } from 'motion/react'
import Aurora from './Aurora'
import PillButton from './PillButton'
import SplitText from './SplitText'
import { HERO_MARQUEE, WHATSAPP_URL } from '../data/site'

/** Headline broken into lines so each can carry its own weight and timing. */
const HEADLINE = [
  { text: 'Desarrollo web a medida', tone: 'bone' },
  { text: 'diseñado para convertir', tone: 'bone' },
  { text: 'visitantes en clientes.', tone: 'peach' },
]

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden pt-32 pb-10"
    >
      {/* Aurora canvas sits on a base gradient so the section is never flat,
          even where WebGL is unavailable or the effect is disabled. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20"
        style={{
          background:
            'radial-gradient(70rem 40rem at 20% -10%, #1E3A5F 0%, transparent 62%), radial-gradient(50rem 30rem at 85% 110%, rgba(232,180,160,0.10) 0%, transparent 60%)',
        }}
      />
      <div className="absolute inset-0 -z-10">
        <Aurora colorA="#1E3A5F" colorB="#E8B4A0" intensity={0.95} />
      </div>

      {/* Watermark: oversized monogram, 4% opacity, behind everything. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[6vh] -right-[6vw] -z-10 select-none font-display leading-none text-bone/[0.04]"
        style={{ fontSize: 'clamp(18rem, 46vw, 44rem)' }}
      >
        SVB
      </div>

      {/* Hairline grid, barely there. Adds structure without noise. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px)',
          backgroundSize: 'clamp(80px, 12vw, 160px) 100%',
          maskImage: 'linear-gradient(to bottom, black, transparent 78%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black, transparent 78%)',
        }}
      />

      <div className="shell relative">
        {/* Availability pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 flex w-fit items-center gap-3 rounded-full bg-white/[0.04] py-2 pr-5 pl-3 ring-1 ring-white/10 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-peach opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-peach" />
          </span>
          <span className="font-mono text-[0.6rem] tracking-[0.2em] text-mist uppercase">
            Disponible para proyectos nuevos
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="max-w-[16ch] font-display text-[clamp(2.75rem,8.5vw,7.5rem)] leading-[0.9] tracking-[-0.02em]">
          {HEADLINE.map((line, i) => (
            <span key={line.text} className="split-line">
              <SplitText
                as="span"
                text={line.text}
                by="word"
                start="mount"
                delay={0.25 + i * 0.13}
                stagger={0.05}
                className={
                  line.tone === 'peach'
                    ? 'text-gradient-peach'
                    : 'text-bone'
                }
              />
            </span>
          ))}
        </h1>

        {/* Sub + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <p className="max-w-md text-base leading-relaxed text-slate lg:text-lg">
            Desde landing pages hasta e-commerce. Soluciones escalables que hacen
            crecer tu marca.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <PillButton
              href={WHATSAPP_URL}
              variant="primary"
              size="lg"
              glow
              withArrow
            >
              Iniciar proyecto
            </PillButton>
            <PillButton href="#proyectos" variant="outline" size="lg" withArrow>
              Ver proyectos
            </PillButton>
          </div>
        </motion.div>
      </div>

      {/* Marquee strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="shell relative mt-16 border-t border-white/8 pt-6"
        aria-hidden="true"
      >
        <div className="flex overflow-hidden">
          <div className="flex shrink-0 animate-[marquee_38s_linear_infinite] items-center gap-10 pr-10">
            {[...HERO_MARQUEE, ...HERO_MARQUEE].map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="font-mono text-[0.65rem] tracking-[0.28em] whitespace-nowrap text-slate-dim uppercase"
              >
                {item}
                <span className="ml-10 text-peach/60">/</span>
              </span>
            ))}
          </div>
          <div className="flex shrink-0 animate-[marquee_38s_linear_infinite] items-center gap-10 pr-10">
            {[...HERO_MARQUEE, ...HERO_MARQUEE].map((item, i) => (
              <span
                key={`b-${item}-${i}`}
                className="font-mono text-[0.65rem] tracking-[0.28em] whitespace-nowrap text-slate-dim uppercase"
              >
                {item}
                <span className="ml-10 text-peach/60">/</span>
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
