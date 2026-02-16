export interface Scripture {
  text: string
  source: string
  tradition: string
  themes: string[] // e.g., ['gratitude', 'healing', 'guidance']
  emotions: string[] // e.g., ['grateful', 'anxious', 'hopeful']
}

export const SCRIPTURES: Scripture[] = [
  // Christianity
  {
    text: "Be anxious for nothing, but in everything by prayer and supplication, with thanksgiving, let your requests be made known to God.",
    source: "Philippians 4:6 (NKJV)",
    tradition: "christianity",
    themes: ["anxiety", "prayer", "thanksgiving"],
    emotions: ["anxious", "worried"]
  },
  {
    text: "Come to me, all you who are weary and burdened, and I will give you rest.",
    source: "Matthew 11:28 (NIV)",
    tradition: "christianity",
    themes: ["rest", "comfort", "healing"],
    emotions: ["weary", "burdened", "mourning"]
  },
  {
    text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
    source: "Jeremiah 29:11 (NIV)",
    tradition: "christianity",
    themes: ["hope", "guidance", "future"],
    emotions: ["hopeful", "seeking-guidance"]
  },
  {
    text: "Give thanks to the Lord, for he is good; his love endures forever.",
    source: "Psalm 107:1 (NIV)",
    tradition: "christianity",
    themes: ["gratitude", "love", "praise"],
    emotions: ["grateful"]
  },
  {
    text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.",
    source: "John 14:27 (NIV)",
    tradition: "christianity",
    themes: ["peace", "comfort", "courage"],
    emotions: ["anxious", "peaceful"]
  },

  // Islam
  {
    text: "And when My servants ask you concerning Me, indeed I am near. I respond to the invocation of the supplicant when he calls upon Me.",
    source: "Quran 2:186",
    tradition: "islam",
    themes: ["prayer", "nearness", "response"],
    emotions: ["seeking-guidance", "hopeful"]
  },
  {
    text: "Indeed, with hardship comes ease. Indeed, with hardship comes ease.",
    source: "Quran 94:5-6",
    tradition: "islam",
    themes: ["ease", "hardship", "comfort"],
    emotions: ["anxious", "mourning", "weary"]
  },
  {
    text: "And whoever relies upon Allah - then He is sufficient for him. Indeed Allah will accomplish His purpose.",
    source: "Quran 65:3",
    tradition: "islam",
    themes: ["reliance", "sufficiency", "trust"],
    emotions: ["anxious", "seeking-guidance"]
  },
  {
    text: "All praise is due to Allah, Lord of the worlds.",
    source: "Quran 1:2",
    tradition: "islam",
    themes: ["praise", "gratitude", "lordship"],
    emotions: ["grateful"]
  },

  // Judaism
  {
    text: "The Lord is near to all who call on him, to all who call on him in truth.",
    source: "Psalm 145:18 (Tanakh)",
    tradition: "judaism",
    themes: ["nearness", "truth", "prayer"],
    emotions: ["seeking-guidance", "hopeful"]
  },
  {
    text: "Cast your burden upon the Lord, and He will sustain you; He will never allow the righteous to be shaken.",
    source: "Psalm 55:22 (Tanakh)",
    tradition: "judaism",
    themes: ["burden", "sustenance", "righteousness"],
    emotions: ["anxious", "weary", "mourning"]
  },
  {
    text: "Trust in the Lord with all your heart and lean not on your own understanding.",
    source: "Proverbs 3:5 (Tanakh)",
    tradition: "judaism",
    themes: ["trust", "understanding", "guidance"],
    emotions: ["seeking-guidance"]
  },

  // Hinduism
  {
    text: "You have the right to perform your prescribed duties, but you are not entitled to the fruits of your actions.",
    source: "Bhagavad Gita 2:47",
    tradition: "hinduism",
    themes: ["duty", "detachment", "action"],
    emotions: ["seeking-guidance", "anxious"]
  },
  {
    text: "Perform your duty without attachment to the results, for by working without attachment one attains the Supreme.",
    source: "Bhagavad Gita 3:19",
    tradition: "hinduism",
    themes: ["duty", "detachment", "supreme"],
    emotions: ["hopeful", "peaceful"]
  },
  {
    text: "The soul is neither born, nor does it die; nor having been, does it cease to be.",
    source: "Bhagavad Gita 2:20",
    tradition: "hinduism",
    themes: ["soul", "eternal", "comfort"],
    emotions: ["mourning", "grateful"]
  },

  // Buddhism
  {
    text: "All that we are is the result of what we have thought. The mind is everything. What we think we become.",
    source: "Dhammapada 1:1",
    tradition: "buddhism",
    themes: ["mind", "thought", "becoming"],
    emotions: ["seeking-guidance", "reflective"]
  },
  {
    text: "Peace comes from within. Do not seek it without.",
    source: "Dhammapada 202",
    tradition: "buddhism",
    themes: ["peace", "within", "seeking"],
    emotions: ["anxious", "peaceful"]
  },
  {
    text: "Hatred does not cease by hatred, but only by love; this is the eternal rule.",
    source: "Dhammapada 1:5",
    tradition: "buddhism",
    themes: ["hatred", "love", "eternal"],
    emotions: ["anxious", "hopeful"]
  },

  // Sikhism
  {
    text: "There is no Hindu, no Muslim, only one brotherhood of man.",
    source: "Guru Granth Sahib",
    tradition: "sikhism",
    themes: ["unity", "brotherhood", "equality"],
    emotions: ["grateful", "hopeful"]
  },
  {
    text: "Truth is high, but higher still is truthful living.",
    source: "Guru Granth Sahib",
    tradition: "sikhism",
    themes: ["truth", "living", "integrity"],
    emotions: ["seeking-guidance"]
  },

  // African Spirituality
  {
    text: "I am because we are, and since we are, therefore I am.",
    source: "African Proverb",
    tradition: "african-spirituality",
    themes: ["community", "existence", "unity"],
    emotions: ["grateful", "peaceful"]
  },
  {
    text: "The child of a snake is a snake.",
    source: "African Proverb",
    tradition: "african-spirituality",
    themes: ["heritage", "ancestry", "wisdom"],
    emotions: ["seeking-guidance"]
  },

  // Universal/Spiritual
  {
    text: "The only reason for time is so that everything doesn't happen at once.",
    source: "Albert Einstein",
    tradition: "universal",
    themes: ["time", "patience", "understanding"],
    emotions: ["anxious", "hopeful"]
  },
  {
    text: "The best way to predict the future is to create it.",
    source: "Peter Drucker",
    tradition: "universal",
    themes: ["future", "creation", "action"],
    emotions: ["hopeful", "seeking-guidance"]
  },
  {
    text: "In the middle of difficulty lies opportunity.",
    source: "Albert Einstein",
    tradition: "universal",
    themes: ["difficulty", "opportunity", "resilience"],
    emotions: ["anxious", "weary"]
  }
]

export function getRelevantScripture(
  tradition: string,
  emotion: string,
  intention: string
): Scripture | null {
  // First try to match tradition, emotion, and intention
  let candidates = SCRIPTURES.filter(s =>
    s.tradition.toLowerCase() === tradition.toLowerCase() &&
    (s.emotions.includes(emotion) || s.themes.includes(intention))
  )

  if (candidates.length === 0) {
    // Fallback to tradition and emotion
    candidates = SCRIPTURES.filter(s =>
      s.tradition.toLowerCase() === tradition.toLowerCase() &&
      s.emotions.includes(emotion)
    )
  }

  if (candidates.length === 0) {
    // Fallback to tradition and intention
    candidates = SCRIPTURES.filter(s =>
      s.tradition.toLowerCase() === tradition.toLowerCase() &&
      s.themes.includes(intention)
    )
  }

  if (candidates.length === 0) {
    // Fallback to universal
    candidates = SCRIPTURES.filter(s => s.tradition === "universal")
  }

  if (candidates.length === 0) {
    return null
  }

  // Return random candidate
  return candidates[Math.floor(Math.random() * candidates.length)]
}