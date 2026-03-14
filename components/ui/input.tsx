import * as React from "react"

type InputVariant = "default" | "pill-left" | "pill-right"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant
  label?: string
}

const variantStyles: Record<InputVariant, string> = {
  default: "rounded-lg",
  "pill-left": "rounded-[20px_6px_6px_20px]",
  "pill-right": "rounded-[6px_20px_20px_6px]",
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = "default", label, type, id, ...props }, ref) => {
    const inputId = id ?? React.useId()

    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="h-8 flex items-center gap-1.5 font-medium text-[var(--fg-1)]"
          >
            {label}
            <div className="bg-[var(--purple)] mt-[1px] w-1.5 min-w-1.5 h-1.5 min-h-1.5 rounded-md flex-[0_1]" />
          </label>
        )}
        <input
          id={inputId}
          type={type}
          className={`w-full border-none flex py-2.5 px-4 items-center gap-2 self-stretch h-10 bg-white text-[var(--fg-1)] leading-[150%] tracking-[-0.18px] focus:outline-none placeholder:text-[var(--fg-3)] disabled:cursor-not-allowed disabled:opacity-50 ${variantStyles[variant]} ${className ?? ""}`}
          style={{ fontFeatureSettings: '"cv11" on' }}
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
