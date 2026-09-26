import { useCallback, useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'

/**
 * TiltedCard — 3D tilt that tracks the pointer, with a specular glare
 * sweeping across the surface.
 *
 * The tilt/glare math writes `transform` and CSS custom properties straight
 * to the DOM inside a single rAF frame, so moving the mouse over a card never
 * triggers a React re-render. On touch devices and under reduced-motion the
 * card renders completely flat.
 */
export default function TiltedCard({
  children,
  maxTilt = 8,
  glare = true,
  className = '',
  ...rest
}) {
  const wrapRef = useRef(null)
  const innerRef = useRef(null)
  const rafRef = useRef(0)
  const target = useRef({ rx: 0, ry: 0, gx: 50, gy: 50, s: 1 })
  const current = useRef({ rx: 0, ry: 0, gx: 50, gy: 50, s: 1 })
  const reduce = useReducedMotion()

  const tick = useCallback(function loop() {
    const inner = innerRef.current
    if (!inner) return
    const t = target.current
    const c = current.current

    // Frame-rate-independent lerp so the settle feels identical everywhere.
    c.rx += (t.rx - c.rx) * 0.12
    c.ry += (t.ry - c.ry) * 0.12
    c.gx += (t.gx - c.gx) * 0.16
    c.gy += (t.gy - c.gy) * 0.16
    c.s += (t.s - c.s) * 0.12

    inner.style.transform =
      `perspective(1100px) rotateX(${c.rx.toFixed(3)}deg) rotateY(${c.ry.toFixed(3)}deg) scale(${c.s.toFixed(4)})`
    inner.style.setProperty('--gx', `${c.gx.toFixed(2)}%`)
    inner.style.setProperty('--gy', `${c.gy.toFixed(2)}%`)

    const settled =
      Math.abs(t.rx - c.rx) < 0.01 &&
      Math.abs(t.ry - c.ry) < 0.01 &&
      Math.abs(t.s - c.s) < 0.001

    // Park the loop once the card has come to rest; `schedule` restarts it.
    if (settled) {
      rafRef.current = 0
      return
    }
    rafRef.current = requestAnimationFrame(loop)
  }, [])

  const schedule = useCallback(() => {
    if (!rafRef.current) rafRef.current = requestAnimationFrame(tick)
  }, [tick])

  const onPointerMove = useCallback(
    (event) => {
      if (reduce) return
      if (event.pointerType === 'touch') return
      const el = wrapRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const px = (event.clientX - rect.left) / rect.width
      const py = (event.clientY - rect.top) / rect.height

      target.current.ry = (px - 0.5) * maxTilt * 2
      target.current.rx = -(py - 0.5) * maxTilt * 2
      target.current.gx = px * 100
      target.current.gy = py * 100
      target.current.s = 1.015
      schedule()
    },
    [maxTilt, reduce, schedule],
  )

  const onPointerEnter = useCallback(() => {
    if (reduce) return
    target.current.s = 1.015
    schedule()
  }, [reduce, schedule])

  const onPointerLeave = useCallback(() => {
    target.current.rx = 0
    target.current.ry = 0
    target.current.gx = 50
    target.current.gy = 50
    target.current.s = 1
    schedule()
  }, [schedule])

  return (
    <div
      ref={wrapRef}
      onPointerMove={onPointerMove}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      className={`[perspective:1100px] ${className}`}
      {...rest}
    >
      <motion.div
        ref={innerRef}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="gpu relative h-full w-full will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}

        {glare && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                'radial-gradient(420px circle at var(--gx, 50%) var(--gy, 50%), rgba(255,255,255,0.14), transparent 62%)',
              mixBlendMode: 'overlay',
            }}
          />
        )}
      </motion.div>
    </div>
  )
}
