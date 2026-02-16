"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, RefreshCw, Download, Share2, Heart } from "lucide-react"
import { PrayerDisplay } from "@/components/prayer/prayer-display"
import { AudioControls } from "@/components/prayer/audio-controls"
import { ScriptureQuote } from "@/components/prayer/scripture-quote"
import { DEFAULT_PRAYERS, type DefaultPrayer } from "@/lib/default-prayers"
import { RELIGIONS, SPIRITUAL_PATHS, EMOTIONAL_STATES, PRAYER_INTENTIONS } from "@/lib/prayer-types"
import { Badge } from "@/components/ui/badge"

function getTraditionLabel(tradition: string) {
  if (tradition === "universal") return "Universal Wisdom"
  const religion = RELIGIONS.find(r => r.value === tradition)
  if (religion) return religion.label
  const path = SPIRITUAL_PATHS.find(p => p.value === tradition)
  if (path) return path.label
  return tradition
}

function getEmotionColor(emotion: string) {
  const colors: Record<string, string> = {
    grateful: "bg-green-100 text-green-800",
    anxious: "bg-yellow-100 text-yellow-800",
    mourning: "bg-blue-100 text-blue-800",
    hopeful: "bg-purple-100 text-purple-800",
    "seeking-guidance": "bg-indigo-100 text-indigo-800",
    peaceful: "bg-teal-100 text-teal-800",
  }
  return colors[emotion] || "bg-gray-100 text-gray-800"
}

export default function PrayerDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [prayer, setPrayer] = useState<DefaultPrayer | null>(null)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    if (params.id && typeof params.id === 'string') {
      const foundPrayer = DEFAULT_PRAYERS.find(p => p.id === params.id)
      if (foundPrayer) {
        setPrayer(foundPrayer)
      } else {
        router.push('/browse')
      }
    }
  }, [params.id, router])

  const handleDownloadText = () => {
    if (!prayer) return

    let fullText = prayer.title + '\n\n' + prayer.text
    if (prayer.scripture) {
      fullText += '\n\n---\n\nScripture:\n"' + prayer.scripture.text + '"'
      fullText += '\n\n' + prayer.scripture.source
    }

    const blob = new Blob([fullText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${prayer.title.replace(/\s+/g, '-').toLowerCase()}.txt`
    a.click()
    URL.createObjectURL(url)
  }

  const handleShare = async () => {
    if (!prayer) return

    const url = window.location.href
    const text = `Check out this beautiful prayer: "${prayer.title}"`

    if (navigator.share) {
      try {
        await navigator.share({
          title: prayer.title,
          text: text,
          url: url,
        })
      } catch (err) {
        // Fallback to clipboard
        navigator.clipboard.writeText(`${text}\n\n${url}`)
      }
    } else {
      navigator.clipboard.writeText(`${text}\n\n${url}`)
    }
  }

  const handleSave = () => {
    // In a real app, this would save to user's account
    setIsSaved(!isSaved)
  }

  if (!prayer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading prayer...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/browse" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Browse
          </Link>

          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <h1 className="font-serif text-3xl font-semibold text-foreground md:text-4xl mb-2">
                {prayer.title}
              </h1>
              <p className="text-muted-foreground">
                A {getTraditionLabel(prayer.tradition)} prayer
              </p>
            </div>

            <div className="flex gap-2">
              <Badge className={getEmotionColor(prayer.emotion)}>
                {EMOTIONAL_STATES.find(e => e.value === prayer.emotion)?.label || prayer.emotion}
              </Badge>
              <Badge variant="outline">
                {PRAYER_INTENTIONS.find(i => i.value === prayer.intention)?.label || prayer.intention}
              </Badge>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Prayer content */}
          <div className="lg:col-span-2 space-y-8">
            <PrayerDisplay prayer={prayer.text} onPrayerChange={() => {}} />

            {prayer.scripture && (
              <ScriptureQuote
                quote={prayer.scripture.text}
                source={prayer.scripture.source}
                explanation={`This scripture complements the prayer's theme of ${prayer.intention} and resonates with feelings of ${prayer.emotion.replace('-', ' ')}.`}
              />
            )}

            {/* Audio controls */}
            <div className="rounded-xl border border-border/50 bg-card p-6">
              <h3 className="font-serif text-lg font-medium text-foreground mb-4">
                Listen to This Prayer
              </h3>
              <AudioControls text={prayer.text} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <div className="rounded-xl border border-border/50 bg-card p-6">
              <h3 className="font-serif text-lg font-medium text-foreground mb-4">
                Actions
              </h3>
              <div className="space-y-3">
                <Button
                  onClick={handleSave}
                  variant="outline"
                  className="w-full justify-start gap-2 rounded-full"
                >
                  <Heart className={`h-4 w-4 ${isSaved ? 'fill-current text-red-500' : ''}`} />
                  {isSaved ? 'Saved' : 'Save Prayer'}
                </Button>

                <Button
                  onClick={handleDownloadText}
                  variant="outline"
                  className="w-full justify-start gap-2 rounded-full"
                >
                  <Download className="h-4 w-4" />
                  Download Text
                </Button>

                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="w-full justify-start gap-2 rounded-full"
                >
                  <Share2 className="h-4 w-4" />
                  Share Prayer
                </Button>
              </div>
            </div>

            {/* Prayer details */}
            <div className="rounded-xl border border-border/50 bg-card p-6">
              <h3 className="font-serif text-lg font-medium text-foreground mb-4">
                Prayer Details
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-muted-foreground">Tradition:</span>
                  <p className="text-foreground">{getTraditionLabel(prayer.tradition)}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Emotional State:</span>
                  <p className="text-foreground">
                    {EMOTIONAL_STATES.find(e => e.value === prayer.emotion)?.label || prayer.emotion}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Intention:</span>
                  <p className="text-foreground">
                    {PRAYER_INTENTIONS.find(i => i.value === prayer.intention)?.label || prayer.intention}
                  </p>
                </div>
              </div>
            </div>

            {/* Related prayers */}
            <div className="rounded-xl border border-border/50 bg-card p-6">
              <h3 className="font-serif text-lg font-medium text-foreground mb-4">
                Similar Prayers
              </h3>
              <div className="space-y-2">
                {DEFAULT_PRAYERS.filter(p =>
                  p.id !== prayer.id &&
                  (p.tradition === prayer.tradition || p.emotion === prayer.emotion || p.intention === prayer.intention)
                ).slice(0, 3).map(relatedPrayer => (
                  <Link
                    key={relatedPrayer.id}
                    href={`/prayer/${relatedPrayer.id}`}
                    className="block p-3 rounded-lg border border-border/50 hover:border-primary/50 transition-colors"
                  >
                    <h4 className="font-medium text-foreground text-sm mb-1">
                      {relatedPrayer.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {getTraditionLabel(relatedPrayer.tradition)}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-12 text-center">
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              Create Your Own Prayer
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Inspired by this prayer? Use our AI-powered generator to create a personalized prayer
              based on your unique emotions, beliefs, and intentions.
            </p>
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/generate">Generate Prayer</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}