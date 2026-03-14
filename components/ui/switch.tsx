"use client"

import * as React from "react"
import { motion } from "motion/react"

// ─── Switch ──────────────────────────────────────────────────────────────────

type SwitchSize = "sm" | "md"

interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  size?: SwitchSize
  label?: string
}

const trackSize = {
  sm: "w-8 h-[18px]",
  md: "w-11 h-6",
}

const thumbSize = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
}

const thumbTranslate = {
  sm: 14,
  md: 20,
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, checked: controlled, defaultChecked = false, onCheckedChange, size = "md", label, id, disabled, ...props }, ref) => {
    const [uncontrolled, setUncontrolled] = React.useState(defaultChecked)
    const isControlled = controlled !== undefined
    const checked = isControlled ? controlled : uncontrolled
    const switchId = id ?? React.useId()

    const toggle = React.useCallback(() => {
      if (disabled) return
      const next = !checked
      if (!isControlled) setUncontrolled(next)
      onCheckedChange?.(next)
    }, [checked, isControlled, onCheckedChange, disabled])

    return (
      <div className="inline-flex items-center gap-2.5">
        <button
          ref={ref}
          type="button"
          role="switch"
          id={switchId}
          aria-checked={checked}
          disabled={disabled}
          onClick={toggle}
          className={`relative inline-flex shrink-0 items-center rounded-pill transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg-1 disabled:cursor-not-allowed disabled:opacity-50 ${trackSize[size]} ${checked ? "bg-purple-1" : "bg-bg-4 border border-border-2"} ${className ?? ""}`}
          {...props}
        >
          <motion.span
            animate={{ x: checked ? thumbTranslate[size] : 2 }}
            transition={{ type: "spring", stiffness: 500, damping: 36 }}
            className={`block rounded-full bg-bg-1 shadow-btn ${thumbSize[size]}`}
          />
        </button>
        {label && (
          <label htmlFor={switchId} className="cursor-pointer text-sm font-medium leading-tight tracking-normal text-fg-1 select-none">
            {label}
          </label>
        )}
      </div>
    )
  }
)
Switch.displayName = "Switch"

export { Switch }
export type { SwitchProps, SwitchSize }
