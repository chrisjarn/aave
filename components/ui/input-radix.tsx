import * as React from "react"
import { inputVariants, type InputVariants } from "./variants"
import { cn } from "./ui-utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    InputVariants {
  label?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, label, id, type, ...props }, ref) => {
    const inputId = id ?? React.useId()

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-normal tracking-normal text-fg-2"
            data-slot="input-label"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          className={cn(inputVariants({ variant, className }))}
          ref={ref}
          {...props}
          data-slot="input"
        />
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input }
