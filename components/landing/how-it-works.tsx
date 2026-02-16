const steps = [
  {
    number: "01",
    title: "Share Your Heart",
    description:
      "Tell us about your faith or spiritual tradition, how you're feeling, and what's on your mind. Everything is optional - share only what feels right.",
  },
  {
    number: "02",
    title: "Set Your Intention",
    description:
      "Choose a prayer intention - gratitude, healing, protection, guidance, or anything else. You can write a custom intention in your own words.",
  },
  {
    number: "03",
    title: "Receive Your Prayer",
    description:
      "A unique, personalized prayer is generated for you. Read it, edit it, listen to it spoken aloud, or save it for later.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-4 py-24 bg-secondary/50">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
            Simple & Sincere
          </p>
          <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl text-balance">
            Three steps to your prayer
          </h2>
        </div>

        <div className="flex flex-col gap-12">
          {steps.map((step, index) => (
            <div key={step.number} className="flex gap-6 md:gap-8">
              <div className="flex flex-col items-center">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-serif text-lg font-semibold">
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className="mt-2 h-full w-px bg-border" />
                )}
              </div>
              <div className="pb-8">
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
