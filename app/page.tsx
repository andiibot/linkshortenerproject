import {
  ArrowRight,
  ChartBar,
  Clipboard,
  Globe,
  Lightning,
  Lock,
  Link as LinkIcon,
} from "@phosphor-icons/react/dist/ssr"
import { SignInButton, SignUpButton } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const features = [
  {
    icon: Lightning,
    title: "Instant Shortening",
    description:
      "Paste any long URL and get a clean, shareable short link in seconds — no sign-up required to try.",
  },
  {
    icon: ChartBar,
    title: "Click Analytics",
    description:
      "Track how many times your links are clicked in real time. Understand your audience and measure engagement.",
  },
  {
    icon: Clipboard,
    title: "Easy Management",
    description:
      "View, edit, and delete all your shortened links from one organised dashboard whenever you need.",
  },
  {
    icon: Globe,
    title: "Custom Aliases",
    description:
      "Replace random slugs with memorable, branded aliases that reflect your content and are easy to share.",
  },
  {
    icon: Lock,
    title: "Secure & Reliable",
    description:
      "Every link is protected and served over HTTPS. Your data stays private and your links stay up.",
  },
  {
    icon: LinkIcon,
    title: "Shareable Anywhere",
    description:
      "Works perfectly in emails, social posts, and messages. Short links look great on any platform.",
  },
]

export default function Page() {
  return (
    <main className="flex flex-col items-center">
      {/* Hero */}
      <section className="flex w-full max-w-4xl flex-col items-center gap-6 px-6 py-24 text-center">
        <div className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-medium">
          Free to use · No credit card required
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Shorten links.
          <br />
          <span className="text-muted-foreground">Share smarter.</span>
        </h1>
        <p className="text-muted-foreground max-w-xl text-base leading-relaxed sm:text-lg">
          Turn any long, unwieldy URL into a clean, trackable short link in one
          click. Monitor performance, manage all your links, and share with
          confidence.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <SignUpButton mode="modal">
            <Button size="lg" className="gap-2 px-6">
              Get started free
              <ArrowRight weight="bold" />
            </Button>
          </SignUpButton>
          <SignInButton mode="modal">
            <Button size="lg" variant="outline" className="px-6">
              Sign in
            </Button>
          </SignInButton>
        </div>
      </section>

      {/* Features */}
      <section className="w-full max-w-5xl px-6 pb-24">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Everything you need to manage links
          </h2>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
            A focused set of tools built for individuals and teams who care
            about clean, trackable links.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <Card key={title}>
              <CardHeader className="pb-2">
                <div className="bg-primary/10 text-primary mb-2 flex size-9 items-center justify-center rounded-md">
                  <Icon size={20} weight="duotone" />
                </div>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-muted/50 w-full border-t px-6 py-20 text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Ready to start shortening?
        </h2>
        <p className="text-muted-foreground mt-2 text-sm sm:text-base">
          Create an account and manage all your links from one place.
        </p>
        <div className="mt-6">
          <SignUpButton mode="modal">
            <Button size="lg" className="gap-2 px-8">
              Create free account
              <ArrowRight weight="bold" />
            </Button>
          </SignUpButton>
        </div>
      </section>
    </main>
  )
}
