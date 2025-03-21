import Hero from "@/components/hero"
import Projects from "@/components/projects"
import Experience from "@/components/experience"
import Skills from "@/components/skills"
import Certifications from "@/components/certifications"
import Resume from "@/components/resume"
import CodeStats from "@/components/code-stats"
import Contact from "@/components/contact"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Toaster />
      <Hero />
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

