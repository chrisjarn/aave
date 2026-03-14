import * as React from "react"

type BadgeVariant = "default" | "purple" | "blue" | "green" | "outline"

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-[var(--bg-4)] text-[var(--fg-1)] hover:bg-[#f0f0ef]",
  purple: "bg-[var(--purple-3)] text-[var(--purple-1)]",
  blue: "bg-[var(--blue-3)] text-[var(--blue-1)]",
  green: "bg-[rgba(40,211,88,0.12)] text-[var(--gho-1)]",
  outline: "border border-[var(--border-2)] bg-transparent text-[var(--fg-1)]",
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium leading-[105%] tracking-[-0.00563rem] transition-colors ${variantStyles[variant]} ${className ?? ""}`}
        {...props}
      />
    )
  }
)
Badge.displayName = "Badge"

export { Badge }
export type { BadgeProps, BadgeVariant }
