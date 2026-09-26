import { useEffect, useRef } from 'react'

/* Selector list for anything that should make the cursor react. */
const INTERACTIVE = [
  'a[href]',
  'button',
  'input',
  'textarea',
  'select',
  'label',
  '[role="button"]',
  '[data-cursor="hover"]',
].join(',')

/**
 * GlowCursor — a soft light that trails the pointer and swells over
 * interactive targets.
 *
 * Runs entirely outside React: one rAF loop writes `transform` directly to
 * two DOM nodes, so pointer movement never triggers a re-render. The element
 * also sets `has-glow-cursor` on <body> so CSS can hide the native cursor.
 */
export default function GlowCursor() {
  const glowRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    const glow = glowRef.current
    const dot = dotRef.current
    if (!glow || !dot) return

    // Fine-pointer only: no glow on touch, and native cursor is left alone.
    const fine = window.matchMedia?.('(hover: hover) and (pointer: fine)').matches
    if (!fine) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    // The native cursor is only hidden once the glow has taken over, which
    // happens on the first pointer move. Adding the class up front would
    // leave a brief window with no visible cursor at all.
    let warmedUp = false
    const claimCursor = () => {
      if (warmedUp) return
      warmedUp = true
      document.body.classList.add('has-glow-cursor')
    }

    // Target (spring destination) vs current (rendered) position.
    let tx = window.innerWidth / 2
    let ty = window.innerHeight / 2
    let x = tx
    let y = ty
    let scale = 1
    let targetScale = 1
    let opacity = 0
    let targetOpacity = 0
    let raf = 0
    let inWindow = true

    const onMove = (event) => {
      tx = event.clientX
      ty = event.clientY
      if (!inWindow) {
        inWindow = true
        targetOpacity = 1
      }
      claimCursor()
      const hit = event.target instanceof Element && event.target.closest(INTERACTIVE)
      targetScale = hit ? 2.6 : 1
    }

    const onLeave = () => {
      inWindow = false
      targetOpacity = 0
    }
    const onEnter = () => {
      inWindow = true
      targetOpacity = 1
    }
    // A click should punch the glow and send it back to resting size.
    const onDown = () => {
      targetScale = 0.72
    }
    const onUp = (event) => {
      const hit = event.target instanceof Element && event.target.closest(INTERACTIVE)
      targetScale = hit ? 2.6 : 1
    }

    const tick = () => {
      // Critically-damped-ish lerp; frame-rate independent enough at 60fps+.
      x += (tx - x) * 0.18
      y += (ty - y) * 0.18
      scale += (targetScale - scale) * 0.14
      opacity += (targetOpacity - opacity) * 0.12

      glow.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`
      glow.style.opacity = opacity.toFixed(3)
      // The dot tracks with no lag so clicks feel precise.
      dot.style.transform = `translate3d(${tx}px, ${ty}px, 0) translate(-50%, -50%)`
      dot.style.opacity = targetOpacity.toFixed(3)

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    document.addEventListener('pointerenter', onEnter)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('pointerenter', onEnter)
      document.body.classList.remove('has-glow-cursor')
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-100 hidden [@media(hover:hover)_and_(pointer:fine)]:block"
    >
      <div
        ref={glowRef}
        className="gpu absolute top-0 left-0 h-40 w-40 rounded-full opacity-0 will-change-transform"
        style={{
          background:
            'radial-gradient(circle, rgba(232,180,160,0.22) 0%, rgba(30,58,95,0.14) 45%, rgba(10,15,24,0) 72%)',
          mixBlendMode: 'screen',
        }}
      />
      <div
        ref={dotRef}
        className="gpu absolute top-0 left-0 h-1.5 w-1.5 rounded-full bg-peach opacity-0 will-change-transform"
        style={{ boxShadow: '0 0 12px 2px rgba(232,180,160,0.55)' }}
      />
    </div>
  )
}
