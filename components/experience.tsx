"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Calendar, MapPin } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

// Updated experience data
const experienceData = [
  {
    id: 0,
    role: "Internship",
    company: "Coming Soon",
    location: "Remote",
    period: "June 2025 - July 2025",
    description:
      "• Details coming soon\n\n• More information will be available shortly\n\n• Stay tuned for updates",
    skills: ["Coming Soon"],
  },
  {
    id: 1,
    role: "Project Lead",
    company: "Buildspace",
    location: "Remote | LA , US",
    period: "Jul 2024 - Sept 2024",
    description:
      "• Led development of an AI-powered mental health therapy chatbot served many monthly users\n\n• Managed a 5-member cross-functional team, implementing agile methodologies across 12 sprints\n\n• Improved chatbot response accuracy from 65% to 95% through advanced NLP techniques\n\n• Reduced average response time from 2.5s to 1s through system optimization\n\n• Established comprehensive documentation and training protocols for team members",
    skills: ["AI", "Team Leadership", "Project Management"],
  },
  {
    id: 2,
    role: "Internship Trainee",
    company: "Bharat Electronics Limited",
    location: "On-Site | DEL , IN",
    period: "Jun 2024 - Jul 2024",
    description:
      "• Developed 7 JavaFX interfaces handling 500+ daily cybersecurity operations\n\n• Implemented VM management system for 25+ virtual machines achieving 99.99% uptime\n\n• Reduced manual processing time from 45 minutes to 27 minutes through automation\n\n• Enhanced system security by implementing AES-256 encryption across all interfaces\n\n• Established standardized testing procedures for all new features",
    skills: ["Cybersecurity", "System Administration", "UI Development"],
  },
  {
    id: 3,
    role: "Frontend Developer",
    company: "Invisible Mechanics",
    location: "Hybrid | BLR , IN",
    period: "Jan 2024 - Mar 2024",
    description:
      "• Developed responsive website serving 50,000+ monthly active users\n\n• Reduced page load time from 3.2s to 1.8s through caching optimization\n\n• Maintained 99% on-time delivery rate across 15 sprint cycles\n\n• Decreased application bundle size from 2.8MB to 1.7MB through code splitting\n\n• Implemented comprehensive error handling and monitoring systems",
    skills: ["Frontend Development", "Performance Optimization", "Digital AM"],
  }
]

export default function Experience() {
  const [activeDot, setActiveDot] = useState<number | null>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const handleCardClick = (index: number) => {
    setActiveDot(index)
    setTimeout(() => {
      setActiveDot(null)
    }, 500)
  }

  return (
    <section id="experience" className="py-20">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Professional Experience</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My professional journey and the companies I've had the pleasure to work with.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main timeline line */}
          <motion.div 
            className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-border"
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ 
              duration: 1.5,
              ease: "easeOut",
              delay: 0.2
            }}
            viewport={{ once: false, margin: "-100px" }}
          />

          {experienceData.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.2,
                ease: "easeOut"
              }}
              viewport={{ once: true, margin: "-100px" }}
              className={`relative mb-24 md:w-1/2 ${
                index % 2 === 0 ? "md:pr-10 md:ml-0 ml-6" : "md:pl-10 md:ml-auto ml-6"
              }`}
            >
              {/* Company Logo and Description Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.2
                }}
                viewport={{ once: true, margin: "-100px" }}
                className={`mb-4 flex items-center justify-center gap-3 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center border border-border/30 overflow-hidden"
                >
                  {experience.company !== "Coming Soon" && (
                    <Image
                      src={`/${experience.company === "Buildspace" ? "Buildspaceso_logo" : 
                            experience.company === "Bharat Electronics Limited" ? "BEL_logo" : 
                            "IM_logo"}.jpg`}
                      alt={`${experience.company} logo`}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  )}
                </motion.div>
                <h3 className="text-2xl font-semibold text-primary/80">{experience.company}</h3>
              </motion.div>

              {/* Timeline dot with animation and arrow */}
              <motion.div
                className="absolute top-5 left-[-8px] md:left-auto md:right-[-8px] w-4 h-4 rounded-full bg-primary z-10"
                style={{ [index % 2 === 0 ? "right" : "left"]: "-8px" }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                animate={activeDot === index ? { scale: [1, 1.5, 1] } : hoveredCard === index ? { scale: 1.2 } : {}}
                transition={{ 
                  duration: 0.5,
                  type: "spring",
                  stiffness: 300
                }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary/20"
                  animate={hoveredCard === index ? { scale: [1, 1.5, 1] } : {}}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                {index === 0 && (
                  <motion.div
                    className="absolute -top-1 right-[-24px] w-6 h-6"
                    animate={{ 
                      y: [0, -4, 0],
                      rotate: [0, -5, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="relative">
                      <motion.div
                        className="absolute inset-0 rounded-full bg-primary/20"
                        animate={{ 
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 0, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-full bg-primary/10"
                        animate={{ 
                          scale: [1, 2, 1],
                          opacity: [0.3, 0, 0.3]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.5
                        }}
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-full h-full text-primary relative z-10"
                      >
                        <path d="M19 12H5M5 12l7-7M5 12l7 7" />
                      </svg>
                    </div>
                  </motion.div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.2 + 0.3
                }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card 
                    className="relative hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                    onClick={() => handleCardClick(index)}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="text-xl">{experience.role}</CardTitle>
                        <Badge variant="outline" className="ml-2">
                          <Calendar className="mr-1 h-3 w-3" />
                          {experience.period}
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4" />
                        {experience.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4 whitespace-pre-line">{experience.description}</div>
                      <div className="flex flex-wrap gap-2">
                        {experience.skills.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

