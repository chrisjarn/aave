import * as React from "react"

// ─── StatCard ────────────────────────────────────────────────────────────────
// Matches the "Building the future." section:
// large display number + label, bg-5 surface, decorative illustration slot

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  label: string
  illustration?: React.ReactNode
}

function StatCard({ value, label, illustration, className = "", ...props }: StatCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-bg-5 p-8 flex flex-col justify-between min-h-[220px] ${className}`}
      {...props}
    >
      <div className="relative z-10">
        <p className="font-brand text-5xl font-semibold leading-display tracking-tighter text-fg-1">
          {value}
        </p>
        <p className="mt-3 leading-heading tracking-body text-fg-2">{label}</p>
      </div>
      {illustration && (
        <div className="absolute bottom-0 right-0 pointer-events-none select-none">
          {illustration}
        </div>
      )}
    </div>
  )
}

// ─── ArticleCard ──────────────────────────────────────────────────────────────
// Matches the "Latest news & announcements" section:
// cover image at top, title + excerpt below, full-card link wrapper

interface ArticleCardProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href?: string
  cover?: React.ReactNode
  title: string
  excerpt?: string
}

function ArticleCard({ href = "#", cover, title, excerpt, className = "", ...props }: ArticleCardProps) {
  return (
    <a
      href={href}
      className={`group flex flex-col gap-0 rounded-2xl overflow-hidden bg-bg-5 no-underline transition-shadow duration-200 hover:shadow-card ${className}`}
      {...props}
    >
      {cover && (
        <div className="w-full aspect-[16/9] overflow-hidden bg-bg-4 shrink-0">
          {cover}
        </div>
      )}
      <div className="flex flex-col gap-2 p-6">
        <h3 className="font-brand text-xl font-semibold leading-heading tracking-tight text-fg-1 group-hover:text-fg-2 transition-colors">
          {title}
        </h3>
        {excerpt && (
          <p className="leading-prose tracking-normal text-fg-2 line-clamp-3">{excerpt}</p>
        )}
      </div>
    </a>
  )
}

// ─── TopicCard ────────────────────────────────────────────────────────────────
// Matches the colourful category card (Web3 / DeFi / etc):
// solid accent background, white text, title + subtitle + article count

// ─── Colour scale reference ───────────────────────────────────────────────────
// Purple scale: 4 (near-white) → 3 (light lavender) → 2 (medium) → 1 (vibrant)
//   Surface: purple-4 or purple-3 | Accent/icon: purple-1 | Mid overlay: purple-2
// Blue scale:   4 (near-white) → 3 (light icy) → 2 (mid steel) → 1 (dark navy)
//   Surface: blue-4 or blue-3  | Accent/icon: blue-1  | Mid overlay: blue-2
// Rule: use the lighter end of the scale for surfaces, step toward 1 for accents.
// "orange" has no multi-step scale — uses accent-red directly.

type TopicAccent = "purple" | "blue" | "orange"

const topicAccentMap: Record<TopicAccent, { bg: string; textColor: string; circleA: string; circleB: string }> = {
  purple: {
    bg: "bg-purple-3",      // light lavender surface (was purple-2 — too dark)
    textColor: "text-fg-1",
    circleA: "bg-purple-4", // near-white overlay
    circleB: "bg-purple-2", // medium pop circle
  },
  blue: {
    bg: "bg-blue-3",        // light icy surface (was blue-2 = mid steel — too dark)
    textColor: "text-blue-1", // dark navy readable on light surface
    circleA: "bg-blue-4",   // near-white overlay
    circleB: "bg-blue-2",   // mid steel pop circle
  },
  orange: {
    bg: "bg-accent-red",
    textColor: "text-bg-1",
    circleA: "bg-bg-1/20",
    circleB: "bg-bg-1/40",
  },
}

interface TopicCardProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href?: string
  title: string
  subtitle?: string
  count?: number
  accent?: TopicAccent
  illustration?: React.ReactNode
}

function TopicCard({
  href = "#",
  title,
  subtitle,
  count,
  accent = "purple",
  illustration,
  className = "",
  ...props
}: TopicCardProps) {
  const { bg, textColor, circleA, circleB } = topicAccentMap[accent]

  return (
    <a
      href={href}
      className={`relative group flex flex-col justify-end overflow-hidden rounded-2xl p-7 min-h-[200px] no-underline ${bg} ${textColor} ${className}`}
      {...props}
    >
      {/* Decorative circles — always rendered using the scale, illustration slot overrides */}
      {illustration ? (
        <div className="absolute inset-0 pointer-events-none select-none flex items-start justify-end">
          {illustration}
        </div>
      ) : (
        <div className="absolute top-0 right-0 pointer-events-none select-none" aria-hidden="true">
          <div className={`absolute -top-6 -right-6 w-32 h-32 rounded-full opacity-70 ${circleA}`} />
          <div className={`absolute top-8 right-6 w-20 h-20 rounded-full opacity-90 ${circleB}`} />
          <div className={`absolute top-2 right-20 w-12 h-12 rounded-full opacity-50 ${circleA}`} />
        </div>
      )}
      <div className="relative z-10">
        <h3 className="font-brand text-2xl font-semibold leading-heading tracking-tight">
          {title}
        </h3>
        {(subtitle || count != null) && (
          <div className="mt-2 flex items-center justify-between gap-4">
            {subtitle && (
              <p className="text-sm leading-prose tracking-normal opacity-70">{subtitle}</p>
            )}
            {count != null && (
              <p className="text-sm font-medium leading-tight tracking-normal opacity-70 shrink-0">
                {count} {count === 1 ? "Article" : "Articles"}
              </p>
            )}
          </div>
        )}
      </div>
    </a>
  )
}

// ─── GuidanceCard ─────────────────────────────────────────────────────────────
// "Looking for something else?" split layout:
// left: heading + body copy + link; right: illustration/image

interface GuidanceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  body: string
  linkLabel?: string
  linkHref?: string
  illustration?: React.ReactNode
}

function GuidanceCard({
  title,
  body,
  linkLabel = "Learn more",
  linkHref = "#",
  illustration,
  className = "",
  ...props
}: GuidanceCardProps) {
  return (
    <div
      className={`flex flex-col md:grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden bg-bg-5 ${className}`}
      {...props}
    >
      <div className="flex flex-col justify-center gap-4 p-8 md:p-12">
        <h3 className="font-brand text-2xl font-semibold leading-heading tracking-tight text-fg-1">
          {title}
        </h3>
        <p className="leading-prose tracking-normal text-fg-2">{body}</p>
        <a
          href={linkHref}
          className="inline-flex items-center gap-1.5 text-sm font-medium leading-tight tracking-normal text-blue-1 no-underline border-b border-blue-1/40 pb-0.5 w-fit hover:border-blue-1 transition-colors duration-150"
        >
          {linkLabel}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M3 7H11M8 4L11 7L8 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
      {illustration && (
        <div className="hidden md:flex items-center justify-center bg-bg-4 overflow-hidden">
          {illustration}
        </div>
      )}
    </div>
  )
}

export { StatCard, ArticleCard, TopicCard, GuidanceCard }
export type { StatCardProps, ArticleCardProps, TopicCardProps, GuidanceCardProps, TopicAccent }
