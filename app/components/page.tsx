"use client"

import { useState, useEffect } from "react"

// Existing
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../components/ui/card"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../../components/ui/accordion"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../../components/ui/dialog"

// v2 components
import { Select, SelectTrigger, SelectContent, SelectItem, SelectLabel, SelectSeparator } from "../../components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "../../components/ui/tooltip"
import { Separator } from "../../components/ui/separator"
import { Skeleton } from "../../components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarGroup } from "../../components/ui/avatar"
import { Switch } from "../../components/ui/switch"
import { Textarea } from "../../components/ui/textarea"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut } from "../../components/ui/dropdown-menu"
import { Table, TableHeader, TableBody, TableFooter as TableFoot, TableRow, TableHead, TableCell, TableCaption } from "../../components/ui/table"

// v3 components
import { StatCard, ArticleCard, TopicCard, GuidanceCard } from "../../components/ui/content-cards"
import { Callout, ProgressBar } from "../../components/ui/callout-progress"

// ─── Helpers ─────────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-xs font-medium leading-tight tracking-caption text-fg-3 uppercase">{children}</p>
}

function SectionDivider({ title }: { title: string }) {
  return (
    <div className="mb-8 mt-20 flex items-center gap-4">
      <h2 className="shrink-0 font-brand text-2xl font-semibold leading-heading tracking-tight text-fg-1">
        {title}
      </h2>
      <div className="h-px flex-1 bg-border-1" />
    </div>
  )
}

const assetData = [
  { asset: "ETH",  apy: "3.82%",  liquidity: "$2.4B",  wallet: "2.500",    badge: "purple" as const },
  { asset: "USDC", apy: "5.14%",  liquidity: "$1.1B",  wallet: "1,200.00", badge: "blue"   as const },
  { asset: "WBTC", apy: "0.61%",  liquidity: "$890M",  wallet: "0.042",    badge: "default" as const },
  { asset: "GHO",  apy: "8.40%",  liquidity: "$340M",  wallet: "500.00",   badge: "green"  as const },
]

