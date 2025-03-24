"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, FileText, Eye, GraduationCap, Award, Briefcase } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

const highlights = [
  {
    icon: GraduationCap,
    title: "Education",
    details: "B.Tech in CSE with Specialization in AI & ML",
    subtext: "Manipal Institute of Technology • 2022 - 2026"
  },
  {
    icon: Award,
    title: "Achievements",
    details: "4+ Hackathons • 10+ Projects",
    subtext: "Think-a-thon • CreaTech • Hacksplosion • HackWithInfy"
  },
  {
    icon: Briefcase,
    title: "Experience",
    details: "1+ Year Experience",
    subtext: "Google • Microsoft • Amazon • Full-stack Development • Machine Learning • Cloud Computing"
  }
]

export default function Resume() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <section id="resume" className="py-20">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4 tracking-tight">Resume</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A comprehensive overview of my qualifications and experience.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto"
        >
          <Card className="overflow-hidden border border-border/50 shadow-sm">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="bg-muted/20 p-10 flex flex-col justify-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="relative w-20 h-20 mx-auto mb-10"
                  >
                    <div className="absolute inset-0 bg-primary/5 rounded-full animate-pulse" />
                    <FileText className="w-full h-full text-primary/80" />
                  </motion.div>
                  
                  <motion.h3 
                    className="text-2xl font-bold text-center mb-6 tracking-tight"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                    viewport={{ once: true }}
                  >
                    Curriculum Vitae
                  </motion.h3>
                  
                  <motion.p 
                    className="text-muted-foreground text-center mb-10 text-base"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                    viewport={{ once: true }}
                  >
                    Download or view my complete resume to learn more about my qualifications and experience.
                  </motion.p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="gap-2 group h-11">
                          <Eye className="h-4 w-4 transition-transform group-hover:scale-110" />
                          View Resume
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl h-[80vh]">
                        <iframe src="/Arhaan_Resume.pdf" className="w-full h-full" title="Resume" />
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" className="gap-2 group h-11" asChild>
                      <a href="/Arhaan_Resume.pdf" download>
                        <Download className="h-4 w-4 transition-transform group-hover:scale-110" />
                        Download PDF
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="p-10 bg-background">
                  <div className="space-y-10">
                    {highlights.map((highlight, index) => (
                      <motion.div
                        key={highlight.title}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="flex items-start gap-5 group"
                      >
                        <motion.div 
                          className="p-2.5 rounded-lg bg-primary/5"
                          whileHover={{ scale: 1.05, rotate: 3 }}
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                          <highlight.icon className="h-5 w-5 text-primary/80" />
                        </motion.div>
                        <div>
                          <h4 className="font-semibold text-lg mb-2 tracking-tight">{highlight.title}</h4>
                          <p className="text-muted-foreground text-base">{highlight.details}</p>
                          <p className="text-sm text-muted-foreground/70 mt-1">{highlight.subtext}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

