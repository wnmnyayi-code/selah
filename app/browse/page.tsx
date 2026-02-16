"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, BookOpen, Heart, Shield, Lightbulb, Target, Users } from "lucide-react"
import { DEFAULT_PRAYERS, type DefaultPrayer } from "@/lib/default-prayers"
import { RELIGIONS, SPIRITUAL_PATHS, EMOTIONAL_STATES, PRAYER_INTENTIONS } from "@/lib/prayer-types"

const intentionIcons: Record<string, React.ReactNode> = {
  gratitude: <Heart className="h-4 w-4" />,
  protection: <Shield className="h-4 w-4" />,
  healing: <Heart className="h-4 w-4" />,
  forgiveness: <Heart className="h-4 w-4" />,
  strength: <Target className="h-4 w-4" />,
  wisdom: <Lightbulb className="h-4 w-4" />,
  success: <Target className="h-4 w-4" />,
  peace: <Heart className="h-4 w-4" />,
}

const emotionColors: Record<string, string> = {
  grateful: "bg-green-100 text-green-800",
  anxious: "bg-yellow-100 text-yellow-800",
  mourning: "bg-blue-100 text-blue-800",
  hopeful: "bg-purple-100 text-purple-800",
  "seeking-guidance": "bg-indigo-100 text-indigo-800",
  peaceful: "bg-teal-100 text-teal-800",
}

export default function BrowsePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTradition, setSelectedTradition] = useState<string>("all")
  const [selectedEmotion, setSelectedEmotion] = useState<string>("all")
  const [selectedIntention, setSelectedIntention] = useState<string>("all")

  const filteredPrayers = useMemo(() => {
    return DEFAULT_PRAYERS.filter(prayer => {
      const matchesSearch = prayer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           prayer.text.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesTradition = selectedTradition === "all" || prayer.tradition === selectedTradition
      const matchesEmotion = selectedEmotion === "all" || prayer.emotion === selectedEmotion
      const matchesIntention = selectedIntention === "all" || prayer.intention === selectedIntention

      return matchesSearch && matchesTradition && matchesEmotion && matchesIntention
    })
  }, [searchTerm, selectedTradition, selectedEmotion, selectedIntention])

  const getTraditionLabel = (tradition: string) => {
    if (tradition === "universal") return "Universal"
    const religion = RELIGIONS.find(r => r.value === tradition)
    if (religion) return religion.label
    const path = SPIRITUAL_PATHS.find(p => p.value === tradition)
    if (path) return path.label
    return tradition
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="font-serif text-3xl font-semibold text-foreground md:text-4xl">
            Browse Prayers
          </h1>
          <p className="mt-2 text-muted-foreground">
            Explore our collection of carefully crafted prayers from various spiritual traditions.
            Find inspiration or use them as starting points for your own spiritual practice.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search prayers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-full"
            />
          </div>

          <Select value={selectedTradition} onValueChange={setSelectedTradition}>
            <SelectTrigger className="w-full md:w-48 rounded-full">
              <SelectValue placeholder="All Traditions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Traditions</SelectItem>
              {RELIGIONS.map((religion) => (
                <SelectItem key={religion.value} value={religion.value}>
                  {religion.label}
                </SelectItem>
              ))}
              {SPIRITUAL_PATHS.map((path) => (
                <SelectItem key={path.value} value={path.value}>
                  {path.label}
                </SelectItem>
              ))}
              <SelectItem value="universal">Universal</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedEmotion} onValueChange={setSelectedEmotion}>
            <SelectTrigger className="w-full md:w-48 rounded-full">
              <SelectValue placeholder="All Emotions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Emotions</SelectItem>
              {EMOTIONAL_STATES.map((emotion) => (
                <SelectItem key={emotion.value} value={emotion.value}>
                  {emotion.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedIntention} onValueChange={setSelectedIntention}>
            <SelectTrigger className="w-full md:w-48 rounded-full">
              <SelectValue placeholder="All Intentions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Intentions</SelectItem>
              {PRAYER_INTENTIONS.map((intention) => (
                <SelectItem key={intention.value} value={intention.value}>
                  {intention.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            {filteredPrayers.length} prayer{filteredPrayers.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Prayers grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPrayers.map((prayer) => (
            <Card key={prayer.id} className="group hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="font-serif text-lg leading-tight mb-2">
                      {prayer.title}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {getTraditionLabel(prayer.tradition)}
                    </CardDescription>
                  </div>
                  <div className="flex gap-1 ml-2">
                    <Badge variant="secondary" className={`text-xs ${emotionColors[prayer.emotion] || 'bg-gray-100 text-gray-800'}`}>
                      {EMOTIONAL_STATES.find(e => e.value === prayer.emotion)?.label || prayer.emotion}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
                  {prayer.text}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    {intentionIcons[prayer.intention] || <BookOpen className="h-3 w-3" />}
                    {PRAYER_INTENTIONS.find(i => i.value === prayer.intention)?.label || prayer.intention}
                  </div>

                  <Button asChild size="sm" variant="outline" className="rounded-full">
                    <Link href={`/prayer/${prayer.id}`}>
                      View Prayer
                    </Link>
                  </Button>
                </div>

                {prayer.scripture && (
                  <div className="mt-3 pt-3 border-t border-border/50">
                    <p className="text-xs italic text-muted-foreground line-clamp-2">
                      "{prayer.scripture.text}"
                    </p>
                    <p className="text-xs text-primary mt-1">
                      {prayer.scripture.source}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPrayers.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-serif text-lg font-medium text-foreground mb-2">
              No prayers found
            </h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or browse all prayers.
            </p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedTradition("all")
                setSelectedEmotion("all")
                setSelectedIntention("all")
              }}
              variant="outline"
              className="rounded-full"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Call to action */}
        <div className="mt-12 text-center">
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              Create Your Own Prayer
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Use our AI-powered prayer generator to create personalized prayers based on your unique emotions,
              beliefs, and intentions. Every prayer is crafted with care and respect for all spiritual traditions.
            </p>
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/generate">Generate Prayer</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}