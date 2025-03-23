"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Award, ExternalLink, CheckCircle } from "lucide-react"
import Image from "next/image"

// Sample certifications data
const certificationsData = [
  {
    id: 6,
    title: "Foundations of Project Management",
    issuer: "Google",
    date: "May 2025",
    expiryDate: null,
    description:
      "Introduces foundational project management concepts like project selection, resource allocation, and risk management.",
    credentialId: "ML-SPEC-2023",
    credentialURL: "",
    skills: ["Problem Solving", "Leadership", "Project Management", "Risk Management","Responsiblity"],
    image: "/google.png?height=200&width=200",
  },
  {
    id: 5,
    title: "Foundations of AI and Machine Learning",
    issuer: "Microsoft",
    date: "April 2025",
    expiryDate: null,
    description:
      "A comprehensive introduction to AI & ML infrastructure, covering data pipelines, model frameworks, and deployment strategies",
    credentialId: "TF-DEV-2023",
    credentialURL: "",
    skills: ["AI", "ML", "Data Management", "Model Frameworks", "Model Deployment", "Cloud Computing", "AI Infrastructure", "Version Control", "Scalability"],
    image: "/microsoft.svg?height=200&width=200",
  },
  {
    id: 4,
    title: "Generative AI with Large Language Models",
    issuer: "AWS",
    date: "Jan 2025",
    expiryDate: null,
    description:
    "Fundamentals of Generative AI with Large Language Models (LLMs), covering model training, fine-tuning, and deployment.",
    credentialId: "FSWD-2023",
    credentialURL: "https://www.coursera.org/account/accomplishments/certificate/6763NRR61X28",
    skills: ["Generative AI", "Large Language Models", "Transformer Architecture", "Model Training", "Fine-Tuning", "AI Deployment", "Inference Optimization", "Scaling Laws", "Python", "Machine Learning"],
    image: "/aws.webp?height=200&width=200",
  },
  {
    id: 3,
    title: "Introduction to Generative AI",
    issuer: "Google",
    date: "Dec 2024",
    expiryDate: null,
    description:
      "Introduces Generative AI, its applications, and how it differs from traditional machine learning.",
    credentialId: "FSWD-2023",
    credentialURL: "https://www.coursera.org/account/accomplishments/certificate/5VKU3Z5HMB2G",
    skills: ["Generative AI", "Machine Learning", "AI Applications", "Google AI Tools", "Deep Learning", "Model Development"],
    image: "/google.png?height=200&width=200",
  },
  {
    id: 2,
    title: "Neural Networks and Deep Learning",
    issuer: "DeepLearning.AI",
    date: "Dec 2024",
    expiryDate: null,
    description: "Validates deep learning fundamentals, covering neural network architectures, training techniques, and key hyperparameters.",
    credentialId: "AWS-ML-2023",
    credentialURL: "https://www.coursera.org/account/accomplishments/certificate/1XMZBVRYNKB2",
    skills: ["Deep Learning", "Neural Networks", "AI", "Machine Learning", "Model Training", "Vectorization", "Hyperparameter Tuning", "AI Applications", "Model Optimization"],
    image: "/deeplearningai.png?height=200&width=200",
  },
  {
    id: 1,
    title: "Exploratory Data Analysis for Machine Learning",
    issuer: "IBM",
    date: "Dec 2024",
    expiryDate: null,
    description:
    "Fundamentals of machine learning, focusing on data retrieval, cleaning, feature engineering, and preprocessing.",
    credentialId: "FSWD-2023",
    credentialURL: "https://www.coursera.org/account/accomplishments/certificate/Y53G36TKQGCU",
    skills: ["Machine Learning", "Data Preprocessing", "Feature Engineering", "Data Cleaning", "SQL", "NoSQL", "APIs", "Outlier Detection", "Feature Scaling", "Hypothesis Testing"],
    image: "/ibm.png?height=200&width=200",
  },
]

export default function Certifications() {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section id="certifications" className="py-20 bg-muted/30">
      <div className="container px-4 max-w-[2000px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Professional Certifications</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Industry-recognized credentials that validate my expertise and technical skills.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-[2000px] mx-auto">
          {certificationsData.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -5 }}
              className="h-full"
            >
              <Card className="h-full overflow-hidden border border-border/50 hover:border-primary/50 transition-colors duration-300">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                        {cert.title}
                      </CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Award className="h-4 w-4 mr-1" />
                        {cert.issuer}
                        <span className="mx-2">•</span>
                        <Calendar className="h-4 w-4 mr-1" />
                        {cert.date}
                        {cert.expiryDate && <span> - {cert.expiryDate}</span>}
                      </CardDescription>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <div className="relative h-16 w-16 rounded-md overflow-hidden border border-border/50">
                        <Image src={cert.image || "/placeholder.svg"} alt={cert.title} fill className="object-cover" />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div
                    className={`transition-all duration-300 ${expandedId === cert.id ? "max-h-96" : "max-h-24 overflow-hidden"}`}
                  >
                    <p className="text-sm text-muted-foreground mb-4">{cert.description}</p>

                    {expandedId === cert.id && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                        <div className="mb-4">
                          <p className="text-sm font-medium mb-1">Credential ID</p>
                          <p className="text-sm text-muted-foreground">{cert.credentialId}</p>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm font-medium mb-2">Skills</p>
                          <div className="flex flex-wrap gap-2">
                            {cert.skills.map((skill) => (
                              <Badge key={skill} variant="secondary" className="bg-secondary/50">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpand(cert.id)}
                    className="mt-2 text-xs w-full justify-center"
                  >
                    {expandedId === cert.id ? "Show Less" : "Show More"}
                  </Button>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" size="sm" className="w-full gap-2" asChild>
                    <a href={cert.credentialURL} target="_blank" rel="noopener noreferrer">
                      <CheckCircle className="h-4 w-4" />
                      Verify Credential
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

