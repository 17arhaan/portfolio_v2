"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Calendar, MapPin } from "lucide-react"
import { useState } from "react"

// Updated experience data
const experienceData = [
  {
    id: 1,
    role: "Project Lead",
    company: "Buildspace",
    location: "Remote",
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
          {/* Timeline end decoration */}
          <motion.div 
            className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 -top-4"
            initial={{ opacity: 0, scale: 0, rotate: -90 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ 
              duration: 0.5,
              type: "spring",
              stiffness: 200
            }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="w-8 h-8 text-primary relative">
              <motion.div
                animate={{ 
                  x: [0, -4, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-full h-full"
                >
                  <path d="M19 12H5M5 12l7-7M5 12l7 7" />
                </svg>
              </motion.div>
              <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse"></div>
            </div>
          </motion.div>

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
              {/* Timeline dot with animation */}
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
                        <Briefcase className="mr-1 h-4 w-4" />
                        {experience.company}
                        <span className="mx-2">•</span>
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

