"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, FileText, Eye } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

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
          <h2 className="text-3xl font-bold mb-4">My Resume</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Download my resume or view it online to learn more about my qualifications and experience.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto"
        >
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="bg-muted p-8 flex flex-col justify-center">
                  <FileText className="h-16 w-16 text-primary mb-6 mx-auto" />
                  <h3 className="text-2xl font-bold text-center mb-4">My Curriculum Vitae</h3>
                  <p className="text-muted-foreground text-center mb-6">
                    A comprehensive document detailing my education, work experience, skills, and achievements.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="gap-2">
                          <Eye className="h-4 w-4" />
                          View Resume
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl h-[80vh]">
                        <iframe src="/Arhaan_Resume.pdf" className="w-full h-full" title="Resume" />
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" className="gap-2" asChild>
                      <a href="/Arhaan_Resume.pdf" download>
                        <Download className="h-4 w-4" />
                        Download PDF
                      </a>
                    </Button>
                  </div>
                </div>
                <div className="relative h-64 md:h-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/40 flex items-center justify-center">
                    <div className="bg-white/90 dark:bg-black/80 p-8 rounded-lg shadow-lg max-w-sm text-left">
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-bold text-lg mb-3 text-primary">Education</h4>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">B.Tech in CSE with Specialization in AI & ML</p>
                            <p className="text-sm text-muted-foreground">Manipal Institute of Technology</p>
                            <p className="text-sm text-muted-foreground">2022 - 2026</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold text-lg mb-3 text-primary">Hackathons Participated</h4>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-muted/50 dark:bg-muted/20 p-2 rounded-md">
                              <p className="text-sm font-medium">Think-a-thon</p>
                            </div>
                            <div className="bg-muted/50 dark:bg-muted/20 p-2 rounded-md">
                              <p className="text-sm font-medium">CreaTech</p>
                            </div>
                            <div className="bg-muted/50 dark:bg-muted/20 p-2 rounded-md">
                              <p className="text-sm font-medium">Hacksplosion</p>
                            </div>
                            <div className="bg-muted/50 dark:bg-muted/20 p-2 rounded-md">
                              <p className="text-sm font-medium">HackWithInfy</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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

