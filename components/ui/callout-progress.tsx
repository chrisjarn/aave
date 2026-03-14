import * as React from "react"

// ─── Callout ──────────────────────────────────────────────────────────────────
// Matches the docs info/warning/tip block with left accent bar

type CalloutVariant = "info" | "warning" | "tip" | "danger"

interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CalloutVariant
  icon?: React.ReactNode
}

const variantMap: Record<CalloutVariant, { bar: string; bg: string; icon: React.ReactNode }> = {
  info: {
    bar: "bg-blue-1",
    bg: "bg-blue-3",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" className="stroke-blue-1" />
        <path d="M8 7.5V11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" className="stroke-blue-1" />
        <circle cx="8" cy="5.5" r="0.75" fill="currentColor" className="fill-blue-1" />
      </svg>
    ),
  },
  warning: {
    bar: "bg-accent-yellow",
    bg: "bg-bg-4",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 2.5L14 13.5H2L8 2.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" className="stroke-accent-yellow" />
        <path d="M8 6.5V9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" className="stroke-accent-yellow" />
        <circle cx="8" cy="11.5" r="0.6" fill="currentColor" className="fill-accent-yellow" />
      </svg>
    ),
  },
  tip: {
    bar: "bg-accent-green",
    bg: "bg-bg-4",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 2a4 4 0 0 1 2 7.46V11H6V9.46A4 4 0 0 1 8 2Z" stroke="currentColor" strokeWidth="1.3" className="stroke-accent-green" />
        <path d="M6 12h4M6.5 13.5h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" className="stroke-accent-green" />
      </svg>
    ),
  },
  danger: {
    bar: "bg-accent-red",
    bg: "bg-bg-4",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" className="stroke-accent-red" />
        <path d="M5.5 5.5L10.5 10.5M10.5 5.5L5.5 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" className="stroke-accent-red" />
      </svg>
    ),
  },
}

function Callout({ variant = "info", icon, className = "", children, ...props }: CalloutProps) {
  const { bar, bg, icon: defaultIcon } = variantMap[variant]
  return (
    <div
      className={`relative flex gap-3 rounded-xl ${bg} px-4 py-3.5 overflow-hidden ${className}`}
      role="note"
      {...props}
    >
      <div className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl ${bar}`} />
      <span className="shrink-0 mt-[1px]">{icon ?? defaultIcon}</span>
      <div className="text-sm leading-prose tracking-normal text-fg-2">{children}</div>
    </div>
  )
}

// ─── ProgressBar ─────────────────────────────────────────────────────────────
// Aave-style health-factor / utilisation bar

type ProgressBarVariant = "default" | "health" | "utilisation"

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number        // 0–100
  max?: number
  variant?: ProgressBarVariant
  label?: string
  showValue?: boolean
}

const barColor: Record<ProgressBarVariant, (pct: number) => string> = {
  default: () => "bg-blue-1",
  health: (pct) =>
    pct > 66 ? "bg-accent-green" : pct > 33 ? "bg-accent-yellow" : "bg-accent-red",
  utilisation: (pct) =>
    pct < 80 ? "bg-blue-1" : pct < 95 ? "bg-accent-yellow" : "bg-accent-red",
}

function ProgressBar({
  value,
  max = 100,
  variant = "default",
  label,
  showValue = false,
  className = "",
  ...props
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  const color = barColor[variant](pct)

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`} {...props}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && (
            <span className="text-xs font-medium leading-tight tracking-normal text-fg-2">
              {label}
            </span>
          )}
          {showValue && (
            <span className="text-xs font-semibold leading-tight tracking-tight text-fg-1 tabular-nums">
              {value.toFixed(2)}
            </span>
          )}
        </div>
      )}
      <div className="h-2 w-full rounded-full bg-bg-3 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${color}`}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  )
}

export { Callout, ProgressBar }
export type { CalloutProps, CalloutVariant, ProgressBarProps, ProgressBarVariant }
