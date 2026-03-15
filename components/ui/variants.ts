import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./ui-utils"

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl border-none font-normal text-sm leading-tight tracking-normal transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-blue-1 text-fg-1 hover:bg-blue-2 active:bg-blue-1 shadow-btn hover:shadow-btn-hover",
        solid:
          "bg-fg-1 text-bg-1 hover:bg-fg-2 active:bg-fg-1 shadow-btn hover:shadow-btn-hover",
        ghost:
          "bg-transparent text-fg-1 hover:bg-bg-4 active:bg-bg-3 border border-border-1",
        pill:
          "rounded-pill bg-purple-2 text-fg-1 hover:bg-purple-1 active:bg-purple-2 shadow-btn hover:shadow-btn-hover",
        outline:
          "border border-border-2 text-fg-1 hover:bg-bg-4 active:bg-bg-3",
      },
      size: {
        sm: "h-8 px-3",
        md: "h-10 px-4",
        lg: "h-12 px-6",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export type ButtonVariants = VariantProps<typeof buttonVariants>

export const cardVariants = cva(
  "rounded-2xl border border-border-1 p-6 transition-colors",
  {
    variants: {
      variant: {
        default: "bg-bg-2",
        muted: "bg-bg-3",
        flat: "bg-bg-1",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export type CardVariants = VariantProps<typeof cardVariants>

export const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-pill px-3 py-1.5 text-xs font-normal leading-tight tracking-tighter",
  {
    variants: {
      variant: {
        default: "bg-purple-3 text-fg-1",
        purple: "bg-purple-3 text-fg-1",
        blue: "bg-blue-3 text-fg-1",
        green: "bg-bg-5 text-accent-green",
        outline: "border border-border-1 bg-transparent text-fg-1",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export type BadgeVariants = VariantProps<typeof badgeVariants>

export const inputVariants = cva(
  "flex h-11 w-full rounded-xl border-none bg-bg-3 px-4 py-2.5 text-sm font-normal text-fg-1 leading-prose tracking-normal placeholder:font-normal placeholder:text-fg-3 focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 transition-shadow [font-feature-settings:'cv11'_on,'ss01'_on]",
  {
    variants: {
      variant: {
        default: "rounded-xl",
        "pill-left": "rounded-l-pill rounded-r-none",
        "pill-right": "rounded-r-pill rounded-l-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export type InputVariants = VariantProps<typeof inputVariants>
