"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Brain, Rocket, Target, Mail, MapPin, GraduationCap } from "lucide-react"
import Image from "next/image"

const summaryPoints = [
  {
    icon: Code,
    title: "Full Stack Development",
    description: "Proficient in building modern web applications using Next.js, React, and TypeScript. Experienced with both frontend and backend technologies."
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description: "Specialized in AI & ML with expertise in neural networks, deep learning, and generative AI. Currently pursuing a Minor Specialization in AI & ML."
  },
  {
    icon: Rocket,
    title: "Problem Solving",
    description: "Strong analytical and problem-solving skills, demonstrated through competitive programming and real-world project implementations."
  },
  {
    icon: Target,
    title: "Career Goals",
    description: "Aspiring Software Engineer with a focus on AI & ML, seeking opportunities to contribute to innovative projects and solve complex challenges."
  }
]

const profileInfo = [
  {
    icon: GraduationCap,
    label: "Education",
    value: "B.Tech in Computer Science"
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Noida, India"
  },
  {
    icon: Mail,
    label: "Email",
    value: "17arhaan.connect@gmail.com"
  }
]

export default function Summary() {
  return (
    <section id="about" className="relative py-24 bg-muted/30">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">About Me</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            A passionate developer with a strong foundation in software engineering and a keen interest in artificial intelligence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-1"
          >
            <Card className="h-full hover:border-primary/50 transition-colors duration-300">
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-48 h-48 mb-8 rounded-full overflow-hidden border-4 border-primary/20">
                    <Image
                      src="/pfp.png"
                      alt="Arhaan Girdhar"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">Arhaan Girdhar</h3>
                  <p className="text-muted-foreground mb-8 text-lg">
                    Software Engineer & AI Enthusiast
                  </p>
                  <div className="space-y-6 w-full">
                    {profileInfo.map((info) => (
                      <div key={info.label} className="flex items-center gap-4 text-base">
                        <div className="p-2.5 rounded-lg bg-primary/10">
                          <info.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="text-left">
                          <p className="text-muted-foreground">{info.label}</p>
                          <p className="font-medium">{info.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Summary Points */}
          <div className="lg:col-span-2 space-y-8">
            {summaryPoints.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20 
                }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <Card className="h-full hover:border-primary/50 transition-colors duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <point.icon className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-3">{point.title}</h3>
                        <p className="text-muted-foreground text-base leading-relaxed">{point.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 