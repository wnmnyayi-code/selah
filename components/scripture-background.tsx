"use client"

import { useEffect, useState } from "react"

const SCRIPTURE_BACKGROUNDS = [
  {
    text: "Be still, and know that I am God.",
    source: "Psalm 46:10",
    tradition: "Christianity"
  },
  {
    text: "In the name of Allah, the Most Gracious, the Most Merciful.",
    source: "Quran 1:1",
    tradition: "Islam"
  },
  {
    text: "Hear, O Israel: The Lord our God, the Lord is one.",
    source: "Deuteronomy 6:4",
    tradition: "Judaism"
  },
  {
    text: "You are what your deep, driving desire is.",
    source: "Brihadaranyaka Upanishad",
    tradition: "Hinduism"
  },
  {
    text: "All that we are is the result of what we have thought.",
    source: "Dhammapada 1:1",
    tradition: "Buddhism"
  },
  {
    text: "Truth is high, but higher still is truthful living.",
    source: "Guru Granth Sahib",
    tradition: "Sikhism"
  },
  {
    text: "I am because we are, and since we are, therefore I am.",
    source: "African Proverb",
    tradition: "African Spirituality"
  },
  {
    text: "The best way to predict the future is to create it.",
    source: "Peter Drucker",
    tradition: "Universal Wisdom"
  },
  {
    text: "Peace comes from within. Do not seek it without.",
    source: "Dhammapada 202",
    tradition: "Buddhism"
  },
  {
    text: "And whoever relies upon Allah - then He is sufficient for him.",
    source: "Quran 65:3",
    tradition: "Islam"
  }
]

export function ScriptureBackground() {
  const [scriptures, setScriptures] = useState<typeof SCRIPTURE_BACKGROUNDS>([])

  useEffect(() => {
    // Randomly select 6 scriptures for background
    const shuffled = [...SCRIPTURE_BACKGROUNDS].sort(() => 0.5 - Math.random())
    setScriptures(shuffled.slice(0, 6))
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/10" />

      {/* Scripture quotes */}
      {scriptures.map((scripture, index) => (
        <div
          key={index}
          className={`absolute opacity-10 text-primary/30 font-serif text-sm leading-relaxed max-w-xs transform ${
            index === 0 ? 'top-20 left-10 rotate-3' :
            index === 1 ? 'top-40 right-20 -rotate-2' :
            index === 2 ? 'top-1/3 left-1/4 rotate-1' :
            index === 3 ? 'bottom-40 left-20 -rotate-3' :
            index === 4 ? 'bottom-1/3 right-1/4 rotate-2' :
            'top-2/3 right-10 -rotate-1'
          }`}
          style={{
            animation: `float-${index} ${15 + index * 2}s ease-in-out infinite`,
          }}
        >
          <p className="mb-1">"{scripture.text}"</p>
          <p className="text-xs opacity-75">{scripture.source}</p>
        </div>
      ))}

      {/* Floating animation styles */}
      <style jsx>{`
        @keyframes float-0 {
          0%, 100% { transform: translateY(0px) rotate(3deg); }
          50% { transform: translateY(-10px) rotate(3deg); }
        }
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-15px) rotate(-2deg); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) rotate(1deg); }
          50% { transform: translateY(-8px) rotate(1deg); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translateY(0px) rotate(-3deg); }
          50% { transform: translateY(-12px) rotate(-3deg); }
        }
        @keyframes float-4 {
          0%, 100% { transform: translateY(0px) rotate(2deg); }
          50% { transform: translateY(-6px) rotate(2deg); }
        }
        @keyframes float-5 {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50% { transform: translateY(-14px) rotate(-1deg); }
        }
      `}</style>
    </div>
  )
}