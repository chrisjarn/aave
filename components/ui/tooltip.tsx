"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { easeSwift } from "../../app/_lib/utils"

// ─── Context ─────────────────────────────────────────────────────────────────

interface TooltipContextValue {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const TooltipContext = React.createContext<TooltipContextValue | null>(null)

// ─── TooltipProvider ─────────────────────────────────────────────────────────

function TooltipProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

// ─── Tooltip root ────────────────────────────────────────────────────────────

interface TooltipProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  delayDuration?: number
}

function Tooltip({ open: controlled, defaultOpen = false, onOpenChange, children, delayDuration = 300 }: TooltipProps) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultOpen)
  const isControlled = controlled !== undefined
  const open = isControlled ? controlled : uncontrolled
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (next) {
        timeoutRef.current = setTimeout(() => {
          if (!isControlled) setUncontrolled(true)
          onOpenChange?.(true)
        }, delayDuration)
      } else {
        if (!isControlled) setUncontrolled(false)
        onOpenChange?.(false)
      }
    },
    [isControlled, onOpenChange, delayDuration]
  )

  return (
    <TooltipContext.Provider value={{ open, onOpenChange: handleOpenChange }}>
      <div className="relative inline-flex">{children}</div>
    </TooltipContext.Provider>
  )
}

// ─── TooltipTrigger ──────────────────────────────────────────────────────────

const TooltipTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ children, onMouseEnter, onMouseLeave, onFocus, onBlur, ...props }, ref) => {
    const ctx = React.useContext(TooltipContext)
    if (!ctx) throw new Error("TooltipTrigger must be inside a Tooltip")
    const { onOpenChange } = ctx

    return (
      <button
        ref={ref}
        type="button"
        onMouseEnter={(e) => { onOpenChange(true); onMouseEnter?.(e) }}
        onMouseLeave={(e) => { onOpenChange(false); onMouseLeave?.(e) }}
        onFocus={(e) => { onOpenChange(true); onFocus?.(e) }}
        onBlur={(e) => { onOpenChange(false); onBlur?.(e) }}
        {...props}
      >
        {children}
      </button>
    )
  }
)
TooltipTrigger.displayName = "TooltipTrigger"

// ─── TooltipContent ──────────────────────────────────────────────────────────

type TooltipSide = "top" | "bottom" | "left" | "right"

interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: TooltipSide
  sideOffset?: number
}

const sideStyles: Record<TooltipSide, string> = {
  top: "bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2",
  bottom: "top-[calc(100%+8px)] left-1/2 -translate-x-1/2",
  left: "right-[calc(100%+8px)] top-1/2 -translate-y-1/2",
  right: "left-[calc(100%+8px)] top-1/2 -translate-y-1/2",
}

const sideMotion: Record<TooltipSide, { initial: object }> = {
  top: { initial: { y: 4 } },
  bottom: { initial: { y: -4 } },
  left: { initial: { x: 4 } },
  right: { initial: { x: -4 } },
}

const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ className, side = "top", children, ...props }, ref) => {
    const ctx = React.useContext(TooltipContext)
    if (!ctx) throw new Error("TooltipContent must be inside a Tooltip")
    const { open } = ctx

    return (
      <AnimatePresence>
        {open && (
          <motion.div
            ref={ref}
            role="tooltip"
            initial={{ opacity: 0, ...sideMotion[side].initial }}
            animate={{ opacity: 1, y: 0, x: 0, transition: { duration: 0.15, ease: easeSwift } }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            className={`absolute z-50 whitespace-nowrap rounded-lg bg-fg-1 px-3 py-1.5 text-xs font-medium leading-tight tracking-normal text-bg-1 shadow-card pointer-events-none ${sideStyles[side]} ${className ?? ""}`}
            {...props}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    )
  }
)
TooltipContent.displayName = "TooltipContent"

export { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent }
export type { TooltipProps, TooltipContentProps, TooltipSide }
