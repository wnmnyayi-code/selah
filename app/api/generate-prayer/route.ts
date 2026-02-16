import { generateText } from "ai"
import {
  RELIGIONS,
  SPIRITUAL_PATHS,
  EMOTIONAL_STATES,
  PRAYER_INTENTIONS,
  TONES,
  PRAYER_LENGTHS,
} from "@/lib/prayer-types"
import { getRelevantScripture } from "@/lib/scriptures"

function getBeliefContext(
  beliefType: string,
  beliefValue: string,
  customBelief: string
) {
  if (beliefType === "religion") {
    const religion = RELIGIONS.find((r) => r.value === beliefValue)
    if (religion)
      return {
        tradition: religion.label,
        address: religion.address,
      }
  }
  if (beliefType === "spiritual") {
    const path = SPIRITUAL_PATHS.find((p) => p.value === beliefValue)
    if (path)
      return {
        tradition: path.label,
        address: path.address,
      }
  }
  if (beliefType === "custom" && customBelief) {
    return {
      tradition: "Custom spiritual belief",
      address: "the Sacred",
      customDescription: customBelief,
    }
  }
  return { tradition: "Universal", address: "the Divine" }
}

function getEmotionLabel(emotionalState: string, customEmotion: string) {
  if (customEmotion) return customEmotion
  return (
    EMOTIONAL_STATES.find((e) => e.value === emotionalState)?.label ||
    "reflective"
  )
}

function getIntentionLabel(intention: string, customIntention: string) {
  if (customIntention) return customIntention
  return (
    PRAYER_INTENTIONS.find((i) => i.value === intention)?.label || "guidance"
  )
}

function getToneLabel(tone: string) {
  return TONES.find((t) => t.value === tone)?.label || "Poetic"
}

function getLengthGuidance(length: string) {
  const l = PRAYER_LENGTHS.find((pl) => pl.value === length)
  if (!l) return "4-6 paragraphs"
  switch (l.value) {
    case "short":
      return "2-3 short paragraphs (about 80-120 words)"
    case "medium":
      return "4-5 paragraphs (about 150-250 words)"
    case "extended":
      return "6-8 paragraphs (about 300-450 words)"
    default:
      return "4-5 paragraphs"
  }
}

export async function POST(req: Request) {
  const body = await req.json()

  const {
    name,
    beliefType,
    beliefValue,
    customBelief,
    emotionalState,
    customEmotion,
    intention,
    customIntention,
    tone,
    length,
    prayerType = "self",
    familyMembers = [],
    groupDescription = "",
  } = body

  const belief = getBeliefContext(beliefType, beliefValue, customBelief)
  const emotion = getEmotionLabel(emotionalState, customEmotion)
  const intentionText = getIntentionLabel(intention, customIntention)
  const toneText = getToneLabel(tone)
  const lengthGuidance = getLengthGuidance(length)

  // Get relevant scripture
  const traditionKey = belief.tradition.toLowerCase().replace(/\s+/g, '-')
  const scripture = getRelevantScripture(traditionKey, emotionalState || customEmotion.toLowerCase(), intention || customIntention.toLowerCase())

  const nameInstruction = name
    ? `The person's name is ${name}. You may gently include their name in the prayer if it feels natural.`
    : "The person has chosen to remain anonymous."

  const beliefInstruction = belief.customDescription
    ? `Their spiritual beliefs are described as: "${belief.customDescription}". Respect and incorporate their personal spiritual worldview.`
    : `Their faith tradition is ${belief.tradition}. Address the divine as "${belief.address}" or similar respectful terms for this tradition.`

  let prayerTypeInstruction = "This is a personal prayer for one individual."
  if (prayerType === "family" && familyMembers.length > 0) {
    prayerTypeInstruction = `This is a FAMILY prayer. Include and mention these family members by name naturally throughout: ${familyMembers.join(", ")}. Use themes of togetherness, household blessing, family unity, and collective wellbeing. Use "we" and "our" language alongside personal references.`
  } else if (prayerType === "group") {
    prayerTypeInstruction = `This is a GROUP/COMMUNAL prayer for: ${groupDescription || "a spiritual community"}. Use communal language throughout ("we", "us", "our community"). Emphasize themes of unity, collective purpose, shared strength, and group harmony.`
  }

  const prompt = `You are a compassionate, respectful, and inclusive prayer composer. Generate a beautiful, original prayer with the following guidelines:

PRAYER CONTEXT:
- ${nameInstruction}
- ${beliefInstruction}
- ${prayerTypeInstruction}
- Their current emotional state: ${emotion}
- Their prayer intention: ${intentionText}
- Desired tone: ${toneText}
- Desired length: ${lengthGuidance}

PRAYER STRUCTURE (follow this template loosely):
1. Opening address (based on their belief tradition)
2. Gratitude or acknowledgment
3. Reflection on their current emotional state
4. The core intention or request
5. Words of guidance, strength, or comfort
6. Closing affirmation (peace, hope, resolve)

RULES:
- Create an ORIGINAL prayer. Do not quote copyrighted texts directly.
- Never attack, diminish, or compare other beliefs.
- Use compassionate, warm, and non-judgmental language.
- Incorporate cultural metaphors where appropriate (light, path, breath, river, shelter).
- Do not include any headers, labels, or meta-commentary. Output ONLY the prayer text itself.
- Make the prayer feel personal, sincere, and deeply human.
- Avoid absolute truth claims unless the user's tradition calls for it.
- Do not include any political or harmful content.

OUTPUT FORMAT:
Return your response in EXACTLY this format (keep the markers exactly as shown):

---PRAYER_START---
[The full prayer text here]
---PRAYER_END---`

  try {
    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      prompt,
      maxOutputTokens: 1500,
      temperature: 0.85,
      topP: 0.9,
    })

    const prayerMatch = text.match(
      /---PRAYER_START---\s*([\s\S]*?)\s*---PRAYER_END---/
    )

    const prayer = prayerMatch ? prayerMatch[1].trim() : text.trim()

    // Generate explanation for the selected scripture
    const scriptureExplanation = scripture ? 
      `This passage speaks to your current feelings of ${emotion.toLowerCase()} and your intention for ${intentionText.toLowerCase()}. It reminds us that even in moments of uncertainty, there is wisdom and guidance available to us.` : ""

    return Response.json({
      prayer,
      scriptureQuote: scripture?.text || "",
      scriptureSource: scripture?.source || "",
      scriptureExplanation,
    })
  } catch (error) {
    console.error("Prayer generation error:", error)
    return Response.json(
      { error: "Failed to generate prayer. Please try again." },
      { status: 500 }
    )
  }
}
