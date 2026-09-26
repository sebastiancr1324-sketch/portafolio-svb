import { motion, useReducedMotion } from 'motion/react'
import { useMemo } from 'react'

/**
 * `motion` is a Proxy that builds a brand-new component on every property
 * access, so reading it inside render would hand React a different component
 * identity each pass — remounting every word and replaying the animation.
 * Resolving each tag once at module scope keeps the identity stable.
 */
const MOTION_TAGS = new Map()
function motionTag(tag) {
  if (!MOTION_TAGS.has(tag)) {
    MOTION_TAGS.set(tag, motion[tag] ?? motion.span)
  }
  return MOTION_TAGS.get(tag)
}

/** Tags that are valid children of the element SplitText is rendered into. */
const ALLOWED_TAGS = new Set(['span', 'div', 'p', 'h1', 'h2', 'h3', 'h4', 'strong', 'em'])

/**
 * SplitText — animates a string in word-by-word (or char-by-char),
 * each fragment masked by an overflow-hidden wrapper so it slides up
 * from behind a clipping edge.
 *
 * Accessibility: the visual fragments are aria-hidden and the whole
 * sentence is exposed once via a visually-hidden copy, so screen
 * readers never announce a word at a time.
 */
export default function SplitText({
  text,
  as = 'span',
  by = 'word',
  delay = 0,
  stagger = 0.045,
  duration = 0.9,
  className = '',
  start = 'whileInView',
  once = true,
  amount = 0.4,
}) {
  const reduce = useReducedMotion()
  const Tag = ALLOWED_TAGS.has(as) ? as : 'span'
  const MotionTag = motionTag(Tag)

  const units = useMemo(() => {
    if (!text) return []
    return by === 'char' ? Array.from(text) : text.split(' ')
  }, [text, by])

  const anim =
    start === 'mount'
      ? { animate: { y: '0%', opacity: 1 } }
      : { whileInView: { y: '0%', opacity: 1 }, viewport: { once, amount } }

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-block">
        {units.map((unit, i) => (
          <span
            key={`${unit}-${i}`}
            className="split-mask"
            // Preserve real spaces between words without breaking inline layout.
            style={by === 'word' && i < units.length - 1 ? { marginRight: '0.25em' } : undefined}
          >
            <MotionTag
              className="inline-block will-change-transform"
              initial={reduce ? { y: '0%', opacity: 1 } : { y: '105%', opacity: 0 }}
              transition={{
                duration: reduce ? 0 : duration,
                delay: delay + i * (reduce ? 0 : stagger),
                ease: [0.16, 1, 0.3, 1],
              }}
              {...anim}
            >
              {unit}
            </MotionTag>
          </span>
        ))}
      </span>
    </Tag>
  )
}
