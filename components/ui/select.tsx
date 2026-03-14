"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { easeSwift } from "../../app/_lib/utils"

// ─── Context ────────────────────────────────────────────────────────────────

interface SelectContextValue {
  open: boolean
  value: string | undefined
  onSelect: (value: string) => void
  onOpenChange: (open: boolean) => void
  displayValue: string | undefined
}

const SelectContext = React.createContext<SelectContextValue | null>(null)

function useSelect() {
  const ctx = React.useContext(SelectContext)
  if (!ctx) throw new Error("Select components must be used within a Select")
  return ctx
}

// ─── Select root ────────────────────────────────────────────────────────────

interface SelectProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
  placeholder?: string
}

function Select({ value: controlled, defaultValue, onValueChange, children, placeholder }: SelectProps) {
  const [uncontrolled, setUncontrolled] = React.useState<string | undefined>(defaultValue)
  const [open, setOpen] = React.useState(false)
  const isControlled = controlled !== undefined
  const value = isControlled ? controlled : uncontrolled

  // Collect display labels from SelectItem children
  const [labelMap, setLabelMap] = React.useState<Record<string, string>>({})

  const onSelect = React.useCallback(
    (v: string) => {
      if (!isControlled) setUncontrolled(v)
      onValueChange?.(v)
      setOpen(false)
    },
    [isControlled, onValueChange]
  )

  const registerLabel = React.useCallback((v: string, label: string) => {
    setLabelMap((prev) => (prev[v] === label ? prev : { ...prev, [v]: label }))
  }, [])

  const displayValue = value ? labelMap[value] : undefined

  return (
    <SelectContext.Provider value={{ open, value, onSelect, onOpenChange: setOpen, displayValue }}>
      <SelectRegistryContext.Provider value={{ registerLabel }}>
        <div className="relative w-full">
          {children}
        </div>
      </SelectRegistryContext.Provider>
    </SelectContext.Provider>
  )
}

const SelectRegistryContext = React.createContext<{ registerLabel: (v: string, l: string) => void }>({
  registerLabel: () => {},
})

// ─── Trigger ────────────────────────────────────────────────────────────────

interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  placeholder?: string
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, placeholder = "Select…", children, ...props }, ref) => {
    const { open, onOpenChange, displayValue } = useSelect()

    return (
      <button
        ref={ref}
        type="button"
        role="combobox"
        aria-expanded={open}
        onClick={() => onOpenChange(!open)}
        className={`flex w-full items-center justify-between gap-2 rounded-xl bg-bg-3 px-4 h-11 text-left text-sm font-medium font-sans leading-prose tracking-normal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus hover:bg-bg-4 ${className ?? ""}`}
        {...props}
      >
        <span className={displayValue ? "text-fg-1" : "text-fg-3"}>
          {displayValue ?? placeholder}
        </span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="shrink-0 text-fg-3"
        >
          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </button>
    )
  }
)
SelectTrigger.displayName = "SelectTrigger"

// ─── Content ────────────────────────────────────────────────────────────────

const SelectContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { open, onOpenChange } = useSelect()

    React.useEffect(() => {
      function handleKeyDown(e: KeyboardEvent) {
        if (e.key === "Escape") onOpenChange(false)
      }
      if (open) document.addEventListener("keydown", handleKeyDown)
      return () => document.removeEventListener("keydown", handleKeyDown)
    }, [open, onOpenChange])

    return (
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => onOpenChange(false)} />
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: easeSwift } }}
              exit={{ opacity: 0, y: -4, scale: 0.98, transition: { duration: 0.12 } }}
              className={`absolute left-0 right-0 top-[calc(100%+4px)] z-50 rounded-xl border border-border-1 bg-bg-1 shadow-card py-1 ${className ?? ""}`}
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
SelectContent.displayName = "SelectContent"

// ─── Item ────────────────────────────────────────────────────────────────────

interface SelectItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

const SelectItem = React.forwardRef<HTMLButtonElement, SelectItemProps>(
  ({ className, value, children, ...props }, ref) => {
    const { onSelect, value: selectedValue } = useSelect()
    const { registerLabel } = React.useContext(SelectRegistryContext)
    const isSelected = selectedValue === value

    React.useEffect(() => {
      if (typeof children === "string") registerLabel(value, children)
    }, [value, children, registerLabel])

    return (
      <button
        ref={ref}
        type="button"
        role="option"
        aria-selected={isSelected}
        onClick={() => onSelect(value)}
        className={`flex w-full items-center justify-between gap-2 px-4 py-2 text-sm leading-prose tracking-normal transition-colors hover:bg-bg-4 ${isSelected ? "text-purple-1 bg-purple-4" : "text-fg-1"} ${className ?? ""}`}
        {...props}
      >
        {children}
        {isSelected && (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
            <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
    )
  }
)
SelectItem.displayName = "SelectItem"

// ─── Label ────────────────────────────────────────────────────────────────

const SelectLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`px-4 py-1.5 text-xs font-medium leading-display tracking-caption text-fg-3 ${className ?? ""}`}
      {...props}
    />
  )
)
SelectLabel.displayName = "SelectLabel"

// ─── Separator ────────────────────────────────────────────────────────────

const SelectSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`my-1 h-px bg-border-1 ${className ?? ""}`} {...props} />
  )
)
SelectSeparator.displayName = "SelectSeparator"

export { Select, SelectTrigger, SelectContent, SelectItem, SelectLabel, SelectSeparator }
export type { SelectProps, SelectTriggerProps, SelectItemProps }
