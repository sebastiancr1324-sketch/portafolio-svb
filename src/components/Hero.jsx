import { motion } from 'motion/react'
import Aurora from './Aurora'
import ElectricLogo from './ElectricLogo'
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
      className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-20"
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
        {/* Copy left, mark right from lg up. Below that the three blocks stack
            in reading order: promise, mark, reason to act. */}
        <div className="grid items-center gap-x-8 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:gap-y-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,600px)]">
          <div className="min-w-0 lg:col-start-1 lg:row-start-1">
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
              {headline.map(line => (
                <span key={line.text} className="split-line">
                  <SplitText
                    as="span"
                    text={line.text}
                    by="word"
                    start="mount"
                    // Same start for every line: the three of them reveal as one
                    // block, word by word. A per-line offset made the accent line
                    // land a beat after the rest and read as a late arrival.
                    delay={0.3}
                    stagger={0.05}
                    className={line.tone === 'peach' ? undefined : 'text-bone'}
                    fragmentClassName={line.tone === 'peach' ? 'text-gradient-peach' : ''}
                    active={ready}
                  />
                </span>
              ))}
            </h1>
          </div>

          {/* Electric mark. The wordmark is traced from its own alpha channel,
              so the arcs cling to the letterforms instead of boxing them in.
              On a phone it lands between the headline and the sub; from lg up it
              moves to the right column and spans both text rows, which centres it
              against them. Decorative: the headline names him. */}
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, y: 18 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-start-2 lg:row-span-2 lg:row-start-1"
          >
            <div className="relative mx-auto aspect-[3/2] w-full max-w-[24rem] sm:max-w-[28rem] lg:max-w-[460px] lg:aspect-square xl:max-w-[600px]">
              <ElectricLogo
                // Base-aware: the site is served from a sub-path
                // (/portafolio-svb/), so a root-absolute "/logo.svg" 404s
                // there and the logo never draws.
                src={`${import.meta.env.BASE_URL}logo.svg`}
                color="#F4CDBB"
                glowColor="#E8B4A0"
                scale={0.8}
                strands={4}
                bend={0.6}
                crackle={1.5}
                arcs={1}
                speed={2.5}
                interactive
                intensity={1}
                glow={1}
                thickness={1.5}
                flicker={0.6}
                fill={0}
                cursorIntensity={0.75}
                cursorRadius={100}
              />
            </div>
          </motion.div>

          {/* Sub + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.9, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-8 lg:col-start-1 lg:row-start-2"
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
      </div>
    </section>
  )
}
