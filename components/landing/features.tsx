import { Heart, Shield, Globe, Volume2, Pencil, Clock } from "lucide-react"

const features = [
  {
    icon: Heart,
    title: "Deeply Personal",
    description:
      "Every prayer is uniquely crafted based on your faith tradition, emotional state, and personal intentions.",
  },
  {
    icon: Globe,
    title: "All Faiths Welcome",
    description:
      "Christianity, Islam, Judaism, Hinduism, Buddhism, African Spirituality, nature-centered beliefs, and more.",
  },
  {
    icon: Volume2,
    title: "Listen or Read",
    description:
      "Experience your prayer as text you can edit, or hear it spoken aloud with natural voice synthesis.",
  },
  {
    icon: Shield,
    title: "Respectful & Safe",
    description:
      "No judgment, no exclusion. Every prayer is compassionate, original, and never attacks other beliefs.",
  },
  {
    icon: Pencil,
    title: "Fully Editable",
    description:
      "Your prayer is yours. Edit, save, copy, or share it however you choose.",
  },
  {
    icon: Clock,
    title: "Your Length, Your Pace",
    description:
      "Choose from short reflections, medium prayers, or extended meditations to match your moment.",
  },
]

export function Features() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
            Features
          </p>
          <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl text-balance">
            Crafted with care for every soul
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
