import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Info } from "lucide-react"

export function Disclaimer() {
  return (
    <section className="px-4 py-24 bg-secondary/50">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl border border-border bg-card p-8 md:p-12">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
              <Info className="h-6 w-6 text-accent" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-foreground md:text-3xl text-balance">
              A tool for reflection, not a replacement
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
              Selah is a companion for your spiritual moments. It is not a
              replacement for religious leaders, counselors, or medical
              professionals. All prayers are original, AI-generated compositions
              created with respect for every tradition.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
              <span>Not medical or legal advice</span>
              <span className="text-border">|</span>
              <span>Your data stays private</span>
              <span className="text-border">|</span>
              <span>All beliefs respected equally</span>
            </div>
            <Button
              asChild
              size="lg"
              className="mt-8 rounded-full px-8 text-base"
            >
              <Link href="/generate">Create Your Prayer</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
