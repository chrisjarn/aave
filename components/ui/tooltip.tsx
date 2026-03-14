"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { easeSwift } from "../../app/_lib/utils"

// ─── Context ─────────────────────────────────────────────────────────────────

interface TooltipContextValue {
  open: boolean
  setOpen: (v: boolean) => void
}

const TooltipContext = React.createContext<TooltipContextValue | null>(null)

// ─── Provider (pass-through for API compatibility) ────────────────────────────

function TooltipProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

// ─── Tooltip root ────────────────────────────────────────────────────────────

interface TooltipProps {
  children: React.ReactNode
  defaultOpen?: boolean
}

function Tooltip({ children, defaultOpen = false }: TooltipProps) {
  const [open, setOpen] = React.useState(defaultOpen)
  return (
    <TooltipContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-flex">{children}</div>
    </TooltipContext.Provider>
  )
}

// ─── TooltipTrigger ──────────────────────────────────────────────────────────
// Wraps any child — no extra button wrapper if child is already interactive

const TooltipTrigger = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, ...props }, ref) => {
    const ctx = React.useContext(TooltipContext)
    if (!ctx) throw new Error("TooltipTrigger must be inside Tooltip")
    const { setOpen } = ctx
    return (
      <div
        ref={ref}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="inline-flex"
        {...props}
      >
        {children}
      </div>
    )
  }
)
TooltipTrigger.displayName = "TooltipTrigger"

// ─── TooltipContent ──────────────────────────────────────────────────────────
// Matches the homepage icon tooltip:
//   • small dark pill (bg-fg-1, text-bg-1)
//   • 11–12px text, tight tracking
//   • appears above trigger, centered
//   • tiny y-slide in + fade, instant on exit

type TooltipSide = "top" | "bottom" | "left" | "right"

interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: TooltipSide
}

const positionMap: Record<TooltipSide, string> = {
  top:    "bottom-[calc(100%+7px)] left-1/2 -translate-x-1/2",
  bottom: "top-[calc(100%+7px)] left-1/2 -translate-x-1/2",
  left:   "right-[calc(100%+7px)] top-1/2 -translate-y-1/2",
  right:  "left-[calc(100%+7px)] top-1/2 -translate-y-1/2",
}

const entryMotion: Record<TooltipSide, object> = {
  top:    { y: 4 },
  bottom: { y: -4 },
  left:   { x: 4 },
  right:  { x: -4 },
}

const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ className = "", side = "top", children, ...props }, ref) => {
    const ctx = React.useContext(TooltipContext)
    if (!ctx) throw new Error("TooltipContent must be inside Tooltip")
    const { open } = ctx

    return (
      <AnimatePresence>
        {open && (
          <motion.div
            ref={ref}
            role="tooltip"
            initial={{ opacity: 0, ...entryMotion[side] }}
            animate={{
              opacity: 1,
              y: 0,
              x: 0,
              transition: { duration: 0.14, ease: easeSwift },
            }}
            exit={{ opacity: 0, transition: { duration: 0.08 } }}
            className={`pointer-events-none absolute z-50 whitespace-nowrap rounded-pill bg-fg-1 px-3 py-[5px] text-xs font-medium leading-display tracking-caption text-bg-1 ${positionMap[side]} ${className}`}
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
