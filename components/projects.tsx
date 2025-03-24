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
      "• Developed a sophisticated AI assistant supporting 20+ languages for enhanced productivity\n\n• Implemented real-time object detection using YOLOv8 and advanced speech recognition\n\n• Integrated CNN-based face authentication system supporting multi-user access\n\n• Built with modular architecture for seamless task automation and system integration.",
    image: "/jarvis.png",
    tags: ["Python", "TensorFlow","NLP","YOLOv8", "Speech Recognition", "Hugging Face", "CNN","RNN","LSTM","GRU"],
    demoLink: null,
    githubLink: "https://github.com/17arhaan/J.A.R.V.I.S",
    category: "dl",
    featured: true,
  },
  {
    id: 2,
    title: "W.E.A.L.T.H",
    description:
      "• Developed W.E.A.L.T.H, a modern finance tracking web app for efficient personal finance management\n\n• Enabled users to monitor income, expenses, budgets, and savings goals through an intuitive interface\n\n• Leveraged advanced web technologies to deliver real-time financial insights and seamless performance\n\n• Focused on data security, responsive design, and an accessible user experience.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Next.js", "React.js", "Express.js","Tailwind CSS", "PostgreSQL","jQuery","Bootstrap"],
    demoLink: null,
    githubLink: "https://github.com/17arhaan/W.E.A.L.T.H",
    category: "web",
    featured: true,
  },
  {
    id: 3,
    title: "Sentiment Analysis",
    description:
      "• Architected a high-performance, real-time news and trend analysis pipeline integrating NewsAPI, GDELT, and Wikipedia, capable of processing over 1M articles daily\n\n• Engineered a Kafka-based streaming infrastructure to deliver low-latency insights with execution times consistently under 5 seconds\n\n• Optimized system throughput and responsiveness using advanced caching, parallel processing, and modular data pipelines\n\n• Enhanced scalability and fault tolerance, enabling robust, data-driven trend detection and decision-making at scale.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Python", "Kafka", "NewsAPI", "Wiki API", "Transformers", "Real-Time Streaming", "Data Pipeline", "Trend Analysis"],
    demoLink: null,
    githubLink: "https://github.com/17arhaan/Sentiment_Analysis",
    category: "data",
    featured: false,
  },
  {
    id: 4,
    title: "SnakeCV",
    description:
      "• Built an interactive Snake Game with Python and React, featuring manual, AI, and gesture-controlled modes for dynamic gameplay\n\n• Integrated OpenCV and webcam-based gesture recognition to enable real-time control via hand movements in the Python version\n\n• Developed a responsive web version using React for accessible browser-based play with intuitive keyboard controls\n\n• Implemented features including AI mode (Q-learning), live webcam feed, game replays, leaderboard tracking, and a modular game menu system",
    image: "/snakecv.webp?height=400&width=600",
    tags: ["Python", "OpenCV", "Pygame", "Gesture Control", "Computer Vision", "Game Development", "Real-Time Interaction"],
    demoLink: null,
    githubLink: "https://github.com/17arhaan/Snake_CV_ML",
    categories: ["cv", "ml"],
    featured: true,
  },
  {
    id: 5,
    title: "TherapAI",
    description:
      "• Developed a cutting-edge AI-driven platform focused on delivering accessible and personalized mental health support\n\n• Integrated advanced natural language processing with expert-verified therapeutic methodologies to enable responsive and empathetic user interactions\n\n• Designed a scalable architecture to ensure availability, security, and seamless access to mental health resources across devices\n\n• Championed the mission to democratize mental wellness, offering on-demand care to users anytime, anywhere",
    image: "/therapai.png?height=400&width=600",
    tags: ["AI", "Mental Health", "NLP", "Chatbot", "Therapeutic Support", "Personalization", "Python", "Flask"]    ,
    demoLink: null,
    githubLink: "https://github.com/17arhaan/TherapAI",
    category: "ai",
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
    .filter((project) => {
      if (activeCategory === "all") return true;
      return project.categories?.includes(activeCategory) || project.category === activeCategory;
    })
    .filter((project) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    });

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
      <div className="container px-4 max-w-[2000px] mx-auto">
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
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center max-w-7xl mx-auto">
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
                  aria-label="Clear search"
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-[2000px] mx-auto"
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
                    <div className="relative overflow-hidden h-64">
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
                      <Button variant="ghost" size="sm" className="gap-1" asChild disabled={!project.demoLink}>
                        <a
                          href={project.demoLink || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className={!project.demoLink ? "pointer-events-none opacity-50" : ""}
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only md:not-sr-only">Working on Demo</span>
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
              className="bg-card w-full max-w-5xl max-h-[90vh] overflow-auto rounded-xl shadow-xl"
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
                  title="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-8">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-3xl font-bold">{selectedProjectData.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProjectData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-secondary/50 hover:bg-secondary text-sm px-3 py-1">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Description</h3>
                    <div className="text-muted-foreground space-y-3">
                      {selectedProjectData.description.split('\n\n').map((line, index) => (
                        <p key={index}>{line}</p>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <h4 className="font-semibold">Features</h4>
                      <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>Responsive design for all devices</li>
                        <li>Intuitive user interface</li>
                        <li>High performance and optimization</li>
                        <li>Secure authentication system</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold">Technical Details</h4>
                      <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>Frontend: React with TypeScript</li>
                        <li>Backend: Node.js with Express</li>
                        <li>Database: MongoDB</li>
                        <li>Deployment: Vercel</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button asChild className="flex-1" disabled={!selectedProjectData.demoLink}>
                      <a 
                        href={selectedProjectData.demoLink || "#"} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={!selectedProjectData.demoLink ? "pointer-events-none opacity-50" : ""}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Working on Demo
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
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

