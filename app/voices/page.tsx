"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ArrowLeft,
  Mic,
  Play,
  Pause,
  Trash2,
  Volume2,
  Sparkles,
  User,
} from "lucide-react"
import {
  getVoices,
  deleteVoice,
  CELEBRITY_VOICE_PRESETS,
  type StoredVoice,
} from "@/lib/voice-store"
import { VoiceRecorder } from "@/components/prayer/voice-recorder"

export default function VoicesPage() {
  const [voices, setVoices] = useState<StoredVoice[]>([])
  const [showRecorder, setShowRecorder] = useState(false)
  const [playingId, setPlayingId] = useState<string | null>(null)

  const loadVoices = useCallback(async () => {
    try {
      const stored = await getVoices()
      setVoices(stored)
    } catch {
      // IndexedDB not available
    }
  }, [])

  useEffect(() => {
    loadVoices()
  }, [loadVoices])

  const handleDelete = async (id: string) => {
    await deleteVoice(id)
    setVoices((prev) => prev.filter((v) => v.id !== id))
  }

  const handlePreview = (voice: StoredVoice) => {
    if (playingId === voice.id) {
      speechSynthesis.cancel()
      setPlayingId(null)
      return
    }

    speechSynthesis.cancel()

    if (voice.type === "recorded" && voice.audioBlob) {
      const url = URL.createObjectURL(voice.audioBlob)
      const audio = new Audio(url)
      audio.onended = () => {
        URL.revokeObjectURL(url)
        setPlayingId(null)
      }
      audio.play()
      setPlayingId(voice.id)
    } else {
      const utterance = new SpeechSynthesisUtterance(
        "The Lord is my shepherd, I shall not want."
      )
      utterance.rate = voice.rate
      utterance.pitch = voice.pitch
      utterance.onend = () => setPlayingId(null)
      utterance.onerror = () => setPlayingId(null)
      speechSynthesis.speak(utterance)
      setPlayingId(voice.id)
    }
  }

  const handlePreviewCelebrity = (
    preset: (typeof CELEBRITY_VOICE_PRESETS)[number]
  ) => {
    if (playingId === preset.name) {
      speechSynthesis.cancel()
      setPlayingId(null)
      return
    }

    speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(
      "The Lord is my shepherd, I shall not want."
    )
    utterance.rate = preset.rate
    utterance.pitch = preset.pitch
    utterance.onend = () => setPlayingId(null)
    utterance.onerror = () => setPlayingId(null)
    speechSynthesis.speak(utterance)
    setPlayingId(preset.name)
  }

  const formatDate = (ts: number) =>
    new Date(ts).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border/50 bg-background/80 px-4 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Link
            href="/prayer"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Prayer
          </Link>
          <span className="font-serif text-lg font-semibold text-foreground">
            My Voices
          </span>
          <div className="w-24" />
        </div>
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-8">
        <div className="flex flex-col gap-8">
          {/* Record new voice */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-2xl font-semibold text-foreground">
                Voice Collection
              </h1>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                Record and manage voices for your prayer readings.
              </p>
            </div>
            <Dialog open={showRecorder} onOpenChange={setShowRecorder}>
              <DialogTrigger asChild>
                <Button className="gap-2 rounded-full px-5">
                  <Mic className="h-4 w-4" />
                  Record
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="font-serif">
                    Record a New Voice
                  </DialogTitle>
                </DialogHeader>
                <VoiceRecorder
                  onSaved={() => {
                    setShowRecorder(false)
                    loadVoices()
                  }}
                  onCancel={() => setShowRecorder(false)}
                />
              </DialogContent>
            </Dialog>
          </div>

          {/* My Recorded Voices */}
          <section className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <User className="h-4 w-4 text-primary" />
              Recorded Voices
            </div>

            {voices.length === 0 ? (
              <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-12">
                <Mic className="h-8 w-8 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">
                  No recorded voices yet
                </p>
                <p className="max-w-xs text-center text-xs text-muted-foreground leading-relaxed">
                  Record your own voice, a family member, friend, or anyone
                  whose voice brings you comfort during prayer.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {voices.map((voice) => (
                  <div
                    key={voice.id}
                    className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">
                        {voice.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {voice.label} &middot; Added {formatDate(voice.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => handlePreview(voice)}
                      >
                        {playingId === voice.id ? (
                          <Pause className="h-3.5 w-3.5" />
                        ) : (
                          <Play className="h-3.5 w-3.5" />
                        )}
                        <span className="sr-only">
                          {playingId === voice.id ? "Stop" : "Preview"}
                        </span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full text-muted-foreground hover:text-destructive"
                        onClick={() => handleDelete(voice.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Celebrity / Character Voices */}
          <section className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Sparkles className="h-4 w-4 text-accent" />
              Character Voices
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Pre-tuned voice styles that adjust pitch and speed to evoke
              different characters.
            </p>
            <div className="flex flex-col gap-2">
              {CELEBRITY_VOICE_PRESETS.map((preset) => (
                <div
                  key={preset.name}
                  className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">
                      {preset.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {preset.label}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => handlePreviewCelebrity(preset)}
                  >
                    {playingId === preset.name ? (
                      <Pause className="h-3.5 w-3.5" />
                    ) : (
                      <Volume2 className="h-3.5 w-3.5" />
                    )}
                    <span className="sr-only">Preview</span>
                  </Button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
