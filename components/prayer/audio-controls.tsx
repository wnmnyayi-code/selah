"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Play,
  Pause,
  Square,
  Volume2,
  Mic,
  User,
  Sparkles,
  Check,
} from "lucide-react"
import {
  getVoices,
  CELEBRITY_VOICE_PRESETS,
  type StoredVoice,
} from "@/lib/voice-store"
import { VoiceRecorder } from "./voice-recorder"
import Link from "next/link"

interface AudioControlsProps {
  text: string
}

type VoiceSelection =
  | { mode: "browser"; voiceName: string }
  | { mode: "recorded"; voice: StoredVoice }
  | {
      mode: "celebrity"
      preset: (typeof CELEBRITY_VOICE_PRESETS)[number]
    }

export function AudioControls({ text }: AudioControlsProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [rate, setRate] = useState(0.9)
  const [browserVoices, setBrowserVoices] = useState<SpeechSynthesisVoice[]>(
    []
  )
  const [savedVoices, setSavedVoices] = useState<StoredVoice[]>([])
  const [selection, setSelection] = useState<VoiceSelection>({
    mode: "browser",
    voiceName: "",
  })
  const [showRecorder, setShowRecorder] = useState(false)
  const [recordedAudio, setRecordedAudio] = useState<HTMLAudioElement | null>(
    null
  )
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  // Load browser voices
  useEffect(() => {
    const loadVoices = () => {
      const available = speechSynthesis.getVoices()
      if (available.length > 0) {
        setBrowserVoices(available)
        const preferred = available.find(
          (v) =>
            v.lang.startsWith("en") &&
            (v.name.toLowerCase().includes("natural") ||
              v.name.toLowerCase().includes("google") ||
              v.name.toLowerCase().includes("samantha"))
        )
        setSelection({
          mode: "browser",
          voiceName: preferred?.name || available[0]?.name || "",
        })
      }
    }
    loadVoices()
    speechSynthesis.addEventListener("voiceschanged", loadVoices)
    return () => {
      speechSynthesis.removeEventListener("voiceschanged", loadVoices)
      speechSynthesis.cancel()
    }
  }, [])

  // Load saved voices from IndexedDB
  useEffect(() => {
    getVoices().then(setSavedVoices).catch(() => {})
  }, [])

  const refreshSavedVoices = useCallback(async () => {
    try {
      const voices = await getVoices()
      setSavedVoices(voices)
    } catch {
      // ignore
    }
  }, [])

  const handleStop = useCallback(() => {
    speechSynthesis.cancel()
    if (recordedAudio) {
      recordedAudio.pause()
      recordedAudio.currentTime = 0
    }
    setIsPlaying(false)
  }, [recordedAudio])

  const handlePlay = useCallback(() => {
    if (isPlaying) {
      handleStop()
      return
    }

    if (selection.mode === "recorded" && selection.voice.audioBlob) {
      // Play the recorded audio first, then use speech synthesis for the text
      const url = URL.createObjectURL(selection.voice.audioBlob)
      const audio = new Audio(url)
      setRecordedAudio(audio)
      audio.onended = () => {
        URL.revokeObjectURL(url)
        // After recorded intro, read text with browser voice
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.rate = selection.voice.rate
        utterance.pitch = selection.voice.pitch
        utterance.onend = () => setIsPlaying(false)
        utterance.onerror = () => setIsPlaying(false)
        utteranceRef.current = utterance
        speechSynthesis.speak(utterance)
      }
      audio.play()
      setIsPlaying(true)
      return
    }

    const utterance = new SpeechSynthesisUtterance(text)

    if (selection.mode === "celebrity") {
      utterance.rate = selection.preset.rate
      utterance.pitch = selection.preset.pitch
      // Find closest matching browser voice
      const englishVoices = browserVoices.filter((v) =>
        v.lang.startsWith("en")
      )
      if (englishVoices.length > 0) {
        // Try to pick a voice that fits the character
        const lowerName = selection.preset.name.toLowerCase()
        let bestVoice = englishVoices[0]
        if (
          lowerName.includes("elder") ||
          lowerName.includes("narrator") ||
          lowerName.includes("pastor")
        ) {
          bestVoice =
            englishVoices.find(
              (v) =>
                v.name.toLowerCase().includes("male") ||
                v.name.toLowerCase().includes("daniel") ||
                v.name.toLowerCase().includes("james")
            ) || englishVoices[0]
        } else if (
          lowerName.includes("mother") ||
          lowerName.includes("leader")
        ) {
          bestVoice =
            englishVoices.find(
              (v) =>
                v.name.toLowerCase().includes("female") ||
                v.name.toLowerCase().includes("samantha") ||
                v.name.toLowerCase().includes("karen")
            ) || englishVoices[0]
        }
        utterance.voice = bestVoice
      }
    } else {
      utterance.rate = rate
      utterance.pitch = 1.0
      const voice = browserVoices.find(
        (v) => v.name === (selection as { mode: "browser"; voiceName: string }).voiceName
      )
      if (voice) utterance.voice = voice
    }

    utterance.onend = () => setIsPlaying(false)
    utterance.onerror = () => setIsPlaying(false)
    utteranceRef.current = utterance
    speechSynthesis.speak(utterance)
    setIsPlaying(true)
  }, [isPlaying, text, rate, browserVoices, selection, handleStop, recordedAudio])

  const englishVoices = browserVoices.filter((v) => v.lang.startsWith("en"))

  const getSelectionLabel = () => {
    if (selection.mode === "browser") {
      return (
        englishVoices.find((v) => v.name === selection.voiceName)?.name ||
        "Default voice"
      )
    }
    if (selection.mode === "recorded") return selection.voice.name
    if (selection.mode === "celebrity") return selection.preset.name
    return "Select a voice"
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Volume2 className="h-4 w-4 text-primary" />
          Listen to your prayer
        </div>
        <Link
          href="/voices"
          className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          Manage voices
        </Link>
      </div>

      {/* Voice selector tabs */}
      <Tabs defaultValue="browser" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="browser" className="flex-1 gap-1.5 text-xs">
            <Volume2 className="h-3 w-3" />
            Browser
          </TabsTrigger>
          <TabsTrigger value="my-voices" className="flex-1 gap-1.5 text-xs">
            <User className="h-3 w-3" />
            My Voices
          </TabsTrigger>
          <TabsTrigger value="celebrity" className="flex-1 gap-1.5 text-xs">
            <Sparkles className="h-3 w-3" />
            Characters
          </TabsTrigger>
        </TabsList>

        <TabsContent value="browser" className="mt-3">
          {englishVoices.length > 1 && (
            <div className="flex flex-col gap-1.5">
              <select
                value={
                  selection.mode === "browser" ? selection.voiceName : ""
                }
                onChange={(e) =>
                  setSelection({
                    mode: "browser",
                    voiceName: e.target.value,
                  })
                }
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
                aria-label="Select browser voice"
              >
                {englishVoices.map((voice) => (
                  <option key={voice.name} value={voice.name}>
                    {voice.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </TabsContent>

        <TabsContent value="my-voices" className="mt-3">
          <div className="flex flex-col gap-2">
            {savedVoices.length === 0 ? (
              <p className="py-4 text-center text-sm text-muted-foreground">
                No saved voices yet. Record one to get started.
              </p>
            ) : (
              <div className="flex flex-col gap-1.5 max-h-40 overflow-y-auto">
                {savedVoices.map((voice) => (
                  <button
                    key={voice.id}
                    type="button"
                    onClick={() =>
                      setSelection({ mode: "recorded", voice })
                    }
                    className={`flex items-center justify-between rounded-lg border px-3 py-2.5 text-left text-sm transition-all ${
                      selection.mode === "recorded" &&
                      selection.voice.id === voice.id
                        ? "border-primary bg-primary/5 text-foreground"
                        : "border-border bg-background text-foreground hover:border-primary/40"
                    }`}
                  >
                    <div>
                      <span className="font-medium">{voice.name}</span>
                      <span className="ml-2 text-xs text-muted-foreground">
                        {voice.label}
                      </span>
                    </div>
                    {selection.mode === "recorded" &&
                      selection.voice.id === voice.id && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                  </button>
                ))}
              </div>
            )}
            <Dialog open={showRecorder} onOpenChange={setShowRecorder}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="mt-1 gap-2">
                  <Mic className="h-3.5 w-3.5" />
                  Record New Voice
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="font-serif">
                    Record a Voice
                  </DialogTitle>
                </DialogHeader>
                <VoiceRecorder
                  onSaved={(voice) => {
                    setShowRecorder(false)
                    refreshSavedVoices()
                    setSelection({ mode: "recorded", voice })
                  }}
                  onCancel={() => setShowRecorder(false)}
                />
              </DialogContent>
            </Dialog>
          </div>
        </TabsContent>

        <TabsContent value="celebrity" className="mt-3">
          <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto">
            {CELEBRITY_VOICE_PRESETS.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => setSelection({ mode: "celebrity", preset })}
                className={`flex items-center justify-between rounded-lg border px-3 py-2.5 text-left text-sm transition-all ${
                  selection.mode === "celebrity" &&
                  selection.preset.name === preset.name
                    ? "border-primary bg-primary/5 text-foreground"
                    : "border-border bg-background text-foreground hover:border-primary/40"
                }`}
              >
                <div>
                  <span className="font-medium">{preset.name}</span>
                  <span className="ml-2 text-xs text-muted-foreground">
                    {preset.label}
                  </span>
                </div>
                {selection.mode === "celebrity" &&
                  selection.preset.name === preset.name && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
              </button>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Currently selected */}
      <p className="text-xs text-muted-foreground">
        Selected: <span className="font-medium text-foreground">{getSelectionLabel()}</span>
      </p>

      {/* Speed control */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs text-muted-foreground">
          Speed: {rate.toFixed(1)}x
        </label>
        <Slider
          value={[rate]}
          onValueChange={(val) => setRate(val[0])}
          min={0.5}
          max={1.5}
          step={0.1}
          className="w-full"
        />
      </div>

      {/* Playback controls */}
      <div className="flex items-center gap-3">
        <Button
          onClick={handlePlay}
          size="lg"
          className="gap-2 rounded-full px-6"
        >
          {isPlaying ? (
            <>
              <Pause className="h-4 w-4" />
              Pause
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              Play Prayer
            </>
          )}
        </Button>

        {isPlaying && (
          <Button
            onClick={handleStop}
            variant="outline"
            size="icon"
            className="rounded-full"
          >
            <Square className="h-4 w-4" />
            <span className="sr-only">Stop</span>
          </Button>
        )}
      </div>
    </div>
  )
}
