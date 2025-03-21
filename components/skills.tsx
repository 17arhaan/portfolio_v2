"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
          <Tabs defaultValue="programming" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 mb-8">
              <TabsTrigger value="programming" className="text-sm">Programming</TabsTrigger>
              <TabsTrigger value="frameworks" className="text-sm">Frameworks</TabsTrigger>
              <TabsTrigger value="libraries" className="text-sm">Libraries</TabsTrigger>
              <TabsTrigger value="tools" className="text-sm">Dev Tools</TabsTrigger>
              <TabsTrigger value="platforms" className="text-sm">Platforms</TabsTrigger>
              <TabsTrigger value="domains" className="text-sm">Domains</TabsTrigger>
              <TabsTrigger value="languages" className="text-sm">Languages</TabsTrigger>
            </TabsList>

            <TabsContent value="programming" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {skillsData.programming.map((skill, index) => (
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

            <TabsContent value="frameworks" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {skillsData.frameworks.map((skill, index) => (
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

            <TabsContent value="libraries" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {skillsData.libraries.map((skill, index) => (
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

            <TabsContent value="tools" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {skillsData.tools.map((skill, index) => (
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

            <TabsContent value="platforms" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {skillsData.platforms.map((skill, index) => (
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

