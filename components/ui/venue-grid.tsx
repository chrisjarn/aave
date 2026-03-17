'use client'

import React from 'react'
import { cn } from './ui-utils'

interface VenueFeature {
  label: string
}

interface VenueGridCardProps {
  name: string
  guestCount: number
  features: VenueFeature[]
  ctaLabel?: string
  onViewVenue?: () => void
  className?: string
}

export function VenueGridCard({
  name,
  guestCount,
  features,
  ctaLabel = 'View Venue',
  onViewVenue,
  className,
}: VenueGridCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-6 rounded-lg bg-card p-8 border border-border',
        className
      )}
      data-slot="venue-grid-card"
    >
      {/* Venue name */}
      <h3 className="font-brand text-2xl font-semibold tracking-tight text-fg-1 uppercase">
        {name}
      </h3>

      {/* Guest count */}
      <div className="text-sm text-fg-2">Up to {guestCount} guests</div>

      {/* Features list with dividers */}
      <div className="flex flex-col divide-y divide-border">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="py-3 text-sm text-fg-2 first:pt-0 last:pb-0"
          >
            {feature.label}
          </div>
        ))}
      </div>

      {/* CTA button */}
      <button
        onClick={onViewVenue}
        className={cn(
          'mt-2 rounded-full border border-border bg-transparent px-6 py-2.5 text-sm font-normal text-fg-1',
          'transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring'
        )}
        data-slot="venue-grid-card-cta"
      >
        {ctaLabel}
      </button>
    </div>
  )
}

interface VenueGridProps {
  title: string
  subtitle?: string
  description?: string
  ctaLabel?: string
  onAllVenues?: () => void
  venues: VenueGridCardProps[]
  className?: string
}

export function VenueGrid({
  title,
  subtitle,
  description,
  ctaLabel = 'All Venues',
  onAllVenues,
  venues,
  className,
}: VenueGridProps) {
  return (
    <section
      className={cn('flex flex-col gap-12 md:flex-row md:gap-16', className)}
      data-slot="venue-grid"
    >
      {/* Left sidebar */}
      <div className="flex flex-col gap-6 md:w-1/3 md:sticky md:top-24 md:h-fit">
        {subtitle && (
          <div className="text-xs font-medium tracking-widest text-fg-3 uppercase">
            {subtitle}
          </div>
        )}

        <h2 className="font-brand text-4xl md:text-5xl font-semibold leading-tight text-fg-1 uppercase">
          {title}
        </h2>

        {description && (
          <p className="text-base leading-relaxed text-fg-2">{description}</p>
        )}

        {onAllVenues && (
          <button
            onClick={onAllVenues}
            className={cn(
              'w-fit rounded-full bg-fg-1 px-6 py-2.5 text-sm font-medium text-bg-1',
              'transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-ring'
            )}
            data-slot="venue-grid-all-venues"
          >
            {ctaLabel}
          </button>
        )}
      </div>

      {/* Right side: venue cards grid */}
      <div className="flex flex-col gap-8 md:w-2/3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {venues.map((venue, idx) => (
            <VenueGridCard key={idx} {...venue} />
          ))}
        </div>
      </div>
    </section>
  )
}
