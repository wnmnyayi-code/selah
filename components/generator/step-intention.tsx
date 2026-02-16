"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  PRAYER_INTENTIONS,
  TONES,
  PRAYER_LENGTHS,
  type PrayerFormData,
} from "@/lib/prayer-types"

interface StepIntentionProps {
  formData: PrayerFormData
  onChange: (data: Partial<PrayerFormData>) => void
}

export function StepIntention({ formData, onChange }: StepIntentionProps) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="font-serif text-2xl font-semibold text-foreground md:text-3xl">
          Set your intention
        </h2>
        <p className="mt-2 text-muted-foreground leading-relaxed">
          What would you like your prayer to focus on?
        </p>
      </div>

      {/* Prayer intentions */}
      <div className="flex flex-col gap-3">
        <Label className="text-sm font-medium text-foreground">
          Prayer intention
        </Label>
        <div className="flex flex-wrap gap-2">
          {PRAYER_INTENTIONS.map((intention) => (
            <button
              key={intention.value}
              type="button"
              onClick={() =>
                onChange({
                  intention:
                    formData.intention === intention.value
                      ? ""
                      : intention.value,
                  customIntention: "",
                })
              }
              className={`rounded-full border px-4 py-2 text-sm transition-all ${
                formData.intention === intention.value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:border-primary/40"
              }`}
            >
              {intention.label}
            </button>
          ))}
        </div>
        <Input
          placeholder="Or type your own intention..."
          value={formData.customIntention}
          onChange={(e) =>
            onChange({ customIntention: e.target.value, intention: "" })
          }
          className="mt-1 rounded-xl bg-card"
        />
      </div>

      {/* Tone */}
      <div className="flex flex-col gap-3">
        <Label className="text-sm font-medium text-foreground">Tone</Label>
        <div className="flex flex-wrap gap-2">
          {TONES.map((tone) => (
            <button
              key={tone.value}
              type="button"
              onClick={() => onChange({ tone: tone.value })}
              className={`rounded-full border px-4 py-2 text-sm transition-all ${
                formData.tone === tone.value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:border-primary/40"
              }`}
            >
              {tone.label}
            </button>
          ))}
        </div>
      </div>

      {/* Length */}
      <div className="flex flex-col gap-3">
        <Label className="text-sm font-medium text-foreground">
          Prayer length
        </Label>
        <div className="grid gap-3 sm:grid-cols-3">
          {PRAYER_LENGTHS.map((length) => (
            <button
              key={length.value}
              type="button"
              onClick={() => onChange({ length: length.value })}
              className={`flex flex-col items-start rounded-xl border p-4 text-left transition-all ${
                formData.length === length.value
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "border-border bg-card hover:border-primary/30"
              }`}
            >
              <span className="text-sm font-semibold text-foreground">
                {length.label}
              </span>
              <span className="mt-0.5 text-xs text-muted-foreground">
                {length.description}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
