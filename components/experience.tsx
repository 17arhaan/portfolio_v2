"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Calendar, MapPin } from "lucide-react"

// Updated experience data
const experienceData = [
  {
    id: 1,
    role: "Software Engineering Intern",
    company: "Microsoft",
    location: "Bangalore, India",
    period: "May 2023 - Aug 2023",
    description:
      "Worked on developing and optimizing cloud-based solutions using Azure services. Implemented machine learning models for predictive analytics and improved system performance by 30%.",
    skills: ["Azure", "Python", "Machine Learning", "CI/CD"],
  },
  {
    id: 2,
    role: "Research Assistant",
    company: "MIT Manipal AI Lab",
    location: "Manipal, India",
    period: "Jan 2023 - Apr 2023",
    description:
      "Assisted in research projects focused on computer vision and natural language processing. Implemented and evaluated deep learning models for image classification and sentiment analysis.",
    skills: ["TensorFlow", "PyTorch", "Computer Vision", "NLP"],
  },
  {
    id: 3,
    role: "Web Development Intern",
    company: "Tech Innovators",
    location: "Remote",
    period: "Jun 2022 - Aug 2022",
    description:
      "Developed responsive web applications using React and Node.js. Collaborated with the design team to implement UI/UX improvements and integrated RESTful APIs for data retrieval.",
    skills: ["React", "Node.js", "JavaScript", "REST APIs"],
  },
  {
    id: 4,
    role: "Open Source Contributor",
    company: "GitHub Projects",
    location: "Remote",
    period: "Jan 2022 - Present",
    description:
      "Active contributor to open-source projects in the machine learning and web development domains. Implemented new features, fixed bugs, and improved documentation for various community projects.",
    skills: ["Git", "Open Source", "Collaboration", "Documentation"],
  },
]

export default function Experience() {
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
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-border" />

          {experienceData.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`relative mb-12 md:w-1/2 ${
                index % 2 === 0 ? "md:pr-10 md:ml-0 ml-6" : "md:pl-10 md:ml-auto ml-6"
              }`}
            >
              {/* Timeline dot */}
              <div
                className="absolute top-5 left-[-8px] md:left-auto md:right-[-8px] w-4 h-4 rounded-full bg-primary z-10"
                style={{ [index % 2 === 0 ? "right" : "left"]: "-8px" }}
              />

              <Card className="relative">
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
                  <p className="mb-4">{experience.description}</p>
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
          ))}
        </div>
      </div>
    </section>
  )
}

