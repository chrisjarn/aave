import * as React from "react"

// ─── Avatar ──────────────────────────────────────────────────────────────────

type AvatarSize = "sm" | "md" | "lg" | "xl"

interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: AvatarSize
}

const sizeStyles: Record<AvatarSize, string> = {
  sm: "w-7 h-7 text-xs",
  md: "w-9 h-9 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-lg",
}

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, size = "md", children, ...props }, ref) => (
    <span
      ref={ref}
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-bg-4 border border-border-1 font-medium text-fg-2 select-none ${sizeStyles[size]} ${className ?? ""}`}
      {...props}
    >
      {children}
    </span>
  )
)
Avatar.displayName = "Avatar"

// ─── AvatarImage ─────────────────────────────────────────────────────────────

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, alt = "", ...props }, ref) => (
    <img
      ref={ref}
      alt={alt}
      className={`aspect-square h-full w-full object-cover ${className ?? ""}`}
      {...props}
    />
  )
)
AvatarImage.displayName = "AvatarImage"

// ─── AvatarFallback ───────────────────────────────────────────────────────────

const AvatarFallback = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={`flex h-full w-full items-center justify-center font-medium leading-none tracking-normal text-fg-2 ${className ?? ""}`}
      {...props}
    />
  )
)
AvatarFallback.displayName = "AvatarFallback"

// ─── AvatarGroup ─────────────────────────────────────────────────────────────

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number
  size?: AvatarSize
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, max, size = "md", children, ...props }, ref) => {
    const items = React.Children.toArray(children)
    const shown = max ? items.slice(0, max) : items
    const overflow = max && items.length > max ? items.length - max : 0

    return (
      <div ref={ref} className={`flex items-center ${className ?? ""}`} {...props}>
        {shown.map((child, i) => (
          <span key={i} className="-ml-2 first:ml-0 ring-2 ring-bg-1 rounded-full inline-flex">
            {React.isValidElement(child)
              ? React.cloneElement(child as React.ReactElement<AvatarProps>, { size })
              : child}
          </span>
        ))}
        {overflow > 0 && (
          <span className={`-ml-2 ring-2 ring-bg-1 rounded-full inline-flex shrink-0 items-center justify-center bg-bg-4 border border-border-1 font-medium text-fg-3 ${sizeStyles[size]}`}>
            +{overflow}
          </span>
        )}
      </div>
    )
  }
)
AvatarGroup.displayName = "AvatarGroup"

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup }
export type { AvatarProps, AvatarImageProps, AvatarSize }
