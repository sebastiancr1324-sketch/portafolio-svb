import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { useRef } from 'react'
import { LogoMark } from './Logo'
import { useIsMobile } from '../lib/hooks'
import { useI18n } from '../lib/locale'

/**
 * PortalMark — the site's own monogram, alone on the slab.
 *
 * Two hairline rings sit behind the mark and settle out of the perspective as
 * the slab lands, so the composition reads as a target the viewer is flying
 * into rather than a logo floating in a box. Rings first, then the mark, then
 * the rule: the same logo -> rule -> resolve order the four-mark wall used, so
 * both options feel like the same gesture.
 */
function PortalMark({ smooth, tagline }) {
  // Rings lead: they are the structure the mark arrives on. Both settle
  // roughly 1.6x and 2.5x the mark's final size, so the target hugs the logo
  // instead of floating in the middle of the slab.
  const ringNear = useTransform(smooth, [0.04, 0.9], [0.8, 1], { clamp: true })
  const ringFar = useTransform(smooth, [0.04, 0.9], [1.25, 1.05], { clamp: true })
  const ringOpacity = useTransform(smooth, [0.04, 0.3, 1], [0, 1, 0.55], { clamp: true })

  const markOpacity = useTransform(smooth, [0.2, 0.5], [0, 1], { clamp: true })
  const markScale = useTransform(smooth, [0.2, 0.62], [0.86, 1], { clamp: true })
  const markY = useTransform(smooth, [0.2, 0.62], [22, 0], { clamp: true })

  const ruleScale = useTransform(smooth, [0.34, 0.72], [0, 1], { clamp: true })
  const ruleOpacity = useTransform(smooth, [0.34, 0.6], [0, 1], { clamp: true })

  // The tagline lands last, so the composition resolves mark -> rule -> line.
  const taglineOpacity = useTransform(smooth, [0.46, 0.78], [0, 1], { clamp: true })
  const taglineY = useTransform(smooth, [0.46, 0.78], [10, 0], { clamp: true })
  const taglineScale = useTransform(smooth, [0.46, 0.78], [0.97, 1], { clamp: true })

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Rings */}
      <motion.div style={{ opacity: ringOpacity }} className="absolute inset-0 flex items-center justify-center">
        <motion.span
          style={{ scale: ringFar }}
          className="absolute aspect-square w-[56%] rounded-full ring-1 ring-white/8"
        />
        <motion.span
          style={{ scale: ringNear }}
          className="absolute aspect-square w-[38%] rounded-full ring-1 ring-white/12"
        />
      </motion.div>

      {/* Accent light behind the mark */}
      <motion.div
        aria-hidden="true"
        style={{ opacity: markOpacity }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div
          className="h-[58%] w-[58%] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(232,180,160,0.16) 0%, rgba(30,58,95,0.30) 45%, transparent 72%)',
            filter: 'blur(18px)',
          }}
        />
      </motion.div>

      {/* Mark + rule. The column carries a definite height so the mark's
          percentage resolves against the slab instead of collapsing. */}
      <motion.div
        style={{ opacity: markOpacity, scale: markScale, y: markY }}
        className="relative flex h-[72%] w-full flex-col items-center justify-center gap-4 sm:gap-7"
      >
        <LogoMark className="aspect-square h-[36%] max-h-72 w-auto sm:h-[60%]" />

        <motion.span
          style={{ scaleX: ruleScale, opacity: ruleOpacity }}
          className="h-px w-[38%] origin-left bg-linear-to-r from-transparent via-white/25 to-transparent sm:w-[min(20rem,58%)]"
        />

        {/* Tagline. Caption, not a heading: the mark above owns the hierarchy,
            so this sits a step down in size, weight and opacity. */}
        <motion.p
          style={{ opacity: taglineOpacity, y: taglineY, scale: taglineScale }}
          className="max-w-[20rem] text-center font-sans text-[0.72rem] font-medium tracking-[0.01em] text-peach/70 sm:max-w-[24rem] sm:text-lg"
        >
          {tagline}
        </motion.p>
      </motion.div>
    </div>
  )
}

