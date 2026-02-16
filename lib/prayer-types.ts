export const RELIGIONS = [
  { value: "christianity", label: "Christianity", address: "God / Lord" },
  { value: "islam", label: "Islam", address: "Allah" },
  { value: "judaism", label: "Judaism", address: "HaShem" },
  { value: "hinduism", label: "Hinduism", address: "The Divine" },
  { value: "buddhism", label: "Buddhism", address: "Inner wisdom" },
  { value: "african-spirituality", label: "African Spirituality", address: "Ancestors" },
  { value: "sikhism", label: "Sikhism", address: "Waheguru" },
] as const

export const SPIRITUAL_PATHS = [
  { value: "ancestor-based", label: "Ancestor-based", address: "Ancestors" },
  { value: "nature-centered", label: "Nature-centered", address: "Mother Earth / Universe" },
  { value: "universal-cosmic", label: "Universal / Cosmic", address: "Universe / Creator" },
  { value: "inner-self-mindfulness", label: "Inner-self / Mindfulness", address: "Inner light" },
] as const

export const EMOTIONAL_STATES = [
  { value: "grateful", label: "Grateful" },
  { value: "anxious", label: "Anxious" },
  { value: "mourning", label: "Mourning" },
  { value: "hopeful", label: "Hopeful" },
  { value: "seeking-guidance", label: "Seeking Guidance" },
  { value: "peaceful", label: "Peaceful" },
] as const

export const PRAYER_INTENTIONS = [
  { value: "gratitude", label: "Gratitude" },
  { value: "protection", label: "Protection" },
  { value: "healing", label: "Healing" },
  { value: "forgiveness", label: "Forgiveness" },
  { value: "strength", label: "Strength" },
  { value: "wisdom", label: "Wisdom" },
  { value: "success", label: "Success" },
  { value: "peace", label: "Peace" },
] as const

export const TONES = [
  { value: "formal", label: "Formal / Sacred" },
  { value: "conversational", label: "Conversational" },
  { value: "poetic", label: "Poetic" },
] as const

export const PRAYER_LENGTHS = [
  { value: "short", label: "Short", description: "A brief moment of reflection" },
  { value: "medium", label: "Medium", description: "A heartfelt prayer" },
  { value: "extended", label: "Extended", description: "A deep, contemplative prayer" },
] as const

export const PRAYER_TYPES = [
  {
    value: "self",
    label: "Just Me",
    description: "A personal prayer for yourself",
  },
  {
    value: "family",
    label: "My Family",
    description: "A prayer that includes your family members",
  },
  {
    value: "group",
    label: "A Group",
    description: "A communal prayer for a congregation or community",
  },
] as const

export interface PrayerFormData {
  prayerType: "self" | "family" | "group"
  familyMembers: string[]
  groupDescription: string
  name: string
  beliefType: "religion" | "spiritual" | "custom"
  beliefValue: string
  customBelief: string
  emotionalState: string
  customEmotion: string
  intention: string
  customIntention: string
  tone: string
  length: string
}

export const defaultFormData: PrayerFormData = {
  prayerType: "self",
  familyMembers: [],
  groupDescription: "",
  name: "",
  beliefType: "religion",
  beliefValue: "",
  customBelief: "",
  emotionalState: "",
  customEmotion: "",
  intention: "",
  customIntention: "",
  tone: "poetic",
  length: "medium",
}
