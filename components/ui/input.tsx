import * as React from "react"

type InputVariant = "default" | "pill-left" | "pill-right"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant
  label?: string
}

const variantStyles: Record<InputVariant, string> = {
  default: "rounded-xl",
  "pill-left": "rounded-l-pill rounded-r-none",
  "pill-right": "rounded-r-pill rounded-l-none",
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = "default", label, type, id, ...props }, ref) => {
    const inputId = id ?? React.useId()

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-medium tracking-normal text-fg-2"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          className={`w-full border-none h-11 px-4 bg-bg-3 text-fg-1 text-sm font-sans leading-prose tracking-normal placeholder:text-fg-3 focus:outline-none focus:ring-2 focus:ring-focus disabled:cursor-not-allowed disabled:opacity-50 transition-shadow duration-150 [font-feature-settings:'cv11'_on,'ss01'_on] ${variantStyles[variant]} ${className ?? ""}`}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
export type { InputProps, InputVariant }
