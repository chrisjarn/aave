import * as React from "react"

type BadgeVariant = "default" | "purple" | "blue" | "green" | "outline"

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant
}

const variantStyles: Record<BadgeVariant, string> = {
  default:  "bg-bg-4 text-fg-1 hover:bg-bg-3",
  purple:   "bg-purple-3 text-purple-1",
  blue:     "bg-blue-3 text-blue-1",
  green:    "bg-gho-1/[.12] text-gho-1",
  outline:  "border border-border-2 bg-transparent text-fg-1",
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`inline-flex items-center rounded-pill px-3 py-1 text-xs font-medium leading-display tracking-caption transition-colors ${variantStyles[variant]} ${className ?? ""}`}
        {...props}
      />
    )
  }
)
Badge.displayName = "Badge"

export { Badge }
export type { BadgeProps, BadgeVariant }
