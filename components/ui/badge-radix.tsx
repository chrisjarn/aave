import * as React from "react"
import { badgeVariants, type BadgeVariants } from "./variants"
import { cn } from "./ui-utils"

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    BadgeVariants {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, className }))}
        {...props}
        data-slot="badge"
      >
        {children}
      </div>
    )
  }
)

Badge.displayName = "Badge"

export { Badge }
