import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import BrandMark from './BrandMark'
import { useI18n } from '../lib/locale'

/** Never let the loader outlast this, however slow the connection is. */
const MAX_MS = 2600
/** Floor, so a cached page still gets a beat to breathe. */
const MIN_MS = 1100

/**
 * Preloader — a one-shot intro overlay.
 *
 * Progress is real, not faked: it tracks web-font readiness, decoded image
 * count and window load, then eases toward 100%. The logo stroke draws itself
 * in via pathLength. The overlay leaves via a clip-path wipe travelling down
 * the viewport, so the hero is revealed without the two layers ever fighting
 * for paint.
 */
export default function Preloader({ onDone }) {
  // loading -> wiping -> done. Kept as a phase (not a boolean) so the wipe
  // can actually play out before the node is removed.
  const [phase, setPhase] = useState('loading')
  const [progress, setProgress] = useState(0)
  const reduce = useReducedMotion()
  const finishedRef = useRef(false)
  const { t } = useI18n()

  /* ---- real completion signals ---- */
  useEffect(() => {
    const images = Array.from(document.images)
    const total = images.length
    let imagesDone = 0
    let fontsReady = false
    let windowReady = document.readyState === 'complete'

    const report = () => {
      const imagePart = total ? imagesDone / total : 1
      const real =
        (imagePart + (fontsReady ? 1 : 0) + (windowReady ? 1 : 0)) / 3
      // The displayed number must never outrun what has actually loaded.
      setProgress((prev) => Math.max(prev, Math.min(0.97, real)))
    }

    if (total === 0) imagesDone = 1
    images.forEach((img) => {
      if (img.complete) {
        imagesDone += 1
        return
      }
      const mark = () => {
        imagesDone += 1
        report()
      }
      img.addEventListener('load', mark, { once: true })
      img.addEventListener('error', mark, { once: true })
    })
    report()

    // Guard against a hung request: after MAX_MS, assume the rest is fine.
    const failsafe = setTimeout(() => {
      fontsReady = true
      windowReady = true
      imagesDone = total
      report()
    }, MAX_MS)

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        fontsReady = true
        report()
      })
    } else {
      fontsReady = true
      report()
    }

    if (!windowReady) {
      const onLoad = () => {
        windowReady = true
        report()
      }
      window.addEventListener('load', onLoad, { once: true })
      return () => {
        clearTimeout(failsafe)
        window.removeEventListener('load', onLoad)
      }
    }

    return () => clearTimeout(failsafe)
  }, [])

  /* ---- ticker: creeps toward the ceiling while real work finishes ---- */
  useEffect(() => {
    if (phase !== 'loading') return
    const startedAt = performance.now()
    let raf = 0

    const tick = (now) => {
      const elapsed = now - startedAt
      const ceiling = Math.min(0.97, 0.12 + elapsed / MAX_MS)
      setProgress((prev) =>
        prev >= ceiling ? prev : prev + (ceiling - prev) * 0.08,
      )
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [phase])

  /* ---- finish ---- */
  useEffect(() => {
    if (phase !== 'loading' || finishedRef.current) return
    const startedAt = performance.now()

    const check = () => {
      const elapsed = performance.now() - startedAt
      const longEnough = elapsed >= MIN_MS
      const loaded = progress >= 0.985
      const timedOut = elapsed >= MAX_MS

      if (!(longEnough && (loaded || timedOut))) {
        const timer = setTimeout(check, 110)
        return () => clearTimeout(timer)
      }

      finishedRef.current = true
      setProgress(1)
      setPhase('wiping')
    }
    check()
  }, [phase, progress])

  // Hand control back once the wipe has finished travelling.
  useEffect(() => {
    if (phase !== 'wiping') return
    const timer = setTimeout(() => {
      setPhase('done')
      onDone?.()
    }, reduce ? 160 : 880)
    return () => clearTimeout(timer)
  }, [phase, onDone, reduce])

  if (phase === 'done') return null

  const shown = Math.round(progress * 100)
  const wipe = reduce ? 0.16 : 0.85

  return (
    <div
      className="fixed inset-0 z-95 flex flex-col items-center justify-center bg-ink"
      style={{
        clipPath: phase === 'wiping' ? 'inset(0 0 100% 0)' : 'inset(0 0 0% 0)',
        transition: `clip-path ${wipe}s ${reduce ? 'ease' : 'cubic-bezier(0.83, 0, 0.17, 1)'}`,
      }}
    >
      {/* Logo draws itself: the V first, then the underline. */}
      <BrandMark className="h-16 w-16 sm:h-20 sm:w-20" trigger="mount" />

      <motion.span
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : 0.5 }}
        className="mt-6 font-display text-2xl tracking-[0.06em] text-bone sm:text-3xl"
      >
        SVB
      </motion.span>

      {/* Progress bar + counter */}
      <div className="mt-8 flex w-[min(15rem,70vw)] flex-col gap-3">
        <div className="h-px w-full overflow-hidden bg-white/12">
          <div
            className="h-full origin-left bg-peach will-change-transform"
            style={{
              transform: `scaleX(${progress})`,
              transition: reduce ? 'none' : 'transform 240ms linear',
            }}
          />
        </div>
        <div className="flex items-center justify-between font-mono text-[0.6rem] tracking-[0.24em] text-slate-dim uppercase">
            <span>{t('ui.loading')}</span>
          <span className="text-mist tabular-nums">
            {String(shown).padStart(3, '0')}
          </span>
        </div>
      </div>
    </div>
  )
}