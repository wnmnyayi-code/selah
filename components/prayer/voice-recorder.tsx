"use client"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mic, Square, Play, Pause, Save, RotateCcw } from "lucide-react"
import { saveVoice, type StoredVoice } from "@/lib/voice-store"

interface VoiceRecorderProps {
  onSaved: (voice: StoredVoice) => void
  onCancel: () => void
}

export function VoiceRecorder({ onSaved, onCancel }: VoiceRecorderProps) {
  const [name, setName] = useState("")
  const [label, setLabel] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" })
        setAudioBlob(blob)
        setAudioUrl(URL.createObjectURL(blob))
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)
      timerRef.current = setInterval(() => {
        setRecordingTime((t) => t + 1)
      }, 1000)
    } catch {
      // Microphone access denied
    }
  }, [])

  const stopRecording = useCallback(() => {
    mediaRecorderRef.current?.stop()
    setIsRecording(false)
    if (timerRef.current) clearInterval(timerRef.current)
  }, [])

  const resetRecording = useCallback(() => {
    if (audioUrl) URL.revokeObjectURL(audioUrl)
    setAudioBlob(null)
    setAudioUrl(null)
    setRecordingTime(0)
    setIsPreviewPlaying(false)
  }, [audioUrl])

  const togglePreview = useCallback(() => {
    if (!audioRef.current || !audioUrl) return
    if (isPreviewPlaying) {
      audioRef.current.pause()
      setIsPreviewPlaying(false)
    } else {
      audioRef.current.src = audioUrl
      audioRef.current.play()
      setIsPreviewPlaying(true)
    }
  }, [audioUrl, isPreviewPlaying])

  const handleSave = async () => {
    if (!name.trim() || !audioBlob) return
    setIsSaving(true)
    const voice: StoredVoice = {
      id: `recorded-${Date.now()}`,
      name: name.trim(),
      label: label.trim() || `Recorded by ${name.trim()}`,
      type: "recorded",
      pitch: 1.0,
      rate: 0.9,
      audioBlob,
      createdAt: Date.now(),
    }
    await saveVoice(voice)
    onSaved(voice)
    setIsSaving(false)
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, "0")}`
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="voice-name" className="text-sm font-medium">
            Voice name
          </Label>
          <Input
            id="voice-name"
            placeholder="e.g., Mom, Pastor James, My Voice"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-xl bg-card"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="voice-label" className="text-sm font-medium">
            Relationship (optional)
          </Label>
          <Input
            id="voice-label"
            placeholder="e.g., Family member, Friend, Self"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="rounded-xl bg-card"
          />
        </div>
      </div>

      {/* Recording area */}
      <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-muted/30 p-6">
        {!audioBlob ? (
          <>
            <button
              type="button"
              onClick={isRecording ? stopRecording : startRecording}
              className={`flex h-20 w-20 items-center justify-center rounded-full transition-all ${
                isRecording
                  ? "bg-destructive text-destructive-foreground animate-pulse"
                  : "bg-primary text-primary-foreground hover:opacity-90"
              }`}
              aria-label={isRecording ? "Stop recording" : "Start recording"}
            >
              {isRecording ? (
                <Square className="h-8 w-8" />
              ) : (
                <Mic className="h-8 w-8" />
              )}
            </button>
            <p className="text-sm text-muted-foreground">
              {isRecording
                ? `Recording... ${formatTime(recordingTime)}`
                : "Tap to record a voice sample"}
            </p>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={togglePreview}
              >
                {isPreviewPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
              <span className="text-sm text-muted-foreground">
                {formatTime(recordingTime)} recorded
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={resetRecording}
              >
                <RotateCcw className="h-4 w-4" />
                <span className="sr-only">Re-record</span>
              </Button>
            </div>
            <audio
              ref={audioRef}
              onEnded={() => setIsPreviewPlaying(false)}
              className="hidden"
            />
          </>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          disabled={!name.trim() || !audioBlob || isSaving}
          className="gap-2 rounded-full px-6"
        >
          <Save className="h-4 w-4" />
          {isSaving ? "Saving..." : "Save Voice"}
        </Button>
      </div>
    </div>
  )
}
