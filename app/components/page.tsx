"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../components/ui/card"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../../components/ui/accordion"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../components/ui/dialog"

export default function ComponentsShowcase() {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <main className="min-h-screen bg-[var(--bg-1)] px-5 py-12 md:px-12">
      <div className="mx-auto max-w-[986px]">
        <h1 className="mb-12">Component Library</h1>

        {/* Buttons Section */}
        <section className="mb-16">
          <h2 className="!text-2xl mb-6">Button</h2>
          <div className="space-y-6">
            <div>
              <p className="text-sm text-[var(--fg-3)] mb-3">Variants</p>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary">Primary</Button>
                <Button variant="solid">Solid</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="pill">Pill Button</Button>
                <Button variant="outline">Outline</Button>
              </div>
            </div>

            <div>
              <p className="text-sm text-[var(--fg-3)] mb-3">Sizes</p>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="solid" size="sm">Small</Button>
                <Button variant="solid" size="md">Medium</Button>
                <Button variant="solid" size="lg">Large</Button>
              </div>
            </div>

            <div>
              <p className="text-sm text-[var(--fg-3)] mb-3">States</p>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary">Enabled</Button>
                <Button variant="primary" disabled>Disabled</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Input Section */}
        <section className="mb-16">
          <h2 className="!text-2xl mb-6">Input</h2>
          <div className="space-y-6 max-w-md">
            <div>
              <p className="text-sm text-[var(--fg-3)] mb-3">Default</p>
              <Input placeholder="Enter your email" />
            </div>

            <div>
              <p className="text-sm text-[var(--fg-3)] mb-3">With Label</p>
              <Input label="Email" placeholder="ronnie@aave.com" />
            </div>

            <div>
              <p className="text-sm text-[var(--fg-3)] mb-3">Pill Variants (for grouped inputs)</p>
              <div className="flex gap-1 bg-[var(--bg-4)] p-2 rounded-xl">
                <Input variant="pill-left" placeholder="ronnie@aave.com" />
                <Button variant="solid" className="rounded-[6px_20px_20px_6px] h-10 shrink-0">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Badge Section */}
        <section className="mb-16">
          <h2 className="!text-2xl mb-6">Badge</h2>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="default">Default</Badge>
            <Badge variant="purple">Purple</Badge>
            <Badge variant="blue">Blue</Badge>
            <Badge variant="green">Green</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </section>

        {/* Card Section */}
        <section className="mb-16">
          <h2 className="!text-2xl mb-6">Card</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card variant="default" className="p-6 md:p-10">
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
                <CardDescription>
                  This is the default card variant with bg-5 background.
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-4">
                <p className="text-sm text-[var(--fg-3)]">Card content goes here</p>
              </CardContent>
            </Card>

            <Card variant="muted" className="p-6 md:p-10">
              <CardHeader>
                <CardTitle>Muted Card</CardTitle>
                <CardDescription>
                  This is the muted card variant with bg-4 background.
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-4">
                <p className="text-sm text-[var(--fg-3)]">Card content goes here</p>
              </CardContent>
            </Card>

            <Card variant="flat" className="p-6 md:p-10">
              <CardHeader>
                <CardTitle>Flat Card</CardTitle>
                <CardDescription>
                  This is the flat card variant with bg-3 background.
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-4">
                <p className="text-sm text-[var(--fg-3)]">Card content goes here</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card variant="default" className="p-8">
              <CardHeader>
                <CardTitle>Card with Footer</CardTitle>
                <CardDescription>
                  Cards can include footers for actions or additional information.
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-4">
                <p className="text-[var(--fg-2)]">
                  Supply, borrow, swap, stake and more with Aave Protocol.
                </p>
              </CardContent>
              <CardFooter className="mt-6 gap-3">
                <Button variant="solid" size="sm">Get Started</Button>
                <Button variant="ghost" size="sm">Learn More</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Accordion Section */}
        <section className="mb-16">
          <h2 className="!text-2xl mb-6">Accordion</h2>
          <Accordion defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is Aave?</AccordionTrigger>
              <AccordionContent>
                Aave is a decentralized non-custodial liquidity protocol where users can participate as suppliers or borrowers. Suppliers provide liquidity to the market to earn a passive income, while borrowers are able to borrow in an overcollateralized fashion.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>How does borrowing work?</AccordionTrigger>
              <AccordionContent>
                To borrow you need to supply any asset to be used as collateral. After this you may borrow any available asset in the protocol. The maximum amount you can borrow depends on the value of your collateral and the available liquidity.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>What is the health factor?</AccordionTrigger>
              <AccordionContent>
                The health factor is the numeric representation of the safety of your deposited assets against the borrowed assets. The higher the value is, the safer the state of your funds are against a liquidation scenario.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Dialog Section */}
        <section className="mb-16">
          <h2 className="!text-2xl mb-6">Dialog</h2>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger>
              <Button variant="primary">Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Welcome to Aave</DialogTitle>
                <DialogDescription>
                  Access the full power of DeFi. Supply, borrow, swap, stake and more.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Input label="Wallet Address" placeholder="0x..." />
              </div>
              <DialogFooter>
                <Button variant="ghost" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="solid" onClick={() => setDialogOpen(false)}>
                  Connect Wallet
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </section>

        {/* Combined Example */}
        <section className="mb-16">
          <h2 className="!text-2xl mb-6">Combined Example</h2>
          <Card variant="default" className="p-8">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="green">Live</Badge>
                <Badge variant="purple">v3.1</Badge>
              </div>
              <CardTitle>Aave Protocol</CardTitle>
              <CardDescription>
                The world&apos;s largest liquidity protocol for supplying, borrowing, and earning on your crypto assets.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-6">
              <Accordion>
                <AccordionItem value="supply">
                  <AccordionTrigger>Supply Assets</AccordionTrigger>
                  <AccordionContent>
                    Deposit your assets and start earning interest immediately. Your funds remain accessible.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="borrow">
                  <AccordionTrigger>Borrow Assets</AccordionTrigger>
                  <AccordionContent>
                    Use your supplied assets as collateral to borrow other assets at competitive rates.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
            <CardFooter className="mt-6 gap-3">
              <Button variant="solid">Launch App</Button>
              <Button variant="outline">Documentation</Button>
            </CardFooter>
          </Card>
        </section>
      </div>
    </main>
  )
}
