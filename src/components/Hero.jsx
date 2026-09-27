import { motion } from 'motion/react'
import Aurora from './Aurora'
import PillButton from './PillButton'
import SplitText from './SplitText'
import { WHATSAPP_URL } from '../data/site'
import { useI18n } from '../lib/locale'

/**
 * Hero — the first screen.
 *
 * `ready` is held false until the preloader has finished, so the entrance
 * animation plays into a settled page instead of fighting the loader.
 */
export default function Hero({ ready = true }) {
  const { t } = useI18n()
  // Headline lines carry their own weight and timing, so they animate in
  // sequence rather than as one block.
  const headline = t('hero.headline')
  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden pt-32 pb-20"
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

      {/* Watermark: centred at every breakpoint, so it never bleeds off the
          top edge on narrow screens. The wrapper clips symmetrically, so on
          very narrow screens the wordmark bleeds equally on both sides. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden select-none"
      >
        <span
          className="font-display leading-none whitespace-nowrap text-bone/[0.04]"
          style={{ fontSize: 'clamp(13rem, 42vw, 38rem)' }}
        >
          SVB
        </span>
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
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 flex w-fit items-center gap-3 rounded-full bg-white/[0.04] py-2 pr-5 pl-3 ring-1 ring-white/10 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-peach opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-peach" />
          </span>
          <span className="font-mono text-[0.6rem] tracking-[0.2em] text-mist uppercase">
            {t('hero.available')}
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="max-w-[16ch] font-display text-[clamp(2.75rem,8.5vw,7.5rem)] leading-[0.9] tracking-[-0.02em]">
          {headline.map((line, i) => (
            <span key={line.text} className="split-line">
              <SplitText
                as="span"
                text={line.text}
                by="word"
                start="mount"
                delay={0.25 + i * 0.13}
                stagger={0.05}
                className={
                  line.tone === 'peach' ? 'text-gradient-peach' : 'text-bone'
                }
                active={ready}
              />
            </span>
          ))}
        </h1>

        {/* Sub + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.9, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <p className="max-w-md text-base leading-relaxed text-slate lg:text-lg">
            {t('hero.sub')}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <PillButton
              href={WHATSAPP_URL}
              variant="primary"
              size="lg"
              glow
              withArrow
            >
              {t('hero.ctaPrimary')}
            </PillButton>
            <PillButton href="#proyectos" variant="outline" size="lg" withArrow>
              {t('hero.ctaSecondary')}
            </PillButton>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
