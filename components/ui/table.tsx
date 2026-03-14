import * as React from "react"

// ─── Table ────────────────────────────────────────────────────────────────────

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="w-full overflow-x-auto rounded-2xl border border-border-1 bg-bg-1">
      <table
        ref={ref}
        className={`w-full caption-bottom text-sm ${className ?? ""}`}
        {...props}
      />
    </div>
  )
)
Table.displayName = "Table"

// ─── TableHeader ─────────────────────────────────────────────────────────────

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead
      ref={ref}
      className={`border-b border-border-1 bg-bg-4 ${className ?? ""}`}
      {...props}
    />
  )
)
TableHeader.displayName = "TableHeader"

// ─── TableBody ───────────────────────────────────────────────────────────────

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody
      ref={ref}
      className={`divide-y divide-border-1 ${className ?? ""}`}
      {...props}
    />
  )
)
TableBody.displayName = "TableBody"

// ─── TableFooter ─────────────────────────────────────────────────────────────

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={`border-t border-border-1 bg-bg-4 font-medium text-fg-2 ${className ?? ""}`}
      {...props}
    />
  )
)
TableFooter.displayName = "TableFooter"

// ─── TableRow ────────────────────────────────────────────────────────────────

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  clickable?: boolean
}

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, clickable, ...props }, ref) => (
    <tr
      ref={ref}
      className={`transition-colors ${clickable ? "cursor-pointer hover:bg-bg-3" : ""} ${className ?? ""}`}
      {...props}
    />
  )
)
TableRow.displayName = "TableRow"

// ─── TableHead ───────────────────────────────────────────────────────────────

interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean
  sortDirection?: "asc" | "desc" | "none"
  onSort?: () => void
}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, sortable, sortDirection = "none", onSort, children, ...props }, ref) => (
    <th
      ref={ref}
      scope="col"
      onClick={sortable ? onSort : undefined}
      className={`h-11 px-4 text-left align-middle text-xs font-medium leading-display tracking-caption text-fg-3 first:pl-6 last:pr-6 ${sortable ? "cursor-pointer select-none hover:text-fg-1 transition-colors" : ""} ${className ?? ""}`}
      {...props}
    >
      {sortable ? (
        <span className="inline-flex items-center gap-1">
          {children}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`transition-transform ${sortDirection === "desc" ? "rotate-180" : ""} ${sortDirection === "none" ? "opacity-40" : "opacity-100 text-purple-1"}`}>
            <path d="M2.5 4.5L6 1.5L9.5 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2.5 7.5L6 10.5L9.5 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity={sortDirection === "none" ? "1" : "0.3"}/>
          </svg>
        </span>
      ) : children}
    </th>
  )
)
TableHead.displayName = "TableHead"

// ─── TableCell ───────────────────────────────────────────────────────────────

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={`px-4 py-3.5 align-middle leading-prose tracking-normal text-fg-1 first:pl-6 last:pr-6 ${className ?? ""}`}
      {...props}
    />
  )
)
TableCell.displayName = "TableCell"

// ─── TableCaption ────────────────────────────────────────────────────────────

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption
      ref={ref}
      className={`mt-4 text-sm leading-prose tracking-normal text-fg-3 ${className ?? ""}`}
      {...props}
    />
  )
)
TableCaption.displayName = "TableCaption"

export { Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption }
export type { TableRowProps, TableHeadProps }
