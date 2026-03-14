import * as React from "react"

type ButtonVariant = "primary" | "solid" | "ghost" | "pill" | "outline"
type ButtonSize = "sm" | "md" | "lg"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "inline-flex items-center gap-1.5 shadow-[0_0_0_1.5px_rgba(0,0,0,.06)] rounded-full bg-[var(--bg-1)] font-medium leading-[125%] tracking-[-0.18px] text-[var(--fg-1)] transition-all duration-150 ease-in-out hover:bg-[#fcfcfb] hover:shadow-[0_0_0_1.5px_rgba(0,0,0,0.1)]",
  solid:
    "inline-flex items-center justify-center rounded-full bg-[var(--fg-1)] font-medium leading-[105%] tracking-[-0.09px] text-[var(--bg-1)] transition-all duration-150 ease-in hover:opacity-80",
  ghost:
    "inline-flex items-center justify-center rounded-lg bg-transparent font-medium leading-[125%] tracking-[-0.18px] text-[var(--fg-1)] transition-all duration-150 ease-in-out hover:bg-[rgba(34,29,29,0.03)]",
  pill:
    "inline-flex items-center gap-2 rounded-[6.1875rem] bg-[var(--bg-4)] text-xs font-medium leading-[105%] tracking-[-0.00563rem] text-[var(--fg-1)] transition-all duration-100 ease-in hover:bg-[#f0f0ef]",
  outline:
    "inline-flex items-center justify-center rounded-full border border-[var(--border-2)] bg-transparent font-medium leading-[125%] tracking-[-0.18px] text-[var(--fg-1)] transition-all duration-150 ease-in-out hover:bg-[var(--bg-4)]",
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
