import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { HowItWorks } from "@/components/landing/how-it-works"
import { BeliefsSection } from "@/components/landing/beliefs-section"
import { Disclaimer } from "@/components/landing/disclaimer"
import { Footer } from "@/components/landing/footer"

export default function Page() {
  return (
    <main>
      <Header />
      <Hero />
      <Features />
      <BeliefsSection />
      <HowItWorks />
      <Disclaimer />
      <Footer />
    </main>
  )
}
