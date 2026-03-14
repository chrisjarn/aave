"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { easeSwift } from "../../app/_lib/utils"

// ─── Context ─────────────────────────────────────────────────────────────────

interface DropdownMenuContextValue {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const DropdownMenuContext = React.createContext<DropdownMenuContextValue | null>(null)

function useDropdownMenu() {
  const ctx = React.useContext(DropdownMenuContext)
  if (!ctx) throw new Error("DropdownMenu components must be used within a DropdownMenu")
  return ctx
}

// ─── Root ─────────────────────────────────────────────────────────────────────

interface DropdownMenuProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

function DropdownMenu({ open: controlled, defaultOpen = false, onOpenChange, children }: DropdownMenuProps) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultOpen)
  const isControlled = controlled !== undefined
  const open = isControlled ? controlled : uncontrolled

  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolled(next)
      onOpenChange?.(next)
    },
    [isControlled, onOpenChange]
  )

  return (
    <DropdownMenuContext.Provider value={{ open, onOpenChange: handleOpenChange }}>
      <div className="relative inline-block">{children}</div>
    </DropdownMenuContext.Provider>
  )
}

// ─── Trigger ─────────────────────────────────────────────────────────────────

const DropdownMenuTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ children, onClick, ...props }, ref) => {
    const { onOpenChange, open } = useDropdownMenu()
    return (
      <button
        ref={ref}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={(e) => { onOpenChange(!open); onClick?.(e) }}
        {...props}
      >
        {children}
      </button>
    )
  }
)
DropdownMenuTrigger.displayName = "DropdownMenuTrigger"

// ─── Content ─────────────────────────────────────────────────────────────────

type DropdownMenuAlign = "start" | "center" | "end"
type DropdownMenuSide = "bottom" | "top"

interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: DropdownMenuAlign
  side?: DropdownMenuSide
  sideOffset?: number
}

const alignStyles: Record<DropdownMenuAlign, string> = {
  start: "left-0",
  center: "left-1/2 -translate-x-1/2",
  end: "right-0",
}

const DropdownMenuContent = React.forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ className, align = "start", side = "bottom", children, ...props }, ref) => {
    const { open, onOpenChange } = useDropdownMenu()
    const positionStyles = side === "bottom"
      ? "top-[calc(100%+4px)]"
      : "bottom-[calc(100%+4px)]"

    React.useEffect(() => {
      function onKey(e: KeyboardEvent) { if (e.key === "Escape") onOpenChange(false) }
      if (open) document.addEventListener("keydown", onKey)
      return () => document.removeEventListener("keydown", onKey)
    }, [open, onOpenChange])

    return (
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => onOpenChange(false)} />
            <motion.div
              ref={ref}
              role="menu"
              initial={{ opacity: 0, y: side === "bottom" ? -6 : 6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: easeSwift } }}
              exit={{ opacity: 0, y: side === "bottom" ? -4 : 4, scale: 0.97, transition: { duration: 0.12 } }}
              className={`absolute z-50 min-w-[10rem] rounded-xl border border-border-1 bg-bg-1 shadow-card py-1 ${positionStyles} ${alignStyles[align]} ${className ?? ""}`}
              {...props}
            >
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    )
  }
)
DropdownMenuContent.displayName = "DropdownMenuContent"

// ─── Item ─────────────────────────────────────────────────────────────────────

interface DropdownMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  inset?: boolean
  destructive?: boolean
}

const DropdownMenuItem = React.forwardRef<HTMLButtonElement, DropdownMenuItemProps>(
  ({ className, inset, destructive, children, onClick, ...props }, ref) => {
    const { onOpenChange } = useDropdownMenu()
    return (
      <button
        ref={ref}
        type="button"
        role="menuitem"
        onClick={(e) => { onOpenChange(false); onClick?.(e) }}
        className={`flex w-full items-center gap-2 px-4 py-2 text-sm leading-prose tracking-normal transition-colors hover:bg-bg-4 focus-visible:bg-bg-4 outline-none ${
          destructive ? "text-accent-red hover:bg-accent-red/5" : "text-fg-1"
        } ${inset ? "pl-8" : ""} ${className ?? ""}`}
        {...props}
      >
        {children}
      </button>
    )
  }
)
DropdownMenuItem.displayName = "DropdownMenuItem"

// ─── Label ───────────────────────────────────────────────────────────────────

const DropdownMenuLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`px-4 py-1.5 text-xs font-medium leading-display tracking-caption text-fg-3 ${className ?? ""}`}
      {...props}
    />
  )
)
DropdownMenuLabel.displayName = "DropdownMenuLabel"

// ─── Separator ───────────────────────────────────────────────────────────────

const DropdownMenuSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`my-1 h-px bg-border-1 ${className ?? ""}`} {...props} />
  )
)
DropdownMenuSeparator.displayName = "DropdownMenuSeparator"

// ─── Shortcut ────────────────────────────────────────────────────────────────

function DropdownMenuShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={`ml-auto text-xs leading-none tracking-caption text-fg-4 ${className ?? ""}`}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
}
export type { DropdownMenuProps, DropdownMenuContentProps, DropdownMenuItemProps }
