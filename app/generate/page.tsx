"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react"
import { StepIdentity } from "@/components/generator/step-identity"
import { StepBelief } from "@/components/generator/step-belief"
import { StepIntention } from "@/components/generator/step-intention"
import { defaultFormData, type PrayerFormData } from "@/lib/prayer-types"

const STEPS = [
  { id: "identity", label: "About You" },
  { id: "belief", label: "Your Faith" },
  { id: "intention", label: "Your Intention" },
]

export default function GeneratePage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<PrayerFormData>(defaultFormData)
  const [isGenerating, setIsGenerating] = useState(false)

  const updateFormData = (updates: Partial<PrayerFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }))
  }

  const canProceed = () => {
    switch (step) {
      case 0:
        return true // Identity is all optional
      case 1:
        return (
          formData.beliefValue !== "" ||
          formData.customBelief.trim() !== ""
        )
      case 2:
        return (
          formData.intention !== "" ||
          formData.customIntention.trim() !== ""
        )
      default:
        return false
    }
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch("/api/generate-prayer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      if (data.prayer) {
        // Store the prayer temporarily in sessionStorage
        sessionStorage.setItem(
          "generatedPrayer",
          JSON.stringify({
            prayer: data.prayer,
            scriptureQuote: data.scriptureQuote || "",
            scriptureExplanation: data.scriptureExplanation || "",
            formData,
          })
        )
        router.push("/prayer")
      }
    } catch {
      // Show inline error
      setIsGenerating(false)
    }
  }

  const progress = ((step + 1) / STEPS.length) * 100

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md px-4 py-4">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <span className="font-serif text-lg font-semibold text-foreground">
            Selah
          </span>
          <span className="text-xs text-muted-foreground">
            Step {step + 1} of {STEPS.length}
          </span>
        </div>
      </header>

      {/* Progress */}
      <div className="mx-auto w-full max-w-2xl px-4 pt-6">
        <Progress value={progress} className="h-1.5" />
        <div className="mt-3 flex justify-between">
          {STEPS.map((s, i) => (
            <span
              key={s.id}
              className={`text-xs font-medium ${
                i <= step ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {s.label}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto w-full max-w-2xl flex-1 px-4 py-10">
        {step === 0 && (
          <StepIdentity formData={formData} onChange={updateFormData} />
        )}
        {step === 1 && (
          <StepBelief formData={formData} onChange={updateFormData} />
        )}
        {step === 2 && (
          <StepIntention formData={formData} onChange={updateFormData} />
        )}
      </div>

      {/* Navigation */}
      <div className="border-t border-border bg-background px-4 py-4">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setStep((s) => s - 1)}
            disabled={step === 0}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          {step < STEPS.length - 1 ? (
            <Button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canProceed()}
              className="gap-2 rounded-full px-6"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleGenerate}
              disabled={!canProceed() || isGenerating}
              className="gap-2 rounded-full px-6"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Prayer"
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
