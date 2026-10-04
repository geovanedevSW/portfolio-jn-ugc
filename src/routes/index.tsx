import { createFileRoute } from "@tanstack/react-router"
import { Navbar } from "@/components/site/Navbar"
import { Hero } from "@/components/site/Hero"
import { BrandsBar } from "@/components/site/BrandsBar"
import { About } from "@/components/site/About"
import { FeaturedProject } from "@/components/site/FeaturedProject"
import { Services } from "@/components/site/Services"
import { HowItWorks } from "@/components/site/HowItWorks"
import { Testimonials } from "@/components/site/Testimonials"
import { Footer } from "@/components/site/Footer"

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Jhenifer Nogueira — UGC Creator | Portfólio",
      },
      {
        name: "description",
        content: "Conteúdos autênticos e estratégicos que conectam marcas e pessoas. Especialista em vídeos UGC para alta conversão.",
      },
    ],
  }),
  component: Index,
})

function Index() {
  return (
    <main className="bg-noise relative min-h-screen overflow-x-clip bg-[var(--background)] text-[var(--ink)]">
      <Navbar />
      <Hero />
      <BrandsBar />
      <About />
      <Services />
      <FeaturedProject />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </main>
  )
}
