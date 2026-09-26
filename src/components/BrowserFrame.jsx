/**
 * BrowserFrame — dark chrome wrapped around a real project screenshot.
 *
 * The frame is deliberately unbranded (no traffic lights) so it reads as a
 * neutral presentation surface rather than a fake macOS window; the URL pill
 * carries the project identity instead.
 */
export default function BrowserFrame({ url, logo, logoType, children, className = '' }) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-ink-deep ring-1 ring-white/10 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] ${className}`}
    >
      {/* Chrome bar */}
      <div className="flex h-11 items-center gap-3 border-b border-white/8 bg-white/[0.02] px-4">
        <div className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-white/12" />
          <span className="h-2 w-2 rounded-full bg-white/12" />
          <span className="h-2 w-2 rounded-full bg-white/12" />
        </div>

        {/* URL pill */}
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-white/[0.04] px-3 py-1.5 ring-1 ring-white/8">
          {logo && (
            <img
              src={logo}
              alt=""
              aria-hidden="true"
              className="h-3.5 w-3.5 shrink-0 object-contain"
              style={logoType === 'webp' ? { mixBlendMode: 'screen' } : undefined}
            />
          )}
          <span className="truncate font-mono text-[0.6rem] tracking-wide text-slate">
            {url}
          </span>
        </div>
      </div>

      {/* Viewport */}
      <div className="relative aspect-[16/10] overflow-hidden bg-navy-deep">
        {children}
        {/* Faint top-edge sheen sells the "glass" surface. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.07) 0%, transparent 22%, transparent 78%, rgba(0,0,0,0.28) 100%)',
          }}
        />
      </div>
    </div>
  )
}
