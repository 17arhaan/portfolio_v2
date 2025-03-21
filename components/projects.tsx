"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { cn } from "@/lib/utils"

// Updated project data
const projectsData = [
  {
    id: 1,
    title: "J.A.R.V.I.S",
    description:
      "• Developed a sophisticated AI assistant supporting 20+ languages for enhanced productivity\n\n• Implemented real-time object detection using YOLOv8 and advanced speech recognition\n\n• Integrated CNN-based face authentication system supporting multi-user access\n\n• Built with modular architecture for seamless task automation and system integration",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Python", "TensorFlow", "Computer Vision", "CNN"],
    demoLink: null,
    githubLink: "https://github.com/arhaanhamid/J.A.R.V.I.S",
    category: "cv",
    featured: true,
  },
  {
    id: 2,
    title: "Personal Portfolio Website",
    description:
      "• Engineered a modern, responsive portfolio using Next.js and Tailwind CSS\n\n• Implemented smooth animations and transitions with Framer Motion\n\n• Optimized for performance with server-side rendering and image optimization\n\n• Designed with accessibility and SEO best practices in mind",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    demoLink: "https://arhaanportfolio.in",
    githubLink: "https://github.com/arhaanhamid/portfolio",
    category: "web",
    featured: true,
  },
  {
    id: 3,
    title: "Natural Language Processing Chatbot",
    description:
      "• Developed an intelligent chatbot using state-of-the-art NLP techniques\n\n• Implemented contextual awareness and sentiment analysis for natural conversations\n\n• Integrated with Flask backend for scalable deployment\n\n• Enhanced with custom training data for domain-specific responses",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Python", "NLTK", "Transformers", "Flask"],
    demoLink: "https://example.com/nlp-chatbot",
    githubLink: "https://github.com/arhaanhamid/nlp-chatbot",
    category: "ai",
    featured: false,
  },
  {
    id: 4,
    title: "Data Visualization Dashboard",
    description:
      "• Created an interactive dashboard for complex data visualization\n\n• Implemented real-time data updates and custom filtering capabilities\n\n• Built with D3.js for advanced charting and data manipulation\n\n• Integrated MongoDB for efficient data storage and retrieval",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["D3.js", "React", "Node.js", "MongoDB"],
    demoLink: "https://example.com/data-viz",
    githubLink: "https://github.com/arhaanhamid/data-viz",
    category: "data",
    featured: false,
  },
  {
    id: 5,
    title: "E-Learning Platform",
    description:
      "• Developed a comprehensive e-learning platform with course management\n\n• Implemented video streaming, quiz system, and progress tracking\n\n• Built with React and Redux for state management\n\n• Integrated Firebase for authentication and real-time updates",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "Firebase", "Redux", "Material UI"],
    demoLink: "https://example.com/e-learning",
    githubLink: "https://github.com/arhaanhamid/e-learning",
    category: "web",
    featured: true,
  },
  {
    id: 6,
    title: "Predictive Analytics for Stock Market",
    description:
      "• Engineered a machine learning model for stock market trend prediction\n\n• Integrated sentiment analysis from news and social media data\n\n• Implemented time series analysis for historical pattern recognition\n\n• Built with scikit-learn and pandas for efficient data processing",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Python", "Scikit-learn", "Pandas", "Time Series Analysis"],
    demoLink: "https://example.com/stock-prediction",
    githubLink: "https://github.com/arhaanhamid/stock-prediction",
    category: "ml",
    featured: false,
  },
]

const categories = [
  { id: "all", name: "All" },
  { id: "web", name: "Web Development" },
  { id: "ai", name: "Artificial Intelligence" },
  { id: "ml", name: "Machine Learning" },
  { id: "cv", name: "Computer Vision" },
  { id: "dl", name: "Deep & Reinforcement Learning" },
  { id: "data", name: "Data Science" },
]

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  // Filter projects based on category and search query
  const filteredProjects = projectsData
    .filter((project) => activeCategory === "all" || project.category === activeCategory)
    .filter((project) => {
      if (!searchQuery) return true
      const query = searchQuery.toLowerCase()
      return (
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    })

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProject !== null) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [selectedProject])

  const selectedProjectData = selectedProject !== null ? projectsData.find((p) => p.id === selectedProject) : null

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-muted/30">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">My Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore my recent work and personal projects that showcase my skills and expertise.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  onClick={() => setActiveCategory(category.id)}
                  className="rounded-full"
                  size="sm"
                >
                  {category.name}
                </Button>
              ))}
            </div>

            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-9 rounded-full"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <motion.div
              key="projects-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className={cn("h-full", project.featured && "md:col-span-2 lg:col-span-1")}
                >
                  <Card
                    className="h-full overflow-hidden group cursor-pointer border border-border/50 hover:border-primary/50 transition-colors duration-300"
                    onClick={() => setSelectedProject(project.id)}
                  >
                    <div className="relative overflow-hidden h-56">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <CardHeader className="space-y-4">
                      <CardTitle className="group-hover:text-primary transition-colors duration-300 text-xl">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 [&>p]:mb-2 last:[&>p]:mb-0 text-sm">
                        {project.description.split('\n\n').map((line, index) => (
                          <p key={index}>{line}</p>
                        ))}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-secondary/50 hover:bg-secondary text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pb-6">
                      <Button variant="ghost" size="sm" className="gap-1" asChild>
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="h-4 w-4" />
                          <span className="sr-only md:not-sr-only">Code</span>
                        </a>
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-1" asChild>
                        <a
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only md:not-sr-only">Demo</span>
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center py-20"
            >
              <p className="text-muted-foreground">No projects found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setActiveCategory("all")
                  setSearchQuery("")
                }}
                className="mt-4"
              >
                Reset Filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject !== null && selectedProjectData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-card w-full max-w-4xl max-h-[90vh] overflow-auto rounded-xl shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video">
                <Image
                  src={selectedProjectData.image || "/placeholder.svg"}
                  alt={selectedProjectData.title}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 bg-background/50 backdrop-blur-sm text-foreground rounded-full p-2 hover:bg-background/80 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{selectedProjectData.title}</h3>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Description</h3>
                  <div className="text-muted-foreground space-y-2">
                    {selectedProjectData.description.split('\n\n').map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProjectData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold mb-2">Features</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Responsive design for all devices</li>
                      <li>Intuitive user interface</li>
                      <li>High performance and optimization</li>
                      <li>Secure authentication system</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Technical Details</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Frontend: React with TypeScript</li>
                      <li>Backend: Node.js with Express</li>
                      <li>Database: MongoDB</li>
                      <li>Deployment: Vercel</li>
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="flex-1">
                    <a href={selectedProjectData.demoLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                  <Button variant="outline" asChild className="flex-1">
                    <a href={selectedProjectData.githubLink} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      View Code
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

