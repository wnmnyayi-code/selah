import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center px-4 py-24 text-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-primary/5 blur-3xl animate-gentle-pulse" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl animate-gentle-pulse" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="mx-auto max-w-3xl animate-fade-in-up">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          A moment of peace
        </p>
        <h1 className="font-serif text-5xl font-semibold leading-tight tracking-tight text-foreground md:text-7xl text-balance">
          Prayers that speak{" "}
          <span className="text-primary">your heart</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          Generate personalized prayers rooted in your faith, beliefs, and
          intentions. Respectful, inclusive, and crafted just for you.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="rounded-full px-8 text-base">
            <Link href="/generate">Begin Your Prayer</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full px-8 text-base"
          >
            <Link href="/browse">Browse Prayers</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="rounded-full px-8 text-base"
          >
            <Link href="#how-it-works">How It Works</Link>
          </Button>
        </div>

        <p className="mt-8 text-xs text-muted-foreground">
          All faiths and spiritual traditions welcome
        </p>
      </div>
    </section>
  )
}
