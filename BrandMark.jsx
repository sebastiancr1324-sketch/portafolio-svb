import { motion, useReducedMotion } from 'motion/react'

/**
 * BrandMark — the SVB monogram with its intro animation.
 *
 * The V draws itself first, then the underline sweeps in underneath. Shared by
 * the preloader and the closing CTA so the mark is recognisable as the same
 * gesture in both places, rather than a static repeat.
 *
 * `trigger` picks the moment the animation starts:
 *   'mount'      - immediately (preloader)
 *   'whileInView' - when scrolled into the viewport (footer)
 */
export default function BrandMark({
  className = 'h-14 w-14',
  delay = 0,
  trigger = 'whileInView',
  duration = 1.1,
}) {
  const reduce = useReducedMotion()

  const anim = reduce
    ? { animate: { pathLength: 1, opacity: 1 } }
    : trigger === 'mount'
      ? {
          animate: { pathLength: 1, opacity: 1 },
          transition: {
            pathLength: { duration, delay, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.2, delay },
          },
        }
      : {
          whileInView: { pathLength: 1, opacity: 1 },
          viewport: { once: true, amount: 0.4 },
          transition: {
            pathLength: { duration, delay, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.2, delay },
          },
        }

  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      {/* The V */}
      <motion.path
        d="M11 13.5 L20 27.5 L29 13.5"
        stroke="#E8B4A0"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        {...anim}
      />
      {/* The underline, trailing the V */}
      <motion.path
        d="M14.5 32 H25.5"
        stroke="#E8B4A0"
        strokeWidth="3.2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        {...(reduce
          ? { animate: { pathLength: 1, opacity: 0.9 } }
          : {
              [trigger === 'mount' ? 'animate' : 'whileInView']: {
                pathLength: 1,
                opacity: 0.9,
              },
              ...(trigger === 'mount'
                ? {}
                : { viewport: { once: true, amount: 0.4 } }),
              transition: {
                pathLength: {
                  duration: reduce ? 0 : 0.6,
                  delay: reduce ? 0 : delay + 0.6,
                  ease: [0.16, 1, 0.3, 1],
                },
                opacity: {
                  duration: reduce ? 0 : 0.4,
                  delay: reduce ? 0 : delay + 0.6,
                },
              },
            })}
      />
    </svg>
  )
}
