import { useEffect, useState } from 'react'

/**
 * Tracks the user's `prefers-reduced-motion` setting reactively.
 * Decorative loops (cursor glow, aurora, scroll portal) read this and stand
 * down, so the site stays usable without vestibular motion.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (event) => setReduced(event.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

/**
 * True on phone-width viewports.
 *
 * Used to retune motion values, not to branch layout: the 3D scroll portal
 * needs different travel distances and perspective on a small screen for the
 * effect to read as "coming toward you" rather than "far away".
 */
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches
  })

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    const onChange = (event) => setIsMobile(event.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [breakpoint])

  return isMobile
}
