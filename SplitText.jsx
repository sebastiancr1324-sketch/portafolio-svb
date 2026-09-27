import { motion, useInView, useReducedMotion } from 'motion/react'
import { useMemo, useRef } from 'react'

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
 * The viewport trigger watches the *unmasked* root, never the fragments:
 * a fragment parked at `y: 105%` sits entirely outside its mask's clip,
 * and IntersectionObserver intersects a target with the clip rects of its
 * ancestors, so observing a fragment reports zero intersection forever and
 * the heading stays invisible. One observer on the root behaves the same
 * for every word and fires reliably.
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
  /** Applied to each animated fragment, not the root. Gradient text needs this:
      a composited fragment is not painted by an ancestor's background-clip:text,
      so `background-clip: text` has to live on the fragment that moves. */
  fragmentClassName = '',
  start = 'whileInView',
  once = true,
  amount = 0.4,
  /** Gates a `start="mount"` animation, so it can wait for the preloader. */
  active = true,
}) {
  const reduce = useReducedMotion()
  const Tag = ALLOWED_TAGS.has(as) ? as : 'span'
  const MotionTag = motionTag(Tag)
  const rootRef = useRef(null)
  const inView = useInView(rootRef, { once, amount })

  const units = useMemo(() => {
    if (!text) return []
    return by === 'char' ? Array.from(text) : text.split(' ')
  }, [text, by])

  // `mount` is gated by `active` so a headline can wait for the preloader;
  // every other mode is released by the root entering the viewport.
  const shown = start === 'mount' ? active : inView
  const hidden = { y: '105%', opacity: 0 }
  const visible = { y: '0%', opacity: 1 }

  return (
    <Tag ref={rootRef} className={className}>
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
              className={`inline-block will-change-transform ${fragmentClassName}`}
              initial={reduce ? visible : hidden}
              animate={reduce ? visible : shown ? visible : hidden}
              transition={{
                duration: reduce ? 0 : duration,
                delay: delay + i * (reduce ? 0 : stagger),
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {unit}
            </MotionTag>
          </span>
        ))}
      </span>
    </Tag>
  )
}
