"use client"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  RELIGIONS,
  SPIRITUAL_PATHS,
  type PrayerFormData,
} from "@/lib/prayer-types"

interface StepBeliefProps {
  formData: PrayerFormData
  onChange: (data: Partial<PrayerFormData>) => void
}

export function StepBelief({ formData, onChange }: StepBeliefProps) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="font-serif text-2xl font-semibold text-foreground md:text-3xl">
          Your faith or belief
        </h2>
        <p className="mt-2 text-muted-foreground leading-relaxed">
          Choose the tradition that resonates with you, or describe your own
          spiritual path.
        </p>
      </div>

      {/* Belief type selector */}
      <div className="flex gap-2">
        {(
          [
            { value: "religion", label: "Religious" },
            { value: "spiritual", label: "Spiritual" },
            { value: "custom", label: "My Own Path" },
          ] as const
        ).map((type) => (
          <button
            key={type.value}
            type="button"
            onClick={() =>
              onChange({ beliefType: type.value, beliefValue: "" })
            }
            className={`rounded-full border px-5 py-2 text-sm font-medium transition-all ${
              formData.beliefType === type.value
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground hover:border-primary/40"
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Religion options */}
      {formData.beliefType === "religion" && (
        <div className="flex flex-col gap-3">
          <Label className="text-sm font-medium text-foreground">
            Select your tradition
          </Label>
          <div className="grid gap-3 sm:grid-cols-2">
            {RELIGIONS.map((religion) => (
              <button
                key={religion.value}
                type="button"
                onClick={() => onChange({ beliefValue: religion.value })}
                className={`flex flex-col items-start rounded-xl border p-4 text-left transition-all ${
                  formData.beliefValue === religion.value
                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                    : "border-border bg-card hover:border-primary/30"
                }`}
              >
                <span className="text-sm font-semibold text-foreground">
                  {religion.label}
                </span>
                <span className="mt-0.5 text-xs text-muted-foreground">
                  Addressed to {religion.address}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Spiritual paths */}
      {formData.beliefType === "spiritual" && (
        <div className="flex flex-col gap-3">
          <Label className="text-sm font-medium text-foreground">
            Select your spiritual path
          </Label>
          <div className="grid gap-3 sm:grid-cols-2">
            {SPIRITUAL_PATHS.map((path) => (
              <button
                key={path.value}
                type="button"
                onClick={() => onChange({ beliefValue: path.value })}
                className={`flex flex-col items-start rounded-xl border p-4 text-left transition-all ${
                  formData.beliefValue === path.value
                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                    : "border-border bg-card hover:border-primary/30"
                }`}
              >
                <span className="text-sm font-semibold text-foreground">
                  {path.label}
                </span>
                <span className="mt-0.5 text-xs text-muted-foreground">
                  Addressed to {path.address}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Custom belief */}
      {formData.beliefType === "custom" && (
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium text-foreground">
            Describe your beliefs in your own words
          </Label>
          <Textarea
            placeholder="I believe in the interconnectedness of all things..."
            value={formData.customBelief}
            onChange={(e) => onChange({ customBelief: e.target.value })}
            className="min-h-[120px] rounded-xl bg-card"
          />
        </div>
      )}
    </div>
  )
}
