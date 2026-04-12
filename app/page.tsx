import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ArrowRight,
  ChartLine,
  CopySimple,
  Lightning,
  LinkSimple,
  PencilSimple,
  QrCode,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr"

const features = [
  {
    icon: Lightning,
    title: "Instant Shortening",
    description:
      "Paste any long URL and get a clean, short link in milliseconds. No sign-up required to get started.",
  },
  {
    icon: ChartLine,
    title: "Click Analytics",
    description:
      "Track every click in real time. See where your audience comes from and measure engagement effortlessly.",
  },
  {
    icon: PencilSimple,
    title: "Custom Aliases",
    description:
      "Create branded, memorable slugs like go.yoursite.com/promo instead of a random string of characters.",
  },
  {
    icon: QrCode,
    title: "QR Code Generation",
    description:
      "Every short link comes with a downloadable QR code — perfect for print materials and offline sharing.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Reliable",
    description:
      "All links are served over HTTPS with high availability. Malicious URLs are automatically blocked.",
  },
  {
    icon: CopySimple,
    title: "One-Click Copy",
    description:
      "Copy your short link to the clipboard instantly. Share via email, social media, or anywhere else.",
  },
]

const steps = [
  {
    number: "01",
    title: "Paste your URL",
    description: "Drop any long link into the input field.",
  },
  {
    number: "02",
    title: "Customise (optional)",
    description: "Add a custom alias or leave it auto-generated.",
  },
  {
    number: "03",
    title: "Share everywhere",
    description: "Copy, scan, or embed your new short link instantly.",
  },
]

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col">
      {/* Nav */}
      <header className="sticky top-0 z-10 border-b border-border/60 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2 font-semibold">
            <LinkSimple className="size-6 text-primary" weight="bold" />
            <span>Snip.ly</span>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground sm:flex">
            <a
              href="#features"
              className="transition-colors hover:text-foreground"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="transition-colors hover:text-foreground"
            >
              How it works
            </a>
          </nav>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        {/* Hero */}
        <section className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-20 text-center">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            <Lightning className="size-4" weight="fill" />
            Free to use · No account needed
          </span>
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
            Shorten links.
            <br />
            <span className="text-muted-foreground">Amplify your reach.</span>
          </h1>
          <p className="mt-4 max-w-xl text-base text-muted-foreground">
            Turn unwieldy URLs into clean, shareable short links — complete with
            click analytics, custom aliases, and QR codes.
          </p>
          <div className="mt-8 flex w-full max-w-md flex-col gap-2 sm:flex-row">
            <input
              type="url"
              placeholder="https://your-very-long-link.com/goes-here"
              className="h-10 flex-1 rounded-xl border border-border bg-background px-4 text-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:outline-none"
            />
            <Button size="sm" className="shrink-0 gap-1.5">
              Shorten <ArrowRight className="size-4" />
            </Button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Press{" "}
            <kbd className="rounded border border-border px-1 font-mono">d</kbd>{" "}
            to toggle dark mode
          </p>
        </section>

        {/* Features */}
        <section
          id="features"
          className="border-t border-border bg-muted/30 px-6 py-16"
        >
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-2 text-center text-2xl font-bold tracking-tight">
              Everything you need
            </h2>
            <p className="mb-10 text-center text-sm text-muted-foreground">
              Powerful features packed into a simple interface.
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {features.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="flex flex-col gap-3 rounded-2xl border border-border bg-background p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="size-5 text-primary" weight="duotone" />
                  </div>
                  <h3 className="text-sm font-semibold">{title}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-2 text-center text-2xl font-bold tracking-tight">
              How it works
            </h2>
            <p className="mb-10 text-center text-sm text-muted-foreground">
              Three steps and you&apos;re done.
            </p>
            <div className="grid gap-6 sm:grid-cols-3">
              {steps.map(({ number, title, description }, i) => (
                <div
                  key={number}
                  className="relative flex flex-col items-center text-center"
                >
                  {i < steps.length - 1 && (
                    <div className="absolute top-5 left-[calc(50%+2.5rem)] hidden h-px w-[calc(100%-5rem)] bg-border sm:block" />
                  )}
                  <div className="mb-4 flex size-10 items-center justify-center rounded-full border border-border bg-muted font-mono text-sm font-semibold text-muted-foreground">
                    {number}
                  </div>
                  <h3 className="mb-1 text-sm font-semibold">{title}</h3>
                  <p className="text-xs text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="border-t border-border bg-muted/30 px-6 py-14">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <h2 className="mb-2 text-2xl font-bold tracking-tight">
              Ready to shorten your first link?
            </h2>
            <p className="mb-6 text-sm text-muted-foreground">
              No account required. Start for free and upgrade as you grow.
            </p>
            <Button size="lg" className="gap-2">
              Try it now <ArrowRight className="size-5" />
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-5">
        <div className="mx-auto flex max-w-5xl items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <LinkSimple className="size-4" weight="bold" />
            <span className="font-medium text-foreground">Snip.ly</span>
          </div>
          <span>
            © {new Date().getFullYear()} Snip.ly. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  )
}
