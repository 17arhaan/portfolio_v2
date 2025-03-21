"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Updated skills data
const skillsData = {
  technical: [
    { name: "Python", level: 95 },
    { name: "JavaScript", level: 90 },
    { name: "TensorFlow", level: 85 },
    { name: "PyTorch", level: 80 },
    { name: "React", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "SQL", level: 75 },
    { name: "MongoDB", level: 70 },
    { name: "Docker", level: 65 },
    { name: "AWS", level: 60 },
    { name: "Git", level: 90 },
  ],
  domains: [
    { name: "Machine Learning", level: 85 },
    { name: "Deep Learning", level: 80 },
    { name: "Computer Vision", level: 75 },
    { name: "Natural Language Processing", level: 70 },
    { name: "Web Development", level: 90 },
    { name: "Data Science", level: 80 },
    { name: "Cloud Computing", level: 65 },
    { name: "DevOps", level: 60 },
  ],
  languages: [
    { name: "English", level: 95 },
    { name: "Hindi", level: 90 },
    { name: "Kannada", level: 60 },
  ],
}

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Skills & Expertise</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical abilities, domain knowledge, and languages.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto"
        >
          <Tabs defaultValue="technical" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="technical">Technical Skills</TabsTrigger>
              <TabsTrigger value="domains">Domain Knowledge</TabsTrigger>
              <TabsTrigger value="languages">Languages</TabsTrigger>
            </TabsList>

            <TabsContent value="technical" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {skillsData.technical.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <div className="mb-2 flex justify-between">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-muted-foreground">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="domains" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {skillsData.domains.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <div className="mb-2 flex justify-between">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-muted-foreground">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="languages" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {skillsData.languages.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <div className="mb-2 flex justify-between">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-muted-foreground">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}

