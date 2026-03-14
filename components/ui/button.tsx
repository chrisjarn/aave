import * as React from "react"

type ButtonVariant = "primary" | "solid" | "ghost" | "pill" | "outline"
type ButtonSize = "sm" | "md" | "lg"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "inline-flex items-center gap-1.5 shadow-btn rounded-pill bg-bg-1 font-medium leading-tight tracking-normal text-fg-1 transition-all duration-150 ease-in-out hover:bg-bg-5 hover:shadow-btn-hover",
  solid:
    "inline-flex items-center justify-center rounded-pill bg-fg-1 font-medium leading-display tracking-body text-bg-1 transition-all duration-150 ease-in hover:opacity-80",
  ghost:
    "inline-flex items-center justify-center rounded-lg bg-transparent font-medium leading-tight tracking-normal text-fg-1 transition-all duration-150 ease-in-out hover:bg-fg-1/[.03]",
  pill:
    "inline-flex items-center gap-2 rounded-pill bg-bg-4 text-xs font-medium leading-display tracking-caption text-fg-1 transition-all duration-100 ease-in hover:bg-bg-3",
  outline:
    "inline-flex items-center justify-center rounded-pill border border-border-2 bg-transparent font-medium leading-tight tracking-normal text-fg-1 transition-all duration-150 ease-in-out hover:bg-bg-4",
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-[9px] text-base",
  lg: "px-6 py-3 text-base",
}

const pillSizeStyles: Record<ButtonSize, string> = {
  sm: "px-2.5 py-1.5",
  md: "px-3 py-2",
  lg: "px-4 py-2.5",
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const sizes = variant === "pill" ? pillSizeStyles : sizeStyles

    return (
      <button
        className={`${variantStyles[variant]} ${sizes[size]} disabled:pointer-events-none disabled:opacity-50 ${className ?? ""}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
export type { ButtonProps, ButtonVariant, ButtonSize }
