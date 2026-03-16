"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./ui-utils"

// ─── VenueCard ────────────────────────────────────────────────────────────────
// Large horizontal card for venue listings (Cucina On Hay style)
// Bold serif title, description, CTA button, capacity chips, venue photo, meta info

interface CapacityChip {
  label: string
  capacity: number
}

interface VenueCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  description: string
  image?: React.ReactNode
  capacities?: CapacityChip[]
  guestCount?: number
  address?: string
  ctaLabel?: string
  ctaHref?: string
  onCtaClick?: () => void
}

function VenueCard({
  name,
  description,
  image,
  capacities = [],
  guestCount,
  address,
  ctaLabel = "View Venue",
  ctaHref = "#",
  onCtaClick,
  className,
  ...props
}: VenueCardProps) {
  return (
    <div
      data-slot="venue-card"
      className={cn(
        "grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-0 rounded-2xl overflow-hidden bg-bg-2 border border-border-1",
        className
      )}
      {...props}
    >
      {/* Content side */}
      <div className="flex flex-col justify-between gap-6 p-8 lg:p-10">
        <div className="space-y-4">
          <h3
            data-slot="venue-card-title"
            className="font-brand text-4xl lg:text-5xl font-bold uppercase leading-display tracking-tight text-fg-1"
          >
            {name}
          </h3>
          <p
            data-slot="venue-card-description"
            className="text-base leading-prose tracking-normal text-fg-2 max-w-md"
          >
            {description}
          </p>
        </div>

        <div className="space-y-4">
          {/* CTA Button */}
          <a
            href={ctaHref}
            onClick={onCtaClick}
            className="inline-flex items-center justify-center h-12 px-6 rounded-pill bg-fg-1 text-bg-1 font-normal text-sm leading-tight tracking-normal transition-all duration-150 hover:bg-fg-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            {ctaLabel}
          </a>

          {/* Capacity Chips */}
          {capacities.length > 0 && (
            <div className="flex flex-wrap gap-3 pt-2">
              {capacities.map((cap, i) => (
                <div
                  key={i}
                  data-slot="capacity-chip"
                  className="flex flex-col items-center justify-center gap-1 px-6 py-4 rounded-xl bg-bg-3 min-w-[120px]"
                >
                  <span className="text-xs font-medium uppercase tracking-wide text-fg-1">
                    {cap.label}
                  </span>
                  <span className="text-sm text-fg-3">
                    {cap.capacity} guests
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Image side */}
      <div className="relative flex flex-col">
        <div className="aspect-[4/3] lg:aspect-auto lg:h-full overflow-hidden bg-bg-4">
          {image}
        </div>
        {/* Meta info below image */}
        {(guestCount || address) && (
          <div className="flex flex-col gap-2 p-4 bg-bg-1 border-t border-border-1">
            {guestCount && (
              <div className="flex items-center gap-2 text-sm text-fg-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 8a3 3 0 100-6 3 3 0 000 6zM14 14c0-2.21-2.686-4-6-4s-6 1.79-6 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="uppercase tracking-wide font-medium">{guestCount} Guests</span>
              </div>
            )}
            {address && (
              <div className="flex items-center gap-2 text-sm text-fg-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 8.5a2 2 0 100-4 2 2 0 000 4z" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M13 7c0 4-5 7-5 7s-5-3-5-7a5 5 0 1110 0z" stroke="currentColor" strokeWidth="1.3"/>
                </svg>
                <span className="uppercase tracking-wide">{address}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── EventTypeCard ────────────────────────────────────────────────────────────
// Vertical image-top card for event categories (Sports & Awards Nights style)
// Photo at top, bold uppercase title, description text

interface EventTypeCardProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href?: string
  image?: React.ReactNode
  title: string
  description?: string
}

function EventTypeCard({
  href = "#",
  image,
  title,
  description,
  className,
  ...props
}: EventTypeCardProps) {
  return (
    <a
      href={href}
      data-slot="event-type-card"
      className={cn(
        "group flex flex-col gap-4 no-underline",
        className
      )}
      {...props}
    >
      {/* Image */}
      <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-bg-4">
        {image}
      </div>

      {/* Content */}
      <div className="space-y-2">
        <h3
          data-slot="event-type-card-title"
          className="font-brand text-xl lg:text-2xl font-bold uppercase leading-heading tracking-tight text-fg-1 group-hover:text-fg-2 transition-colors"
        >
          {title}
        </h3>
        {description && (
          <p className="text-sm leading-prose tracking-normal text-fg-2">
            {description}
          </p>
        )}
      </div>
    </a>
  )
}

// ─── HeroSection ──────────────────────────────────────────────────────────────
// Full-bleed hero with background image, bold display heading, subtitle, dual CTAs

interface HeroAction {
  label: string
  href?: string
  onClick?: () => void
  variant?: "primary" | "secondary"
}

interface HeroSectionProps extends React.HTMLAttributes<HTMLElement> {
  backgroundImage?: React.ReactNode
  title: string
  subtitle?: string
  actions?: HeroAction[]
}

function HeroSection({
  backgroundImage,
  title,
  subtitle,
  actions = [],
  className,
  ...props
}: HeroSectionProps) {
  return (
    <section
      data-slot="hero-section"
      className={cn(
        "relative min-h-[70vh] flex items-end overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Background image */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          {backgroundImage}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 w-full px-6 py-12 lg:px-12 lg:py-16 max-w-4xl">
        <h1
          data-slot="hero-title"
          className="font-brand text-5xl lg:text-7xl font-bold uppercase leading-display tracking-tight text-white"
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg lg:text-xl leading-prose tracking-normal text-white/90 max-w-xl">
            {subtitle}
          </p>
        )}
        {actions.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-8">
            {actions.map((action, i) => (
              <a
                key={i}
                href={action.href ?? "#"}
                onClick={action.onClick}
                className={cn(
                  "inline-flex items-center justify-center h-12 px-6 rounded-pill font-normal text-sm leading-tight tracking-normal transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus",
                  action.variant === "secondary"
                    ? "bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
                    : "bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
                )}
              >
                {action.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

// ─── SectionHeader ────────────────────────────────────────────────────────────
// "CHOOSE YOUR SPACE" / "WHAT WE OFFER" left-side sticky header pattern

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
}

function SectionHeader({
  title,
  description,
  ctaLabel,
  ctaHref = "#",
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      data-slot="section-header"
      className={cn("space-y-6", className)}
      {...props}
    >
      <h2
        data-slot="section-header-title"
        className="font-brand text-5xl lg:text-6xl font-bold uppercase leading-display tracking-tight text-fg-1"
      >
        {title}
      </h2>
      {description && (
        <p className="text-base leading-prose tracking-normal text-fg-2 max-w-sm">
          {description}
        </p>
      )}
      {ctaLabel && (
        <a
          href={ctaHref}
          className="inline-flex items-center justify-center h-12 px-6 rounded-pill bg-fg-1 text-bg-1 font-normal text-sm leading-tight tracking-normal transition-all duration-150 hover:bg-fg-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
        >
          {ctaLabel}
        </a>
      )}
    </div>
  )
}

export { VenueCard, EventTypeCard, HeroSection, SectionHeader }
export type { VenueCardProps, EventTypeCardProps, HeroSectionProps, SectionHeaderProps, CapacityChip, HeroAction }
