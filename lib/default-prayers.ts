export interface DefaultPrayer {
  id: string
  title: string
  text: string
  tradition: string
  emotion: string
  intention: string
  scripture?: {
    text: string
    source: string
  }
}

export const DEFAULT_PRAYERS: DefaultPrayer[] = [
  {
    id: "morning-christian",
    title: "Morning Prayer of Gratitude",
    text: "Heavenly Father, as I wake to this new day, I thank You for the gift of life and the blessings You have bestowed upon me. Guide my steps today, fill my heart with Your love, and help me to be a light to others. May Your peace surround me and Your wisdom direct my path. In Jesus' name, Amen.",
    tradition: "christianity",
    emotion: "grateful",
    intention: "gratitude",
    scripture: {
      text: "This is the day that the Lord has made; let us rejoice and be glad in it.",
      source: "Psalm 118:24"
    }
  },
  {
    id: "peace-buddhist",
    title: "Prayer for Inner Peace",
    text: "May I find peace within myself. May I be free from anger, fear, and anxiety. May I cultivate loving-kindness toward myself and others. May I live with compassion and understanding. May peace prevail on earth and in my heart.",
    tradition: "buddhism",
    emotion: "peaceful",
    intention: "peace",
    scripture: {
      text: "Peace comes from within. Do not seek it without.",
      source: "Dhammapada 202"
    }
  },
  {
    id: "healing-islam",
    title: "Prayer for Healing and Strength",
    text: "O Allah, Lord of all, I seek Your healing from all ailments of body and soul. Grant me strength to face my challenges and wisdom to learn from them. Surround me with Your mercy and guide me toward recovery and peace. You are the Most Merciful, the Most Compassionate.",
    tradition: "islam",
    emotion: "anxious",
    intention: "healing",
    scripture: {
      text: "And when I am ill, it is He who cures me.",
      source: "Quran 26:80"
    }
  },
  {
    id: "forgiveness-judaism",
    title: "Prayer of Forgiveness",
    text: "Eternal God, source of mercy and compassion, I come before You seeking forgiveness for my shortcomings and mistakes. Help me to forgive others as You have forgiven me. Grant me the strength to make amends and the wisdom to learn from my errors. May I walk in Your ways with a pure heart.",
    tradition: "judaism",
    emotion: "seeking-guidance",
    intention: "forgiveness",
    scripture: {
      text: "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.",
      source: "Ephesians 4:32"
    }
  },
  {
    id: "strength-hinduism",
    title: "Prayer for Courage and Strength",
    text: "O Divine Mother, source of all strength and courage, I seek Your blessing in this time of trial. Grant me the inner fortitude to face my challenges with grace. Help me remember that You are always with me, guiding and protecting. May I emerge stronger and wiser from this experience.",
    tradition: "hinduism",
    emotion: "anxious",
    intention: "strength",
    scripture: {
      text: "You have the right to perform your prescribed duties, but you are not entitled to the fruits of your actions.",
      source: "Bhagavad Gita 2:47"
    }
  },
  {
    id: "gratitude-sikh",
    title: "Prayer of Thankfulness",
    text: "Waheguru, I bow before Your divine presence with a heart full of gratitude. Thank You for the countless blessings You have bestowed upon me - for my family, my health, and the opportunities before me. Help me to serve others with the same love You have shown me. May I always remember Your grace.",
    tradition: "sikhism",
    emotion: "grateful",
    intention: "gratitude",
    scripture: {
      text: "Truth is high, but higher still is truthful living.",
      source: "Guru Granth Sahib"
    }
  },
  {
    id: "guidance-african",
    title: "Prayer for Ancestral Guidance",
    text: "Ancestors, wise elders who have walked before me, I call upon your wisdom and guidance. Light my path through uncertain times. Share with me the strength of those who came before. Help me honor your legacy while forging my own way. May your spirits guide and protect me.",
    tradition: "african-spirituality",
    emotion: "seeking-guidance",
    intention: "wisdom",
    scripture: {
      text: "I am because we are, and since we are, therefore I am.",
      source: "African Proverb"
    }
  },
  {
    id: "mourning-universal",
    title: "Prayer for Comfort in Loss",
    text: "Divine Spirit, in this time of sorrow and loss, wrap me in Your comforting embrace. Help me find peace amidst the pain, and strength to carry on. May I honor the love I shared and find solace in cherished memories. Grant me hope for healing and the courage to face each new day.",
    tradition: "universal",
    emotion: "mourning",
    intention: "healing",
    scripture: {
      text: "The best way to predict the future is to create it.",
      source: "Peter Drucker"
    }
  },
  {
    id: "success-christian",
    title: "Prayer for Achievement and Purpose",
    text: "Lord Jesus, as I work toward my goals and dreams, guide my efforts and bless my endeavors. Help me to use my talents for good and to serve others through my achievements. May I find fulfillment not just in success, but in living out Your purpose for my life. Grant me wisdom, perseverance, and gratitude.",
    tradition: "christianity",
    emotion: "hopeful",
    intention: "success",
    scripture: {
      text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
      source: "Jeremiah 29:11"
    }
  },
  {
    id: "meditation-buddhist",
    title: "Evening Meditation Prayer",
    text: "As the day comes to a close, I sit in stillness and reflect on the moments that have passed. May I release what no longer serves me and carry forward only love and wisdom. May my mind be peaceful, my heart be open, and my spirit be renewed. I am grateful for this day and all it has taught me.",
    tradition: "buddhism",
    emotion: "peaceful",
    intention: "peace",
    scripture: {
      text: "All that we are is the result of what we have thought. The mind is everything. What we think we become.",
      source: "Dhammapada 1:1"
    }
  },
  {
    id: "family-blessing-islam",
    title: "Prayer for Family Protection",
    text: "O Allah, protect my family from all harm and difficulties. Bless them with health, happiness, and harmony. Guide us all in Your path and strengthen the bonds of love between us. May our home be filled with Your peace and mercy. Keep us united in faith and devotion to You.",
    tradition: "islam",
    emotion: "hopeful",
    intention: "protection",
    scripture: {
      text: "And whoever relies upon Allah - then He is sufficient for him.",
      source: "Quran 65:3"
    }
  },
  {
    id: "wisdom-judaism",
    title: "Prayer for Wisdom and Understanding",
    text: "Eternal One, source of all wisdom, grant me understanding and insight. Help me to discern right from wrong and to make choices that honor You and benefit others. May I grow in knowledge and use it wisely. Guide me in studying Your teachings and applying them to my life.",
    tradition: "judaism",
    emotion: "seeking-guidance",
    intention: "wisdom",
    scripture: {
      text: "Trust in the Lord with all your heart and lean not on your own understanding.",
      source: "Proverbs 3:5"
    }
  }
]

export function getDefaultPrayersByTradition(tradition: string): DefaultPrayer[] {
  return DEFAULT_PRAYERS.filter(prayer => prayer.tradition === tradition)
}

export function getDefaultPrayersByEmotion(emotion: string): DefaultPrayer[] {
  return DEFAULT_PRAYERS.filter(prayer => prayer.emotion === emotion)
}

export function getDefaultPrayersByIntention(intention: string): DefaultPrayer[] {
  return DEFAULT_PRAYERS.filter(prayer => prayer.intention === intention)
}

export function getRandomDefaultPrayers(count: number = 3): DefaultPrayer[] {
  const shuffled = [...DEFAULT_PRAYERS].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}