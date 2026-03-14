import * as React from "react"

// ─── Skeleton ────────────────────────────────────────────────────────────────

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circle" | "rect"
}

function Skeleton({ className, variant = "rect", ...props }: SkeletonProps) {
  const base = "animate-pulse bg-bg-4"
  const shapes = {
    text: "h-4 w-full rounded-md",
    circle: "rounded-full",
    rect: "rounded-xl",
  }

  return (
    <div
      aria-hidden="true"
      className={`${base} ${shapes[variant]} ${className ?? ""}`}
      {...props}
    />
  )
}

export { Skeleton }
export type { SkeletonProps }
