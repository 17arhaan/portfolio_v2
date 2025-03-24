"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

// Updated skills data
const skillsData = {
  programming: [
    { name: "Python", level: 95 },
    { name: "JavaScript", level: 70 },
    { name: "TypeScript", level: 20 },
    { name: "Java", level: 60 },
    { name: "C++", level: 75 },
    { name: "C", level: 75 },
    { name: "MySQL", level: 90 },
    { name: "PostgreSQL", level: 75 },
  ],
  frameworks: [
    { name: "ReactJS", level: 85 },
    { name: "NodeJS", level: 80 },
    { name: "Django", level: 85 },
    { name: "Flask", level: 90 },
    { name: "Tailwind CSS", level: 70 },
    { name: "Bootstrap", level: 85 },
    { name: "jQuery", level: 80 },
    { name: "Express.js", level: 65 },
    { name: "Next.js", level: 70 },
    { name: "FastAPI", level: 45 },
  ],
  libraries: [
    { name: "NumPy", level: 95 },
    { name: "Pandas", level: 95 },
    { name: "Matplotlib", level: 95 },
    { name: "Seaborn", level: 90 },
    { name: "PyTorch", level: 85 },
    { name: "Scikit-learn", level: 85 },
    { name: "OpenCV", level: 80 },
    { name: "OpenMPI", level: 75 },
    { name: "TensorFlow", level: 75 },
    { name: "Transformers", level: 60 },
    { name: "SciPy", level: 50 },
    { name: "CUDA", level: 70 },
  ],
  tools: [
    { name: "Microsoft Office", level: 100 },
    { name: "HTML5", level: 95 },
    { name: "CSS3", level: 95 },
    { name: "Git", level: 95 },
    { name: "Jupyter Notebook", level: 90 },
    { name: "MATLAB", level: 80 },
    { name: "JavaFX", level: 70 },
    { name: "Docker", level: 65 },
    { name: "Azure", level: 60 },
    { name: "AWS", level: 40 },
  ],
  platforms: [
    { name: "GitHub Pages", level: 90 },
    { name: "Vercel", level: 85 },
    { name: "Google Cloud", level: 55 },
    { name: "Heroku", level: 60 },
    { name: "Netlify", level: 60 },
  ],
  domains: [
    { name: "Data Structures and Algorithms", level: 95 },
    { name: "Object Oriented Programming", level: 90 },
    { name: "Artificial Intelligence", level: 90 },
    { name: "Database Management", level: 95 },
    { name: "Machine Learning", level: 90 },
    { name: "Deep Learning", level: 80 },
    { name: "Computer Vision", level: 75 },
    { name: "Natural Language Processing", level: 70 },
    { name: "Web Development", level: 90 },
    { name: "Data Science", level: 80 },
    { name: "Cloud Computing", level: 50 },
    { name: "DevOps", level: 40 },

  ],
  languages: [
    { name: "English", level: 95 },
    { name: "Hindi", level: 100 },
  ],
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState("programming")

  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4 tracking-tight">Skills & Expertise</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A comprehensive overview of my technical abilities, domain knowledge, and languages.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto"
        >
          <Tabs defaultValue="programming" className="w-full" onValueChange={setActiveTab}>
            <div className="relative">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 mb-8 bg-muted/20 relative">
                {Object.keys(skillsData).map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="text-sm font-medium relative z-10 transition-colors duration-300"
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </TabsTrigger>
                ))}
                <motion.div
                  className="absolute inset-0 bg-background rounded-md shadow-sm"
                  layoutId="activeTab"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  style={{
                    width: `calc(100% / ${Object.keys(skillsData).length} - 4px)`,
                    left: `calc(${Object.keys(skillsData).indexOf(activeTab)} * (100% / ${Object.keys(skillsData).length}))`,
                  }}
                />
              </TabsList>
            </div>

            <AnimatePresence mode="wait">
              {Object.entries(skillsData).map(([category, skills]) => (
                <TabsContent key={category} value={category}>
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ 
                      duration: 0.4,
                      ease: [0.4, 0, 0.2, 1],
                      staggerChildren: 0.05
                    }}
                  >
                    <Card className="border border-border/50 shadow-sm">
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {skills.map((skill, index) => (
                            <motion.div
                              key={skill.name}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                              transition={{ 
                                duration: 0.3,
                                ease: [0.4, 0, 0.2, 1],
                                delay: index * 0.05
                              }}
                              className="group"
                            >
                              <div className="mb-2 flex justify-between items-center">
                                <span className="font-medium group-hover:text-primary transition-colors duration-300">
                                  {skill.name}
                                </span>
                                <span className="text-muted-foreground text-sm">{skill.level}%</span>
                              </div>
                              <Progress 
                                value={skill.level} 
                                className="h-2 group-hover:bg-primary/20 transition-colors duration-300" 
                              />
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              ))}
            </AnimatePresence>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}

