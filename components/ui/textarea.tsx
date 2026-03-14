import * as React from "react"

// ─── Textarea ────────────────────────────────────────────────────────────────

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  hint?: string
  error?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, hint, error, id, ...props }, ref) => {
    const textareaId = id ?? React.useId()
    const hintId = `${textareaId}-hint`
    const errorId = `${textareaId}-error`

    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="flex items-center gap-1.5 font-medium text-sm leading-tight tracking-normal text-fg-1"
          >
            {label}
            <span className="bg-accent-purple mt-px w-1.5 min-w-1.5 h-1.5 min-h-1.5 rounded-md inline-block" />
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          aria-describedby={error ? errorId : hint ? hintId : undefined}
          aria-invalid={!!error}
          className={`w-full min-h-[100px] resize-y rounded-xl border-none bg-bg-3 px-4 py-3 text-sm font-medium text-fg-1 leading-prose tracking-normal placeholder:text-fg-3 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-focus transition-shadow disabled:cursor-not-allowed disabled:opacity-50 [font-feature-settings:'cv11'_on] ${error ? "ring-1 ring-accent-red focus:ring-accent-red/60" : ""} ${className ?? ""}`}
          {...props}
        />
        {error && (
          <p id={errorId} className="text-xs leading-tight tracking-normal text-accent-red">
            {error}
          </p>
        )}
        {!error && hint && (
          <p id={hintId} className="text-xs leading-tight tracking-normal text-fg-3">
            {hint}
          </p>
        )}
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
export type { TextareaProps }