// ─── PurpleDots illustration (StatCard) ──────────────────────────────────────
function PurpleDots() {
  const sizes = [28, 22, 22, 18, 22, 18, 14, 18, 14, 14]
  return (
    <svg width="120" height="100" viewBox="0 0 120 100" fill="none" aria-hidden="true" className="opacity-90">
      {sizes.map((r, i) => (
        <circle
          key={i}
          cx={16 + (i % 4) * 28}
          cy={16 + Math.floor(i / 4) * 28}
          r={r / 2}
          fill={i % 3 === 0 ? "var(--purple-1)" : "var(--purple-3)"}
        />
      ))}
    </svg>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ComponentsShowcase() {
  const [dialogOpen, setDialogOpen]   = useState(false)
  const [switchA, setSwitchA]         = useState(false)
  const [switchB, setSwitchB]         = useState(true)
  const [selectVal, setSelectVal]     = useState<string | undefined>()
  const [sortDir, setSortDir]         = useState<"asc" | "desc" | "none">("none")
  const [dark, setDark]               = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])

  return (
    <TooltipProvider>
      <main className="min-h-screen bg-bg-1 px-5 py-12 md:px-12 font-sans">
        <div className="mx-auto max-w-[986px]">

          {/* ── Page header ────────────────────────────────── */}
          <div className="mb-4 flex items-center justify-between">
            <Badge variant="purple">Component Library</Badge>
            <button
              onClick={() => setDark(d => !d)}
              className="flex items-center gap-2 rounded-pill bg-bg-4 px-4 py-2 text-sm font-medium text-fg-2 transition-colors hover:bg-bg-5 hover:text-fg-1"
            >
              <span>{dark ? "☀ Light" : "☾ Dark"}</span>
            </button>
          </div>
          <h1 className="mb-3 text-balance font-brand text-5xl font-semibold leading-display tracking-tighter text-fg-1">
            Aave UI Primitives
          </h1>
          <p className="max-w-xl leading-prose tracking-normal text-fg-2 mb-2">
            Every colour, spacing value, shadow, and motion curve comes directly from{" "}
            <code className="rounded-md bg-bg-4 px-1.5 py-0.5 text-xs font-mono text-fg-2">globals.css</code>{" "}
            — no hardcoded values anywhere.
          </p>
          <Separator className="mt-8" />

          {/* ════ BUTTON ════════════════════════════════════ */}
          <SectionDivider title="Button" />
          <div className="space-y-8">
            <div>
              <SectionLabel>Variants</SectionLabel>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary">Primary</Button>
                <Button variant="solid">Solid</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="pill">Pill</Button>
                <Button variant="outline">Outline</Button>
              </div>
            </div>
            <div>
              <SectionLabel>Sizes</SectionLabel>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="solid" size="sm">Small</Button>
                <Button variant="solid" size="md">Medium</Button>
                <Button variant="solid" size="lg">Large</Button>
              </div>
            </div>
            <div>
              <SectionLabel>Disabled</SectionLabel>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary" disabled>Primary</Button>
                <Button variant="solid" disabled>Solid</Button>
                <Button variant="outline" disabled>Outline</Button>
              </div>
            </div>
          </div>

          {/* ════ BADGE ═════════════════════════════════════ */}
          <SectionDivider title="Badge" />
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="default">Default</Badge>
            <Badge variant="purple">Purple</Badge>
            <Badge variant="blue">Blue</Badge>
            <Badge variant="green">Live</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>

          {/* ════ INPUT ═════════════════════════════════════ */}
          <SectionDivider title="Input" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl">
            <Input placeholder="Default — bg-3, no border" />
            <Input label="Email address" placeholder="ronnie@aave.com" />
            <Input label="With hint" placeholder="0x…" />
            <div className="flex gap-1 md:col-span-2">
              <Input variant="pill-left" placeholder="Enter your email" />
              <Button variant="solid" className="!rounded-[6px_20px_20px_6px] h-11 shrink-0">
                Subscribe
              </Button>
            </div>
          </div>

          {/* ════ SELECT ════════════════════════════════════ */}
          <SectionDivider title="Select" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl">
            <div>
              <SectionLabel>Default — bg-3, no border</SectionLabel>
              <Select value={selectVal} onValueChange={setSelectVal} placeholder="Choose asset">
                <SelectTrigger placeholder="Choose asset" />
                <SelectContent>
                  <SelectLabel>Stablecoins</SelectLabel>
                  <SelectItem value="usdc">USDC</SelectItem>
                  <SelectItem value="dai">DAI</SelectItem>
                  <SelectItem value="gho">GHO</SelectItem>
                  <SelectSeparator />
                  <SelectLabel>Volatile</SelectLabel>
                  <SelectItem value="eth">ETH</SelectItem>
                  <SelectItem value="wbtc">WBTC</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <SectionLabel>Preselected</SectionLabel>
              <Select defaultValue="eth" placeholder="Choose asset">
                <SelectTrigger placeholder="Choose asset" />
                <SelectContent>
                  <SelectItem value="eth">ETH</SelectItem>
                  <SelectItem value="usdc">USDC</SelectItem>
                  <SelectItem value="wbtc">WBTC</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* ════ TABS ══════════════════════════════════════ */}
          <SectionDivider title="Tabs" />
          <div className="space-y-14">
            <div>
              <SectionLabel>Underline (default)</SectionLabel>
              <Tabs defaultValue="supply">
                <TabsList>
                  <TabsTrigger value="supply">Supply</TabsTrigger>
                  <TabsTrigger value="borrow">Borrow</TabsTrigger>
                  <TabsTrigger value="repay">Repay</TabsTrigger>
                  <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
                </TabsList>
                <TabsContent value="supply">
                  <Card variant="muted" className="p-5 mt-1"><p className="leading-prose tracking-normal text-fg-2">Supply assets to earn yield and use as collateral for borrowing.</p></Card>
                </TabsContent>
                <TabsContent value="borrow">
                  <Card variant="muted" className="p-5 mt-1"><p className="leading-prose tracking-normal text-fg-2">Borrow assets against your supplied collateral at variable or stable rates.</p></Card>
                </TabsContent>
                <TabsContent value="repay">
                  <Card variant="muted" className="p-5 mt-1"><p className="leading-prose tracking-normal text-fg-2">Repay your outstanding borrows to improve your health factor.</p></Card>
                </TabsContent>
                <TabsContent value="withdraw">
                  <Card variant="muted" className="p-5 mt-1"><p className="leading-prose tracking-normal text-fg-2">Withdraw your supplied assets back to your wallet at any time.</p></Card>
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <SectionLabel>Pill variant</SectionLabel>
              <Tabs defaultValue="all">
                <TabsList variant="pill">
                  <TabsTrigger value="all">All markets</TabsTrigger>
                  <TabsTrigger value="stable">Stables</TabsTrigger>
                  <TabsTrigger value="volatile">Volatile</TabsTrigger>
                </TabsList>
                <TabsContent value="all"><p className="mt-4 text-sm leading-prose tracking-normal text-fg-3">Showing all available markets.</p></TabsContent>
                <TabsContent value="stable"><p className="mt-4 text-sm leading-prose tracking-normal text-fg-3">Stablecoin markets only.</p></TabsContent>
                <TabsContent value="volatile"><p className="mt-4 text-sm leading-prose tracking-normal text-fg-3">Volatile asset markets only.</p></TabsContent>
              </Tabs>
            </div>

            <div>
              <SectionLabel>Sliding — matches homepage Supply / Borrow section</SectionLabel>
              <Tabs defaultValue="supply">
                <TabsList variant="sliding" className="overflow-clip min-h-[92px]">
                  <TabsTrigger
                    value="supply"
                    description="Earn interest by supplying assets to liquidity pools."
                  >
                    Supply
                  </TabsTrigger>
                  <TabsTrigger
                    value="borrow"
                    description="Borrow against your collateral from across multiple networks and assets."
                  >
                    Borrow
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* ════ TOOLTIP ═══════════════════════════════════ */}
          <SectionDivider title="Tooltip" />
          <SectionLabel>Same dark-pill style as the homepage icon tooltips</SectionLabel>
          <div className="flex flex-wrap items-center gap-6 mt-1">
            <Tooltip>
              <TooltipTrigger>
                <Button variant="outline" size="sm">Supply APY</Button>
              </TooltipTrigger>
              <TooltipContent side="top">3.82% — variable</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <Button variant="outline" size="sm">Health factor</Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">2.14 — safe</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" className="stroke-fg-3"/>
                    <path d="M8 7.5V11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" className="stroke-fg-3"/>
                    <circle cx="8" cy="5.5" r="0.75" fill="currentColor" className="fill-fg-3"/>
                  </svg>
                  <span className="sr-only">Info</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Collateral factor: 80%</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <span className="text-sm font-medium text-fg-1 cursor-default underline decoration-dotted decoration-fg-3 underline-offset-4">
                  Liquidation threshold
                </span>
              </TooltipTrigger>
              <TooltipContent side="top">The value at which a position is liquidated.</TooltipContent>
            </Tooltip>
          </div>

          {/* ════ CALLOUT ═══════════════════════════════════ */}
          <SectionDivider title="Callout" />
          <div className="space-y-3 max-w-2xl">
            <Callout variant="info">The above applies to standard Hub and Spoke behaviour. Tailored implementations may vary.</Callout>
            <Callout variant="warning">Borrowing at high utilisation may result in increased interest rates.</Callout>
            <Callout variant="tip">Supplying GHO earns an additional discount on your borrowing rate.</Callout>
            <Callout variant="danger">Do not share your seed phrase with anyone, including the Aave team.</Callout>
          </div>

          {/* ════ PROGRESS BAR ══════════════════════════════ */}
          <SectionDivider title="Progress Bar" />
          <div className="space-y-6 max-w-md">
            <div>
              <SectionLabel>Health factor</SectionLabel>
              <ProgressBar variant="health" value={78} label="Health factor" showValue />
            </div>
            <div>
              <SectionLabel>Utilisation</SectionLabel>
              <ProgressBar variant="utilisation" value={62} label="Pool utilisation" showValue />
            </div>
            <div>
              <SectionLabel>Danger zone</SectionLabel>
              <ProgressBar variant="health" value={18} label="Health factor" showValue />
            </div>
            <div>
              <SectionLabel>Default</SectionLabel>
              <ProgressBar value={44} label="Collateral used" showValue />
            </div>
          </div>

          {/* ════ STAT CARDS ════════════════════════════════ */}
          <SectionDivider title="Stat Card" />
          <SectionLabel>Matches "Building the future." section</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
            <StatCard value="$35B" label="Total liquidity currently supplied in Aave." illustration={<PurpleDots />} />
            <StatCard value="$3.23T" label="Cumulative deposits." illustration={<PurpleDots />} />
            <StatCard value="$919B" label="Total originated loan volume." />
            <StatCard value="$1B" label="Total interest paid." />
          </div>

          {/* ════ ARTICLE CARD ══════════════════════════════ */}
          <SectionDivider title="Article Card" />
          <SectionLabel>Matches "Latest news & announcements" section</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-1">
            <ArticleCard
              title="Security by Design: Aave V4 Governance Update"
              excerpt="How Aave V4 achieved zero high-severity findings across 345 days of security review, formal verification, and a 900-participant public contest."
              cover={<div className="w-full h-full bg-purple-2 flex items-center justify-center"><span className="text-4xl font-brand font-bold text-purple-1 opacity-40">V4</span></div>}
            />
            <ArticleCard
              title="How Aave App Reimagines the DeFi Experience"
              excerpt="Can a user tell if a financial app is powered by a blockchain or not? Introducing the Fintech Test and how Aave App passes it."
              cover={<div className="w-full h-full bg-blue-3 flex items-center justify-center"><span className="text-4xl font-brand font-bold text-blue-1 opacity-40">App</span></div>}
            />
            <ArticleCard
              title="GHO: The Aave-Native Stablecoin"
              excerpt="GHO is a decentralised multi-collateral stablecoin that is fully backed, transparent, and native to the Aave ecosystem."
              cover={<div className="w-full h-full bg-bg-3 flex items-center justify-center"><span className="text-4xl font-brand font-bold text-fg-3 opacity-40">GHO</span></div>}
            />
          </div>

          {/* ════ TOPIC CARD ════════════════════════════════ */}
          <SectionDivider title="Topic Card" />
          <SectionLabel>Matches colourful guide category cards</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-1">
            <TopicCard title="Web3" subtitle="Blockchain basics." count={6} accent="orange" />
            <TopicCard title="DeFi" subtitle="Decentralised finance." count={12} accent="purple" />
            <TopicCard title="Security" subtitle="Keep your funds safe." count={4} accent="blue" />
          </div>

          {/* ════ GUIDANCE CARD ═════════════════════════════ */}
          <SectionDivider title="Guidance Card" />
          <SectionLabel>Matches "Looking for something else?" section</SectionLabel>
          <GuidanceCard
            title="Looking for something else?"
            body="If there's a guide you need that isn't available, you can request a new guide from us — the Aave Labs team."
            linkLabel="Request A Guide"
            linkHref="#"
            illustration={
              <div className="w-full h-full min-h-[180px] flex items-center justify-center bg-purple-4">
                <svg width="120" height="80" viewBox="0 0 120 80" fill="none" aria-hidden="true">
                  <path d="M20 60 Q60 10 100 60" stroke="var(--purple-1)" strokeWidth="12" strokeLinecap="round" fill="none"/>
                  <circle cx="42" cy="56" r="10" fill="var(--purple-1)"/>
                  <circle cx="78" cy="56" r="10" fill="var(--purple-1)"/>
                </svg>
              </div>
            }
          />

          {/* ════ CARD ══════════════════════════════════════ */}
          <SectionDivider title="Card" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {(["default", "muted", "flat"] as const).map((v) => (
              <Card key={v} variant={v} className="p-6">
                <CardHeader>
                  <CardTitle className="!text-lg">{v.charAt(0).toUpperCase() + v.slice(1)}</CardTitle>
                  <CardDescription>Surface variant</CardDescription>
                </CardHeader>
                <CardFooter className="mt-4">
                  <Button variant="ghost" size="sm">Action</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <Card variant="default" className="p-8">
            <CardHeader>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="green">Live</Badge>
                <Badge variant="purple">v3.3</Badge>
              </div>
              <CardTitle>Supply Assets</CardTitle>
              <CardDescription>Deposit and start earning interest immediately.</CardDescription>
            </CardHeader>
            <CardContent className="mt-4">
              <p className="text-fg-2 leading-prose tracking-normal">Your funds remain accessible at any time and accrue yield continuously.</p>
            </CardContent>
            <CardFooter className="mt-6 gap-3">
              <Button variant="solid">Supply Now</Button>
              <Button variant="outline">View Markets</Button>
            </CardFooter>
          </Card>

          {/* ════ ACCORDION ═════════════════════════════════ */}
          <SectionDivider title="Accordion" />
          <Accordion defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is Aave?</AccordionTrigger>
              <AccordionContent>Aave is a decentralised non-custodial liquidity protocol where users can participate as suppliers or borrowers. Suppliers provide liquidity to earn passive income; borrowers can borrow in an overcollateralised fashion.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How does borrowing work?</AccordionTrigger>
              <AccordionContent>To borrow you need to supply any asset to be used as collateral. The maximum you can borrow depends on the value of your collateral and available liquidity.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>What is the health factor?</AccordionTrigger>
              <AccordionContent>The health factor is a numeric representation of the safety of your deposited assets. The higher the value, the safer your position is from liquidation.</AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* ════ DIALOG ════════════════════════════════════ */}
          <SectionDivider title="Dialog" />
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger>
              <Button variant="primary">Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Connect Wallet</DialogTitle>
                <DialogDescription>Access the full power of DeFi. Supply, borrow, swap, stake and more.</DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Input label="Wallet Address" placeholder="0x…" />
              </div>
              <DialogFooter>
                <Button variant="ghost" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button variant="solid" onClick={() => setDialogOpen(false)}>Connect</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* ════ SWITCH ════════════════════════════════════ */}
          <SectionDivider title="Switch" />
          <div className="space-y-4">
            <Switch checked={switchA} onCheckedChange={setSwitchA} label="E-mode" />
            <Switch checked={switchB} onCheckedChange={setSwitchB} label="Collateral enabled" />
            <Switch size="sm" defaultChecked label="Compact (sm)" />
            <Switch disabled label="Disabled" />
          </div>

          {/* ════ AVATAR ════════════════════════════════════ */}
          <SectionDivider title="Avatar" />
          <div className="flex flex-wrap items-start gap-10">
            <div>
              <SectionLabel>Sizes</SectionLabel>
              <div className="flex items-end gap-3">
                <Avatar size="sm"><AvatarFallback>EA</AvatarFallback></Avatar>
                <Avatar size="md"><AvatarFallback>RB</AvatarFallback></Avatar>
                <Avatar size="lg"><AvatarFallback>MK</AvatarFallback></Avatar>
                <Avatar size="xl"><AvatarFallback>SJ</AvatarFallback></Avatar>
              </div>
            </div>
            <div>
              <SectionLabel>Group</SectionLabel>
              <AvatarGroup max={4} size="md">
                <Avatar><AvatarFallback>EA</AvatarFallback></Avatar>
                <Avatar><AvatarFallback>RB</AvatarFallback></Avatar>
                <Avatar><AvatarFallback>MK</AvatarFallback></Avatar>
                <Avatar><AvatarFallback>SJ</AvatarFallback></Avatar>
                <Avatar><AvatarFallback>TL</AvatarFallback></Avatar>
                <Avatar><AvatarFallback>WP</AvatarFallback></Avatar>
              </AvatarGroup>
            </div>
          </div>

          {/* ════ TEXTAREA ══════════════════════════════════ */}
          <SectionDivider title="Textarea" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl">
            <Textarea placeholder="Leave a comment…" />
            <Textarea label="Transaction note" placeholder="Optional note…" hint="This will not be recorded on-chain." />
          </div>

          {/* ════ SKELETON ══════════════════════════════════ */}
          <SectionDivider title="Skeleton" />
          <div className="space-y-5 max-w-md">
            <div className="flex items-center gap-3">
              <Skeleton variant="circle" className="w-10 h-10 shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton variant="text" className="w-3/4" />
                <Skeleton variant="text" className="w-1/2" />
              </div>
            </div>
            <Skeleton variant="rect" className="h-28 w-full" />
          </div>

          {/* ════ SEPARATOR ═════════════════════════════════ */}
          <SectionDivider title="Separator" />
          <div className="space-y-6">
            <div className="flex flex-col gap-3">
              <p className="text-sm leading-prose tracking-normal text-fg-2">Supply markets</p>
              <Separator />
              <p className="text-sm leading-prose tracking-normal text-fg-2">Borrow markets</p>
            </div>
            <div className="flex items-center gap-4 h-8">
              <span className="text-sm text-fg-2">Total supplied</span>
              <Separator orientation="vertical" />
              <span className="text-sm text-fg-2">Total borrowed</span>
              <Separator orientation="vertical" />
              <span className="text-sm text-fg-2">Net APY</span>
            </div>
          </div>

          {/* ════ DROPDOWN ══════════════════════════════════ */}
          <SectionDivider title="Dropdown Menu" />
          <div className="flex flex-wrap gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="outline" size="sm">
                  Actions
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="ml-1">
                    <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>Position</DropdownMenuLabel>
                <DropdownMenuItem>Supply more<DropdownMenuShortcut>⌘S</DropdownMenuShortcut></DropdownMenuItem>
                <DropdownMenuItem>Borrow<DropdownMenuShortcut>⌘B</DropdownMenuShortcut></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Withdraw</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem destructive>Liquidate</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* ════ TABLE ═════════════════════════════════════ */}
          <SectionDivider title="Table" />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead
                  sortable
                  sortDirection={sortDir}
                  onSort={() => setSortDir((d) => d === "asc" ? "desc" : d === "desc" ? "none" : "asc")}
                >
                  APY
                </TableHead>
                <TableHead>Liquidity</TableHead>
                <TableHead>Wallet balance</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assetData.map((row) => (
                <TableRow key={row.asset} clickable>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <Avatar size="sm">
                        <AvatarFallback className="text-[9px]">{row.asset.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium tracking-normal text-fg-1">{row.asset}</span>
                    </div>
                  </TableCell>
                  <TableCell><Badge variant={row.badge}>{row.apy}</Badge></TableCell>
                  <TableCell className="text-fg-2">{row.liquidity}</TableCell>
                  <TableCell className="font-mono text-fg-2">{row.wallet}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="pill" size="sm">Supply</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFoot>
              <TableRow>
                <TableCell colSpan={2}>4 assets</TableCell>
                <TableCell colSpan={3} className="text-right text-fg-3">Updated 2s ago</TableCell>
              </TableRow>
            </TableFoot>
            <TableCaption>Aave V3 mainnet markets</TableCaption>
          </Table>

          <div className="h-20" />
        </div>
      </main>
    </TooltipProvider>
  )
}
