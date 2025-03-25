import Hero from "@/components/hero"
import Projects from "@/components/projects"
import Experience from "@/components/experience"
import Skills from "@/components/skills"
import Certifications from "@/components/certifications"
import Resume from "@/components/resume"
import CodeStats from "@/components/code-stats"
import Contact from "@/components/contact"
import Summary from "@/components/summary"
import { Toaster } from "@/components/ui/toaster"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Toaster />
      <Hero />
      <Summary />
      <Projects />
      <Experience />
      <Skills />
      <Certifications />
      <Resume />
      <CodeStats />
      <Contact />
    </main>
  )
}

