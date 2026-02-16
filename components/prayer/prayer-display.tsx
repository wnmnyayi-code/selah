"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Check, Pencil, Save, RotateCcw } from "lucide-react"

interface PrayerDisplayProps {
  prayer: string
  onPrayerChange: (newPrayer: string) => void
}

export function PrayerDisplay({ prayer, onPrayerChange }: PrayerDisplayProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(prayer)
  const [copied, setCopied] = useState(false)
  const [originalPrayer] = useState(prayer)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prayer)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSave = () => {
    onPrayerChange(editText)
    setIsEditing(false)
  }

  const handleRestore = () => {
    setEditText(originalPrayer)
    onPrayerChange(originalPrayer)
    setIsEditing(false)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-xl font-semibold text-foreground">
          Your Prayer
        </h2>
        <div className="flex items-center gap-2">
          {!isEditing ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setEditText(prayer)
                  setIsEditing(true)
                }}
                className="gap-1.5 text-muted-foreground"
              >
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="gap-1.5 text-muted-foreground"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-primary" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copy
                  </>
                )}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRestore}
                className="gap-1.5 text-muted-foreground"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Restore
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                className="gap-1.5 rounded-full"
              >
                <Save className="h-3.5 w-3.5" />
                Save
              </Button>
            </>
          )}
        </div>
      </div>

      {isEditing ? (
        <Textarea
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="min-h-[300px] rounded-xl bg-card font-serif text-base leading-relaxed"
        />
      ) : (
        <div className="rounded-xl border border-border bg-card p-8">
          {prayer.split("\n").map((paragraph, i) => (
            <p
              key={i}
              className={`font-serif text-base leading-relaxed text-foreground ${
                paragraph.trim() === "" ? "h-4" : "mb-4 last:mb-0"
              }`}
            >
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
