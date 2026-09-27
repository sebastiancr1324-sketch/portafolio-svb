import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { useRef } from 'react'
import { PROJECTS } from '../data/projects'
import { useIsMobile } from '../lib/hooks'
import { useI18n } from '../lib/locale'

/**
 * PortalTransition — the 3D scroll-driven bridge between hero and portfolio.
 *
 * A small glass slab holds a mosaic of the four real project shots. As the
 * section scrolls, the slab scales, un-tilts and travels toward the camera
 * until it fills the viewport, at which point the mosaic has become the
 * portfolio.
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
  const { t, dict } = useI18n()

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
  // Inner mosaic starts over-scaled and settles, so the shot feels like it is
  // rushing at the viewer rather than being revealed.
  const mosaicScale = useTransform(smooth, [0, 1], [isMobile ? 1.6 : 1.35, 1])
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
    <section ref={ref} aria-hidden="true" className={isMobile ? 'relative h-[220vh]' : 'relative h-[260vh]'}>
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
          {/* Mosaic of the four projects */}
          <motion.div
            style={{ scale: mosaicScale }}
            className="absolute inset-0 grid grid-cols-2 gap-px bg-white/8"
          >
            {PROJECTS.map((project) => (
              <div key={project.id} className="relative overflow-hidden bg-navy-deep">
                <img
                  src={project.shot}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, transparent 40%, rgba(10,15,24,0.75) 100%)',
                  }}
                />
                <span className="absolute bottom-3 left-3 font-mono text-[0.55rem] tracking-[0.2em] text-bone/80 uppercase">
                  {project.index} — {dict.projects[project.id].name}
                </span>
              </div>
            ))}
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
