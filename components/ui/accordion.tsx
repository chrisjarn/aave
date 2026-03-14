"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { easeSwift } from "../../app/_lib/utils"

interface AccordionContextValue {
  openItem: string | null
  onToggle: (value: string) => void
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null)

function useAccordion() {
  const context = React.useContext(AccordionContext)
  if (!context) throw new Error("Accordion components must be used within an Accordion")
  return context
}

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single"
  defaultValue?: string
  value?: string
  onValueChange?: (value: string | null) => void
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, defaultValue, value, onValueChange, children, ...props }, ref) => {
    const [openItem, setOpenItem] = React.useState<string | null>(value ?? defaultValue ?? null)

    React.useEffect(() => {
      if (value !== undefined) setOpenItem(value)
    }, [value])

    const onToggle = React.useCallback(
      (itemValue: string) => {
        const next = openItem === itemValue ? null : itemValue
        setOpenItem(next)
        onValueChange?.(next)
      },
      [openItem, onValueChange]
    )

    return (
      <AccordionContext.Provider value={{ openItem, onToggle }}>
        <div ref={ref} className={`flex flex-col ${className ?? ""}`} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    )
  }
)
Accordion.displayName = "Accordion"

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, children, ...props }, ref) => {
    const { openItem, onToggle } = useAccordion()
    const isOpen = openItem === value

    return (
      <motion.div
        ref={ref}
        variants={{ inactive: {}, active: {} }}
        initial="inactive"
        animate={isOpen ? "active" : "inactive"}
        className={`rounded-xl pb-1.5 bg-bg-5 mb-2 last:mb-0 ${className ?? ""}`}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(
              child as React.ReactElement<{ value?: string; isOpen?: boolean }>,
              { value, isOpen }
            )
          }
          return child
        })}
      </motion.div>
    )
  }
)
AccordionItem.displayName = "AccordionItem"

interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value?: string
  isOpen?: boolean
}

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, value, isOpen, children, ...props }, ref) => {
    const { onToggle } = useAccordion()

    return (
      <button
        ref={ref}
        type="button"
        onClick={() => value && onToggle(value)}
        className={`flex justify-between items-center gap-2 relative p-[10px_8px_4px_24px] w-full bg-none cursor-pointer appearance-none text-left ${className ?? ""}`}
        {...props}
      >
        <span className="font-sans md:text-lg font-medium leading-heading tracking-snug text-fg-1">
          {children}
        </span>
        <AccordionIcon isOpen={isOpen} />
      </button>
    )
  }
)
AccordionTrigger.displayName = "AccordionTrigger"

function AccordionIcon({ isOpen }: { isOpen?: boolean }) {
  return (
    <svg
      width="52"
      height="52"
      viewBox="0 0 52 52"
      className="stroke-purple-1 flex-shrink-0"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        variants={{ inactive: { rotateZ: 0 }, active: { rotateZ: 180 } }}
        transition={{ ease: "linear", duration: 0.2 }}
        d="M19 25.5H26L33 25.5"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ transformOrigin: "26px 25.5px 0px" }}
      />
      <motion.path
        variants={{ inactive: { rotateZ: 0, scale: 1 }, active: { rotateZ: 80, scale: 0 } }}
        transition={{ ease: "linear", duration: 0.2 }}
        d="M26 18.5L26 25.5L26 32.5"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ transformOrigin: "26px 25.5px 0px" }}
      />
    </svg>
  )
}

interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  isOpen?: boolean
}

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, isOpen, children, ...props }, ref) => (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          ref={ref}
          initial={{ height: 0 }}
          animate={{ height: "auto", transition: { ease: easeSwift, duration: 0.35 } }}
          exit={{ height: 0 }}
          className="overflow-hidden"
          {...props}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.15, duration: 0.2 } }}
            exit={{ opacity: 0 }}
            className={`pr-2 pb-4 pl-6 w-[calc(100%-60px)] leading-prose tracking-normal text-fg-2 ${className ?? ""}`}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
)
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
export type { AccordionProps, AccordionItemProps, AccordionTriggerProps, AccordionContentProps }
