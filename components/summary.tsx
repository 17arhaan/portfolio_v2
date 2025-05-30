"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Brain, Rocket, Target, Mail, MapPin, GraduationCap, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const summaryPoints = [
  {
    icon: Target,
    title: "Career Goals",
    description: "Aspiring Software Engineer with a focus on AI & ML, seeking opportunities to contribute to innovative projects and solve complex challenges."
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
    icon: Users,
    title: "Leadership and Project Management",
    description: "Experienced in leading teams and managing projects, with a track record of successful project deliveries and effective team collaboration."
  }
]

const profileInfo = [
  {
    icon: GraduationCap,
    label: "Education",
    value: "B.Tech in Computer Science",
    href: "https://admissions.manipal.edu/engineering/?utm_source=google&utm_medium=gsn&utm_campaign=new-engg-all-btech-common-brand-lv1kwds-zone0&gad_source=1&gclid=Cj0KCQjw4v6-BhDuARIsALprm3389qgmm2FlOac3PclOV5cdx4JivgE1N_XpLo9N_2jPzs6sANuL8pUaAtvQEALw_wcB#about"
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Noida, India",
    href: "https://www.google.com/maps/place/Noida,+Uttar+Pradesh/@28.5359551,77.3910263,12z/"
  },
  {
    icon: Mail,
    label: "Email",
    value: "17arhaan.connect@gmail.com",
    href: "mailto:17arhaan.connect@gmail.com"
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
          <motion.h2 
            className="text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            About Me
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-3xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            A passionate developer with a strong foundation in software engineering and a keen interest in artificial intelligence.
          </motion.p>
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
                  <motion.div 
                    className="relative w-48 h-48 mb-8 rounded-full overflow-hidden border-4 border-primary/20"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Image
                      src="/pfp.png"
                      alt="Arhaan Girdhar"
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  <motion.h3 
                    className="text-2xl font-semibold mb-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    Arhaan Girdhar
                  </motion.h3>
                  <motion.p 
                    className="text-muted-foreground mb-8 text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    Software Engineer & AI Enthusiast
                  </motion.p>
                  <div className="space-y-6 w-full">
                    {profileInfo.map((info, index) => (
                      <motion.div
                        key={info.label}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center gap-4 text-base p-2 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <motion.div 
                          className="p-2.5 rounded-lg bg-primary/10"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <info.icon className="h-5 w-5 text-primary" />
                        </motion.div>
                        <Link 
                          href={info.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-left flex-1 hover:text-primary transition-colors"
                        >
                          <p className="text-muted-foreground">{info.label}</p>
                          <p className="font-medium">{info.value}</p>
                        </Link>
                      </motion.div>
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
                whileHover={{ scale: 1.02, y: -5 }}
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
                      <motion.div 
                        className="p-3 rounded-lg bg-primary/10"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <point.icon className="h-8 w-8 text-primary" />
                      </motion.div>
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