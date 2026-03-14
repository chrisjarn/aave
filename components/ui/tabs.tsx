"use client"

import * as React from "react"
import { motion } from "motion/react"
import { easeSwift } from "../../app/_lib/utils"

// ─── Context ────────────────────────────────────────────────────────────────

interface TabsContextValue {
  activeTab: string
  onTabChange: (value: string) => void
}

const TabsContext = React.createContext<TabsContextValue | null>(null)

function useTabs() {
  const ctx = React.useContext(TabsContext)
  if (!ctx) throw new Error("Tabs components must be used within a Tabs")
  return ctx
}

// ─── Tabs root ───────────────────────────────────────────────────────────────

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, defaultValue = "", value: controlled, onValueChange, children, ...props }, ref) => {
    const [uncontrolled, setUncontrolled] = React.useState(defaultValue)
    const isControlled = controlled !== undefined
    const activeTab = isControlled ? controlled : uncontrolled

    const onTabChange = React.useCallback(
      (v: string) => {
        if (!isControlled) setUncontrolled(v)
        onValueChange?.(v)
      },
      [isControlled, onValueChange]
    )

    return (
      <TabsContext.Provider value={{ activeTab, onTabChange }}>
        <div ref={ref} className={`flex flex-col gap-4 ${className ?? ""}`} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    )
  }
)
Tabs.displayName = "Tabs"

// ─── TabsList ────────────────────────────────────────────────────────────────

type TabsListVariant = "default" | "pill" | "sliding"

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: TabsListVariant
}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, variant = "default", children, style, ...props }, ref) => {
    const { activeTab } = useTabs()

    const listStyles = {
      default: "flex gap-1 border-b border-border-1 pb-0",
      pill: "inline-flex gap-1 rounded-pill bg-bg-4 p-1",
      sliding: "grid gap-12 w-full",
    }

    // For sliding: count children to build grid + animate column sizes
    const childArray = React.Children.toArray(children)
    const childCount = childArray.length

    // Derive which index is active to animate column widths
    let activeIdx = 0
    React.Children.forEach(children, (child, i) => {
      if (React.isValidElement(child) && (child.props as TabsTriggerProps).value === activeTab) {
        activeIdx = i
      }
    })

    const buildCols = (count: number, active: number) =>
      Array.from({ length: count }, (_, i) => (i === active ? "6fr" : "4fr")).join(" ")

    const slidingStyle =
      variant === "sliding"
        ? { gridTemplateColumns: buildCols(childCount, activeIdx) }
        : undefined

    return (
      <motion.div
        ref={ref as React.Ref<HTMLDivElement>}
        role="tablist"
        animate={slidingStyle ?? undefined}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={variant === "sliding" ? slidingStyle : style}
        className={`${listStyles[variant]} ${className ?? ""}`}
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<{ listVariant?: TabsListVariant }>, {
              listVariant: variant,
            })
          }
          return child
        })}
      </motion.div>
    )
  }
)
TabsList.displayName = "TabsList"

// ─── TabsTrigger ─────────────────────────────────────────────────────────────

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  listVariant?: TabsListVariant
  description?: string
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, listVariant = "default", description, children, ...props }, ref) => {
    const { activeTab, onTabChange } = useTabs()
    const isActive = activeTab === value

    // Sliding variant — matches homepage Intro Supply/Borrow style
    if (listVariant === "sliding") {
      return (
        <button
          ref={ref}
          type="button"
          role="tab"
          aria-selected={isActive}
          onClick={() => onTabChange(value)}
          className={`flex flex-col gap-4 h-fit cursor-pointer text-start transition-colors duration-200 ease-in-out ${
            isActive ? "text-blue-1" : "text-fg-3"
          } ${className ?? ""}`}
          {...props}
        >
          <span
            className={`block rounded-sm w-full h-[3px] transition-colors duration-200 ease-in-out ${
              isActive ? "bg-current" : "bg-border-1"
            }`}
          />
          <span className="text-2xl font-semibold leading-heading tracking-tight text-inherit">
            {children}
          </span>
          {description && (
            <motion.span
              initial={false}
              animate={
                isActive
                  ? { opacity: 1, y: 0, display: "block", transition: { delay: 0.35, duration: 0.4, ease: easeSwift } }
                  : { opacity: 0, y: -6, display: "none", transition: { duration: 0 } }
              }
              className="leading-prose tracking-normal text-fg-2"
            >
              {description}
            </motion.span>
          )}
        </button>
      )
    }

    const defaultStyles = `relative pb-3 pt-1 px-1 text-sm font-medium leading-tight tracking-normal transition-colors ${
      isActive ? "text-fg-1" : "text-fg-3 hover:text-fg-2"
    }`
    const pillStyles = `relative rounded-pill px-4 py-1.5 text-sm font-medium leading-tight tracking-normal transition-all ${
      isActive ? "bg-bg-1 text-fg-1 shadow-btn" : "bg-transparent text-fg-3 hover:text-fg-2"
    }`

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        onClick={() => onTabChange(value)}
        className={`${listVariant === "pill" ? pillStyles : defaultStyles} ${className ?? ""}`}
        {...props}
      >
        {children}
        {listVariant === "default" && isActive && (
          <motion.div
            layoutId="tabs-indicator"
            className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-fg-1 rounded-full"
            transition={{ ease: easeSwift, duration: 0.3 }}
          />
        )}
      </button>
    )
  }
)
TabsTrigger.displayName = "TabsTrigger"

// ─── TabsContent ─────────────────────────────────────────────────────────────

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, children, ...props }, ref) => {
    const { activeTab } = useTabs()
    if (activeTab !== value) return null

    return (
      <motion.div
        ref={ref}
        key={value}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.25, ease: easeSwift } }}
        role="tabpanel"
        className={`${className ?? ""}`}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }
export type { TabsProps, TabsListProps, TabsTriggerProps, TabsContentProps }
