"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, FileText, Eye, GraduationCap, Award, Briefcase, Users } from "lucide-react"
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
    details: "1+ Year",
    subtext: "Bharat Electronics Limited\n\n • Invisible Mechanics • buildspace"
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
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Resume</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my qualifications and experience.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto"
        >
          <Card className="overflow-hidden border-2">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="bg-muted/30 p-8 flex flex-col justify-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="relative w-24 h-24 mx-auto mb-8"
                  >
                    <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse" />
                    <FileText className="w-full h-full text-primary" />
                  </motion.div>
                  
                  <motion.h3 
                    className="text-2xl font-bold text-center mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    Curriculum Vitae
                  </motion.h3>
                  
                  <motion.p 
                    className="text-muted-foreground text-center mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    Download or view my complete resume to learn more about my qualifications and experience.
                  </motion.p>

                  <div className="flex flex-wrap justify-center gap-4">
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="gap-2 group min-w-[140px]">
                          <Eye className="h-4 w-4 transition-transform group-hover:scale-110" />
                          View Resume
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl h-[80vh]">
                        <iframe src="/Arhaan_Resume.pdf" className="w-full h-full" title="Resume" />
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" className="gap-2 group min-w-[140px]" asChild>
                      <a href="/Arhaan_Resume.pdf" download>
                        <Download className="h-4 w-4 transition-transform group-hover:scale-110" />
                        Download PDF
                      </a>
                    </Button>
                    <Button variant="outline" className="gap-2 group min-w-[140px]" asChild>
                      <a 
                        href="https://drive.google.com/drive/folders/1S55QbJu8Pv5a8wAxj5SMgOviAwjTbmKl?usp=sharing" 
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Users className="h-4 w-4 transition-transform group-hover:scale-110" />
                        References
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="p-8 bg-background">
                  <div className="space-y-8">
                    {highlights.map((highlight, index) => (
                      <motion.div
                        key={highlight.title}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-4 group"
                      >
                        <motion.div 
                          className="p-2.5 rounded-lg bg-primary/10"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <highlight.icon className="h-5 w-5 text-primary" />
                        </motion.div>
                        <div>
                          <h4 className="font-semibold text-lg mb-1">{highlight.title}</h4>
                          <p className="text-muted-foreground">{highlight.details}</p>
                          <p className="text-sm text-muted-foreground/80">{highlight.subtext}</p>
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