/**
 * PortalTransition — the 3D scroll-driven bridge between hero and portfolio.
 *
 * A small glass slab holds the site's own mark. As the section scrolls, the
 * slab scales, un-tilts and travels toward the camera until it fills the
 * viewport, with the mark resolving on the way in.
 *
 * Motion is retuned per breakpoint. On a phone the same values read as "far
 * away", because a narrow viewport makes a small object feel distant and the
 * long perspective flattens the depth. Phones therefore get a tighter
 * perspective, a much larger start scale, a real translateZ toward the camera
 * and a shorter scroll run so the approach feels closer and quicker.
 *
 * The section is tall with a sticky child, so scroll position drives
 * everything. Only transform and opacity are animated, so it stays on the
 * compositor.
 */
export default function PortalTransition() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const isMobile = useIsMobile()
  const { t } = useI18n()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // Spring-smoothed progress removes scroll-wheel stutter from the transform.
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  })

  // Start closer on mobile, and travel toward the camera instead of only
  // growing — translateZ is what actually reads as "coming at you".
  const [from, to] = isMobile
    ? [{ s: 0.46, rx: 34, z: -280, y: 44 }, { s: 1, rx: 0, z: 0, y: 0 }]
    : [{ s: 0.22, rx: 26, z: -420, y: 70 }, { s: 1, rx: 0, z: 0, y: 0 }]

  const scale = useTransform(smooth, [0, 0.55, 1], [from.s, (from.s + 1) / 2, to.s])
  const rotateX = useTransform(smooth, [0, 1], [from.rx, to.rx])
  const z = useTransform(smooth, [0, 1], [from.z, to.z])
  const y = useTransform(smooth, [0, 1], [from.y, to.y])
  const opacity = useTransform(smooth, [0, 0.12], [0, 1])
  const radius = useTransform(smooth, [0, 1], [isMobile ? 22 : 28, 0])
  // The plate starts over-scaled and settles, so the mark feels like it is
  // rushing at the viewer rather than being revealed.
  const stageScale = useTransform(smooth, [0, 1], [isMobile ? 1.4 : 1.14, 1])
  const glowOpacity = useTransform(smooth, [0, 0.5, 1], [0.9, 0.35, 0])
  const hintOpacity = useTransform(smooth, [0, 0.18], [1, 0])

  if (reduce) {
    // Reduced motion: skip the travel and show a static lead-in.
    return (
      <section className="relative border-t border-white/8 py-24">
        <div className="shell text-center">
          <span className="font-mono text-[0.65rem] tracking-[0.3em] text-slate-dim uppercase">
            {t('portal.label')}
          </span>
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} aria-hidden="true" className={isMobile ? 'relative h-[160vh]' : 'relative h-[190vh]'}>
      <div
        className="sticky top-0 flex h-svh items-center justify-center overflow-hidden"
        style={{
          // Tighter perspective on phones so the depth actually registers.
          perspective: isMobile ? 780 : 1400,
        }}
      >
        {/* Ambient glow behind the slab */}
        <motion.div
          style={{ opacity: glowOpacity }}
          className="pointer-events-none absolute h-[70vmin] w-[70vmin] rounded-full"
        >
          <div
            className="h-full w-full rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(30,58,95,0.85) 0%, rgba(232,180,160,0.12) 45%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />
        </motion.div>

        {/* The portal itself */}
        <motion.div
          style={{
            scale,
            rotateX,
            y,
            z: z,
            opacity,
            borderRadius: radius,
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
          className="gpu relative aspect-[16/10] w-[88vw] max-w-5xl overflow-hidden bg-ink-deep shadow-[0_60px_180px_-40px_rgba(0,0,0,0.95)] ring-1 ring-white/12"
        >
          <motion.div style={{ scale: stageScale }} className="absolute inset-0">
            <PortalMark smooth={smooth} tagline={t('portal.tagline')} />
          </motion.div>

          {/* Screen sheen */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(200deg, rgba(255,255,255,0.10) 0%, transparent 38%, transparent 70%, rgba(0,0,0,0.30) 100%)',
            }}
          />
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="pointer-events-none absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
        >
          <span className="font-mono text-[0.6rem] tracking-[0.3em] text-slate uppercase">
            {t('portal.hint')}
          </span>
          <span className="relative h-10 w-px overflow-hidden bg-white/15">
            <motion.span
              animate={{ y: ['-100%', '100%'] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-x-0 h-1/2 bg-peach"
            />
          </span>
        </motion.div>
      </div>
    </section>
  )
}
