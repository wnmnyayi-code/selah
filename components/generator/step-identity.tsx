"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { X, Plus, User, Users, Heart } from "lucide-react"
import {
  EMOTIONAL_STATES,
  PRAYER_TYPES,
  type PrayerFormData,
} from "@/lib/prayer-types"

interface StepIdentityProps {
  formData: PrayerFormData
  onChange: (data: Partial<PrayerFormData>) => void
}

export function StepIdentity({ formData, onChange }: StepIdentityProps) {
  const [memberInput, setMemberInput] = useState("")

  const addFamilyMember = () => {
    const name = memberInput.trim()
    if (name && !formData.familyMembers.includes(name)) {
      onChange({ familyMembers: [...formData.familyMembers, name] })
      setMemberInput("")
    }
  }

  const removeFamilyMember = (name: string) => {
    onChange({
      familyMembers: formData.familyMembers.filter((m) => m !== name),
    })
  }

  const prayerTypeIcons: Record<string, React.ReactNode> = {
    self: <User className="h-5 w-5" />,
    family: <Heart className="h-5 w-5" />,
    group: <Users className="h-5 w-5" />,
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="font-serif text-2xl font-semibold text-foreground md:text-3xl">
          Tell us about yourself
        </h2>
        <p className="mt-2 text-muted-foreground leading-relaxed">
          Everything here is optional. Share only what feels right.
        </p>
      </div>

      {/* Prayer type selection */}
      <div className="flex flex-col gap-3">
        <Label className="text-sm font-medium text-foreground">
          Who is this prayer for?
        </Label>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {PRAYER_TYPES.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() =>
                onChange({
                  prayerType: type.value,
                  ...(type.value === "self" && {
                    familyMembers: [],
                    groupDescription: "",
                  }),
                })
              }
              className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all ${
                formData.prayerType === type.value
                  ? "border-primary bg-primary/5 text-foreground"
                  : "border-border bg-card text-foreground hover:border-primary/40"
              }`}
            >
              <span
                className={
                  formData.prayerType === type.value
                    ? "text-primary"
                    : "text-muted-foreground"
                }
              >
                {prayerTypeIcons[type.value]}
              </span>
              <span className="text-sm font-medium">{type.label}</span>
              <span className="text-xs text-muted-foreground leading-relaxed">
                {type.description}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Family members input */}
      {formData.prayerType === "family" && (
        <div className="flex flex-col gap-3 animate-fade-in-up">
          <Label className="text-sm font-medium text-foreground">
            Family members to include
          </Label>
          <div className="flex gap-2">
            <Input
              placeholder="Enter a name..."
              value={memberInput}
              onChange={(e) => setMemberInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  addFamilyMember()
                }
              }}
              className="flex-1 rounded-xl bg-card"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={addFamilyMember}
              disabled={!memberInput.trim()}
              className="rounded-xl"
            >
              <Plus className="h-4 w-4" />
              <span className="sr-only">Add family member</span>
            </Button>
          </div>
          {formData.familyMembers.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.familyMembers.map((member) => (
                <span
                  key={member}
                  className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-sm text-foreground"
                >
                  {member}
                  <button
                    type="button"
                    onClick={() => removeFamilyMember(member)}
                    className="rounded-full p-0.5 hover:bg-primary/20"
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove {member}</span>
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Group description */}
      {formData.prayerType === "group" && (
        <div className="flex flex-col gap-2 animate-fade-in-up">
          <Label className="text-sm font-medium text-foreground">
            Describe the group
          </Label>
          <Textarea
            placeholder="e.g., Our Sunday congregation, my Bible study group, our meditation circle..."
            value={formData.groupDescription}
            onChange={(e) => onChange({ groupDescription: e.target.value })}
            className="min-h-[80px] rounded-xl bg-card"
          />
        </div>
      )}

      {/* Name input */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="name" className="text-sm font-medium text-foreground">
          Your name (optional)
        </Label>
        <Input
          id="name"
          placeholder="How should we address you?"
          value={formData.name}
          onChange={(e) => onChange({ name: e.target.value })}
          className="rounded-xl bg-card"
        />
      </div>

      {/* Emotional state */}
      <div className="flex flex-col gap-3">
        <Label className="text-sm font-medium text-foreground">
          How are you feeling?
        </Label>
        <div className="flex flex-wrap gap-2">
          {EMOTIONAL_STATES.map((state) => (
            <button
              key={state.value}
              type="button"
              onClick={() =>
                onChange({
                  emotionalState:
                    formData.emotionalState === state.value ? "" : state.value,
                  customEmotion: "",
                })
              }
              className={`rounded-full border px-4 py-2 text-sm transition-all ${
                formData.emotionalState === state.value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:border-primary/40"
              }`}
            >
              {state.label}
            </button>
          ))}
        </div>
        <Input
          placeholder="Or describe how you feel..."
          value={formData.customEmotion}
          onChange={(e) =>
            onChange({ customEmotion: e.target.value, emotionalState: "" })
          }
          className="mt-1 rounded-xl bg-card"
        />
      </div>
    </div>
  )
}
