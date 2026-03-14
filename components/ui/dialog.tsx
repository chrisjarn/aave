"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { easeSwift } from "../../app/_lib/utils"

interface DialogContextValue {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const DialogContext = React.createContext<DialogContextValue | null>(null)

function useDialog() {
  const context = React.useContext(DialogContext)
  if (!context) {
    throw new Error("Dialog components must be used within a Dialog")
  }
  return context
}

interface DialogProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

function Dialog({ open: controlledOpen, defaultOpen = false, onOpenChange, children }: DialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen

  const handleOpenChange = React.useCallback(
    (newOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(newOpen)
      }
      onOpenChange?.(newOpen)
    },
    [isControlled, onOpenChange]
  )

  return (
    <DialogContext.Provider value={{ open, onOpenChange: handleOpenChange }}>
      {children}
    </DialogContext.Provider>
  )
}

interface DialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ children, onClick, ...props }, ref) => {
    const { onOpenChange } = useDialog()

    return (
      <button
        ref={ref}
        type="button"
        onClick={(e) => {
          onOpenChange(true)
          onClick?.(e)
        }}
        {...props}
      >
        {children}
      </button>
    )
  }
)
DialogTrigger.displayName = "DialogTrigger"

interface DialogPortalProps {
  children: React.ReactNode
}

function DialogPortal({ children }: DialogPortalProps) {
  const { open } = useDialog()

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {children}
        </div>
      )}
    </AnimatePresence>
  )
}

const DialogOverlay = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { onOpenChange } = useDialog()

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.2 } }}
        exit={{ opacity: 0, transition: { duration: 0.15 } }}
        onClick={() => onOpenChange(false)}
        className={`fixed inset-0 z-50 bg-[var(--fg-1)]/20 backdrop-blur-sm ${className ?? ""}`}
        {...props}
      />
    )
  }
)
DialogOverlay.displayName = "DialogOverlay"

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  showClose?: boolean
}

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, showClose = true, children, ...props }, ref) => {
    const { onOpenChange } = useDialog()

    return (
      <DialogPortal>
        <DialogOverlay />
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { duration: 0.3, ease: easeSwift },
          }}
          exit={{
            opacity: 0,
            scale: 0.95,
            transition: { duration: 0.15 },
          }}
          className={`relative z-50 w-full max-w-lg mx-4 bg-[var(--bg-1)] rounded-2xl border border-[var(--border-1)] shadow-[0_8px_40px_rgba(0,0,0,0.08)] p-6 ${className ?? ""}`}
          {...props}
        >
          {children}
          {showClose && (
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-[var(--fg-3)] transition-colors hover:bg-[rgba(34,29,29,0.03)] hover:text-[var(--fg-1)]"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 5L5 15M5 5L15 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="sr-only">Close</span>
            </button>
          )}
        </motion.div>
      </DialogPortal>
    )
  }
)
DialogContent.displayName = "DialogContent"

const DialogHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`flex flex-col gap-2 mb-4 ${className ?? ""}`} {...props} />
  )
)
DialogHeader.displayName = "DialogHeader"

const DialogTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={`font-brand text-2xl font-semibold leading-[135%] tracking-[-0.48px] text-[var(--fg-1)] ${className ?? ""}`}
      {...props}
    />
  )
)
DialogTitle.displayName = "DialogTitle"

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={`leading-[150%] tracking-[-0.18px] text-[var(--fg-2)] ${className ?? ""}`}
    {...props}
  />
))
DialogDescription.displayName = "DialogDescription"

const DialogFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`flex flex-col-reverse sm:flex-row sm:justify-end gap-2 mt-6 ${className ?? ""}`}
      {...props}
    />
  )
)
DialogFooter.displayName = "DialogFooter"

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
}
export type { DialogProps, DialogTriggerProps, DialogContentProps }
