"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ArrowLeft, RefreshCw, Download, Mic } from "lucide-react"
import { PrayerDisplay } from "@/components/prayer/prayer-display"
import { AudioControls } from "@/components/prayer/audio-controls"
import { ScriptureQuote } from "@/components/prayer/scripture-quote"
import type { PrayerFormData } from "@/lib/prayer-types"
import {
  RELIGIONS,
  SPIRITUAL_PATHS,
  EMOTIONAL_STATES,
  PRAYER_INTENTIONS,
} from "@/lib/prayer-types"
import { VoiceRecorder } from "@/components/prayer/voice-recorder"

function getBeliefLabel(formData: PrayerFormData): string {
  if (formData.beliefType === "religion") {
    return RELIGIONS.find((r) => r.value === formData.beliefValue)?.label || formData.beliefValue
  }
  if (formData.beliefType === "spiritual") {
    return SPIRITUAL_PATHS.find((p) => p.value === formData.beliefValue)?.label || formData.beliefValue
  }
  return "Custom belief"
}

export default function PrayerPage() {
  const router = useRouter()
  const [prayer, setPrayer] = useState("")
  const [scriptureQuote, setScriptureQuote] = useState("")
  const [scriptureSource, setScriptureSource] = useState("")
  const [scriptureExplanation, setScriptureExplanation] = useState("")
  const [formData, setFormData] = useState<PrayerFormData | null>(null)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [showRecordDialog, setShowRecordDialog] = useState(false)

  useEffect(() => {
    const stored = sessionStorage.getItem("generatedPrayer")
    if (stored) {
      const data = JSON.parse(stored)
      setPrayer(data.prayer)
      setScriptureQuote(data.scriptureQuote || "")
      setScriptureSource(data.scriptureSource || "")
      setScriptureExplanation(data.scriptureExplanation || "")
      setFormData(data.formData)
    } else {
      router.push("/generate")
    }
  }, [router])

  const handleRegenerate = async () => {
    if (!formData) return
    setIsRegenerating(true)
    try {
      const response = await fetch("/api/generate-prayer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      if (data.prayer) {
        setPrayer(data.prayer)
        setScriptureQuote(data.scriptureQuote || "")
        setScriptureSource(data.scriptureSource || "")
        setScriptureExplanation(data.scriptureExplanation || "")
        sessionStorage.setItem(
          "generatedPrayer",
          JSON.stringify({
            prayer: data.prayer,
            scriptureQuote: data.scriptureQuote || "",
            scriptureSource: data.scriptureSource || "",
            scriptureExplanation: data.scriptureExplanation || "",
            formData,
          })
        )
      }
    } catch {
      // Silent fail
    } finally {
      setIsRegenerating(false)
    }
  }

  const handleDownloadText = () => {
    let fullText = prayer
    if (scriptureQuote) {
      fullText += `\n\n---\n\nScripture:\n"${scriptureQuote}"`
      if (scriptureSource) {
        fullText += `\n\n${scriptureSource}`
      }
      if (scriptureExplanation) {
        fullText += `\n\n${scriptureExplanation}`
      }
    }
    const blob = new Blob([fullText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "my-prayer.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  if (!prayer) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">
            Loading your prayer...
          </p>
        </div>
      </div>
    )
  }

  const emotionLabel =
    formData?.customEmotion ||
    EMOTIONAL_STATES.find((e) => e.value === formData?.emotionalState)?.label
  const intentionLabel =
    formData?.customIntention ||
    PRAYER_INTENTIONS.find((i) => i.value === formData?.intention)?.label

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md px-4 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link
            href="/generate"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            New Prayer
          </Link>
          <span className="font-serif text-lg font-semibold text-foreground">
            Selah
          </span>
          <Link href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
        </div>
      </header>

      {/* Prayer context summary */}
      <div className="mx-auto w-full max-w-3xl px-4 pt-8">
        <div className="flex flex-wrap items-center gap-2">
          {formData && (
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {getBeliefLabel(formData)}
            </span>
          )}
          {emotionLabel && (
            <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              {emotionLabel}
            </span>
          )}
          {intentionLabel && (
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
              {intentionLabel}
            </span>
          )}
          {formData?.name && (
            <span className="text-xs text-muted-foreground">
              for {formData.name}
            </span>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
        <div className="flex flex-col gap-8">
          <PrayerDisplay prayer={prayer} onPrayerChange={setPrayer} />
          {scriptureQuote && (
            <ScriptureQuote
              quote={scriptureQuote}
              source={scriptureSource}
              explanation={scriptureExplanation}
            />
          )}
          <AudioControls text={prayer} />

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setShowRecordDialog(true)}
              className="gap-2 rounded-full"
            >
              <Mic className="h-4 w-4" />
              Record My Prayer
            </Button>
            <Button
              variant="outline"
              onClick={handleRegenerate}
              disabled={isRegenerating}
              className="gap-2 rounded-full"
            >
              <RefreshCw
                className={`h-4 w-4 ${isRegenerating ? "animate-spin" : ""}`}
              />
              {isRegenerating ? "Regenerating..." : "Generate New Prayer"}
            </Button>
            <Button
              variant="outline"
              onClick={handleDownloadText}
              className="gap-2 rounded-full"
            >
              <Download className="h-4 w-4" />
              Download Text
            </Button>
          </div>
        </div>
      </div>

      {/* Record Prayer Dialog */}
      <Dialog open={showRecordDialog} onOpenChange={setShowRecordDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif">
              Record Your Prayer
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
              Read your prayer aloud to record it. This allows you to listen to your own voice saying the words.
            </p>
            <div className="rounded-lg border bg-muted/50 p-4">
              <p className="text-sm leading-relaxed">{prayer}</p>
            </div>
            <VoiceRecorder
              onSaved={(voice) => {
                setShowRecordDialog(false)
                // The voice is saved, user can now select it in audio controls
              }}
              onCancel={() => setShowRecordDialog(false)}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Disclaimer */}
      <footer className="border-t border-border bg-secondary/30 px-4 py-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs leading-relaxed text-muted-foreground">
            This prayer was generated by AI as a companion for your spiritual
            moments. It is not a replacement for religious leaders, counselors,
            or medical professionals. All prayers are original compositions
            created with respect for every tradition.
          </p>
        </div>
      </footer>
    </div>
  )
}
