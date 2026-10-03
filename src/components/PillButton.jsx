import { useCallback, useRef } from 'react'

/* Shared by every CTA so radii, type and motion never drift apart. */
const BASE =
  'group relative inline-flex items-center justify-center gap-2.5 rounded-full ' +
  'type-button no-select ' +
  'transition-[transform,background-color,border-color,color,box-shadow] duration-500 ' +
  '[transition-timing-function:var(--ease-out-expo)] will-change-transform'

/* Every size is at least 44px tall, so each one is a comfortable tap target. */
const SIZES = {
  sm: 'h-11 px-5',
  md: 'h-12 px-7',
  lg: 'h-14 px-9',
  xl: 'h-16 px-10',
}

const VARIANTS = {
  /** Filled accent. Highest emphasis — reserved for the primary action. */
  primary: 'bg-peach text-ink hover:bg-peach-bright shadow-cta',
  /** Transparent with a hairline border. Default for secondary actions. */
  outline:
    'border border-white/14 bg-transparent text-mist hover:border-mist hover:text-bone',
  /** Solid navy, for mid-weight actions on light sections. */
  navy: 'bg-navy text-bone hover:bg-navy-soft',
  /** Quiet text link with an arrow that slides on hover.
   *  `px-0!` is required: the size variant also sets horizontal padding, and
   *  two plain padding utilities have identical specificity, so which one
   *  wins would otherwise depend on Tailwind's output order. */
  ghost: 'text-mist hover:text-peach px-0!',
}

/**
 * Tracks the pointer across the button and publishes it as `--mx` / `--my`,
 * which the `.glow-ring` pseudo-elements read. Written straight to the DOM
 * node so hover does not re-render the component.
 */
function useGlowTracking() {
  const ref = useRef(null)

  const onPointerMove = useCallback((event) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    el.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }, [])

  return { ref, onPointerMove }
}

/** Small arrow that nudges right on hover. */
function Arrow({ className = '' }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`h-3.5 w-3.5 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1 ${className}`}
    >
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  )
}

/**
 * PillButton — the single button primitive for the whole site.
 *
 * `glow` swaps the plain hairline for the animated conic-gradient ring
 * (the BorderGlow treatment). Renders an <a> when `href` is present.
 */
export default function PillButton({
  children,
  href,
  variant = 'outline',
  size = 'md',
  glow = false,
  withArrow = false,
  className = '',
  onClick,
  ...rest
}) {
  const { ref, onPointerMove } = useGlowTracking()
  const classes = [BASE, SIZES[size], VARIANTS[variant], className]
    .filter(Boolean)
    .join(' ')

  const inner = (
    <>
      <span className="relative z-10 flex items-center gap-2.5">
        {children}
        {withArrow && <Arrow />}
      </span>
    </>
  )

  if (href) {
    const external = /^https?:/.test(href)
    return (
      <a
        ref={ref}
        href={href}
        onPointerMove={onPointerMove}
        onClick={onClick}
        className={`${glow ? 'glow-ring' : ''} ${classes} hover:-translate-y-0.5 active:translate-y-0`}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {inner}
      </a>
    )
  }

  return (
    <button
      ref={ref}
      type="button"
      onPointerMove={onPointerMove}
      onClick={onClick}
      className={`${glow ? 'glow-ring' : ''} ${classes} hover:-translate-y-0.5 active:translate-y-0`}
      {...rest}
    >
      {inner}
    </button>
  )
}
