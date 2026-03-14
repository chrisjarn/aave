import * as React from "react"

// ─── Separator ──────────────────────────────────────────────────────────────

type SeparatorOrientation = "horizontal" | "vertical"

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: SeparatorOrientation
  decorative?: boolean
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
    <div
      ref={ref}
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      className={`shrink-0 bg-border-1 ${
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px"
      } ${className ?? ""}`}
      {...props}
    />
  )
)
Separator.displayName = "Separator"

export { Separator }
export type { SeparatorProps, SeparatorOrientation }
