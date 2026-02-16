const beliefs = [
  { name: "Christianity", description: "Prayers to God / Lord" },
  { name: "Islam", description: "Prayers to Allah" },
  { name: "Judaism", description: "Prayers to HaShem" },
  { name: "Hinduism", description: "Prayers to the Divine" },
  { name: "Buddhism", description: "Meditative reflections" },
  { name: "African Spirituality", description: "Ancestral prayers" },
  { name: "Sikhism", description: "Prayers to Waheguru" },
  { name: "Nature-Centered", description: "Earth & universe connection" },
  { name: "Mindfulness", description: "Inner-self reflections" },
  { name: "Universal", description: "Cosmic spiritual prayers" },
]

export function BeliefsSection() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
            Inclusive
          </p>
          <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl text-balance">
            Every tradition honored
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            We respect all paths to the sacred. Choose your tradition, or
            describe your own unique spiritual journey.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {beliefs.map((belief) => (
            <div
              key={belief.name}
              className="group flex flex-col items-center rounded-xl border border-border bg-card px-6 py-4 text-center transition-all duration-300 hover:border-primary/30 hover:shadow-md"
            >
              <span className="text-sm font-semibold text-foreground">
                {belief.name}
              </span>
              <span className="mt-1 text-xs text-muted-foreground">
                {belief.description}
              </span>
            </div>
          ))}
          <div className="flex flex-col items-center rounded-xl border border-dashed border-primary/40 bg-primary/5 px-6 py-4 text-center">
            <span className="text-sm font-semibold text-primary">
              {"+ Your Own Path"}
            </span>
            <span className="mt-1 text-xs text-muted-foreground">
              Describe your beliefs
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
