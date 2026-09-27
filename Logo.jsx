/**
 * LogoMark — the SVB monogram as pure geometry (no font dependency),
 * so it stays crisp at any size and never flashes unstyled.
 */
export function LogoMark({ className = 'h-9 w-9' }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className={className}
      focusable="false"
    >
      <defs>
        <linearGradient id="svb-mark" x1="0" y1="0" x2="40" y2="40">
          <stop offset="0%" stopColor="#F4CDBB" />
          <stop offset="55%" stopColor="#E8B4A0" />
          <stop offset="100%" stopColor="#1E3A5F" />
        </linearGradient>
      </defs>

      <rect
        x="0.75"
        y="0.75"
        width="38.5"
        height="38.5"
        rx="11"
        stroke="url(#svb-mark)"
        strokeWidth="1.5"
      />

      {/* Stylised V: two strokes converging on a point. */}
      <path
        d="M11 13.5 L20 27.5 L29 13.5"
        stroke="url(#svb-mark)"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Accent tick under the V, reading as the "S" base stroke. */}
      <path
        d="M14.5 32 H25.5"
        stroke="#E8B4A0"
        strokeWidth="3.2"
        strokeLinecap="round"
        opacity="0.65"
      />
    </svg>
  )
}

/**
 * Logo — mark plus wordmark. `compact` drops the wordmark for tight spots
 * such as the floating header once the page is scrolled.
 */
export default function Logo({ compact = false, className = '' }) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <LogoMark />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-lg tracking-[0.02em] text-bone">SVB</span>
          <span className="mt-1 font-mono text-[0.55rem] tracking-[0.24em] text-slate-dim uppercase">
            Sebastian Valecillos
          </span>
        </span>
      )}
    </span>
  )
}
