"use client"

import { BookOpen } from "lucide-react"

interface ScriptureQuoteProps {
  quote: string
  source: string
  explanation: string
}

export function ScriptureQuote({ quote, source, explanation }: ScriptureQuoteProps) {
  if (!quote) return null

  return (
    <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <BookOpen className="h-4 w-4 text-primary" />
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-serif text-base italic leading-relaxed text-foreground">
            {`"${quote.replace(/^[""\u201C]+|[""\u201D]+$/g, "")}"`}
          </p>
          {source && (
            <p className="text-xs font-medium text-primary">
              {source}
            </p>
          )}
          {explanation && (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {explanation}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
