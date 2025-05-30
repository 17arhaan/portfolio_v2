"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useInView, useMotionValue, useTransform } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { CodeCard } from "./3d-code-card"
import { GradientBackground } from "@/components/ui/gradient-background"
import { GlowEffect } from "./ui/glow-effect"

// Updated project data
const projectsData = [
  {
    id: 1,
    title: "Humanoid Simulation",
    description:
      "• Built a MuJoCo-based project for simulating, tracking, and visualizing humanoid movement using Python and React\n\n• Implemented motion tracking with joint angles and velocities capture using MuJoCo physics engine\n\n• Developed LSTM model for motion forecasting and classification with 95% accuracy\n\n• Created an interactive React-based GUI for simulation control and visualization\n\n• Engineered a modular architecture supporting custom models, sensors, and algorithms\n\n• Integrated real-time visualization of MuJoCo scenes with Matplotlib plotting\n\n• Built a comprehensive backend with Python handling simulation, tracking, and ML processing",
    image: "/mujoco.png?height=400&width=600",
    tags: ["Python", "MuJoCo", "React", "TensorFlow", "Flask", "LSTM", "Node.js", "Matplotlib", "TypeScript", "FastAPI"],
    demoLink: null,
    githubLink: "https://github.com/17arhaan/Movement_Tracking_Mujoco",
    categories: ["web", "dl"],
    featured: true,
  },
  {
    id: 2,
    title: "J.A.R.V.I.S",
    description:
      "• Built a sophisticated AI assistant with multi-modal capabilities using Python, TensorFlow, and advanced NLP models\n\n• Implemented real-time object detection with YOLOv8 achieving 91% mAP, and speech recognition with 95% accuracy\n\n• Developed a CNN-based face authentication system with 98% accuracy, supporting multi-user profiles and dynamic learning\n\n• Created a modular architecture with 20+ custom plugins for task automation, system control, and API integrations\n\n• Integrated OpenAI's GPT models for context-aware conversations and task understanding\n\n• Engineered a custom wake word detection system with 99% accuracy using MFCC features and Deep Learning",
    image: "/jarvis_l.png?height=400&width=600",
    tags: ["Python", "TensorFlow", "PyTorch", "YOLOv8", "OpenAI API", "Whisper ASR", "CNN", "RNN", "LSTM", "GRU", "FastAPI"],
    demoLink: null,
    githubLink: "https://github.com/17arhaan/J.A.R.V.I.S",
    categories: ["ai", "dl"],
    featured: true,
  },
  {
    id: 3,
    title: "W.E.A.L.T.H",
    description:
      "• Engineered a full-stack finance tracking application with Next.js 13, TypeScript, and PostgreSQL\n\n• Implemented real-time transaction tracking with WebSocket integration for live updates\n\n• Built a RESTful API with Express.js featuring JWT authentication and role-based access control\n\n• Designed a responsive UI with Tailwind CSS and Framer Motion for smooth animations\n\n• Integrated Plaid API for secure bank account linking and automated transaction imports\n\n• Developed custom analytics dashboard with Chart.js for visualizing spending patterns\n\n• Implemented automated bill detection and recurring payment tracking using ML algorithms",
    image: "/wealth_l.png?height=400&width=600",
    tags: ["Next.js", "TypeScript", "Express.js", "Tailwind CSS", "PostgreSQL", "Prisma", "WebSocket", "JWT", "Plaid API", "Chart.js"],
    demoLink: "https://wealth-rust.vercel.app/dashboard",
    githubLink: "https://github.com/17arhaan/W.E.A.L.T.H",
    categories: ["web"],
    featured: true,
  },
  {
    id: 4,
    title: "Twitter Sentiment Analysis",
    description:
      "• Built a real-time Twitter sentiment analysis platform using Next.js and Python\n\n• Implemented custom NLP models with 92% accuracy for sentiment classification\n\n• Created an interactive dashboard with real-time sentiment visualization using Chart.js\n\n• Developed a secure authentication system with JWT and password hashing\n\n• Built a responsive UI with shadcn/ui components and Tailwind CSS\n\n• Integrated Twitter API for real-time tweet fetching and analysis\n\n• Added user profiles with analysis history and saved searches",
    image: "/sentiment_l.png?height=400&width=600",
    tags: ["Next.js", "TypeScript", "Python", "Tailwind CSS", "Chart.js", "JWT", "shadcn/ui", "Twitter API"],
    demoLink: "https://sentiment-analysis-sepia.vercel.app/",
    githubLink: "https://github.com/17arhaan/Sentiment_Analysis",
    categories: ["data", "ai", "ml"],
    featured: false,
  },
  {
    id: 5,
    title: "SnakeCV",
    description:
      "• Developed a multi-mode Snake Game with computer vision controls using Python, OpenCV, and React\n\n• Implemented real-time hand gesture recognition with 98% accuracy using MediaPipe and custom CV models\n\n• Created an AI agent using Q-learning achieving average scores of 50+ points\n\n• Built a responsive web version with React and TypeScript featuring custom animations\n\n• Designed a replay system storing game states in IndexedDB for offline access\n\n• Integrated WebRTC for real-time multiplayer functionality with <100ms latency\n\n• Added leaderboard system with Firebase real-time database integration",
    image: "/snake_l.png?height=400&width=600",
    tags: ["Python", "OpenCV", "MediaPipe", "React", "TypeScript", "WebRTC", "Firebase", "Q-Learning", "WebGL", "Socket.io"],
    demoLink: null,
    githubLink: "https://github.com/17arhaan/Snake_CV_ML",
    categories: ["cv", "ml", "web"],
    featured: true,
  },
  {
    id: 6,
    title: "TherapAI",
    description:
      "• Built an AI-powered mental health platform using Python, FastAPI, and React\n\n• Integrated GPT-4 with custom fine-tuning for therapeutic conversations achieving 90% user satisfaction\n\n• Implemented real-time emotion detection from text and voice with 94% accuracy\n\n• Developed secure user authentication and HIPAA-compliant data storage\n\n• Created a progressive web app with offline support and push notifications\n\n• Built an emergency response system with automated escalation protocols\n\n• Integrated with external mental health resources and crisis hotlines",
    image: "/therapai.png?height=400&width=600",
    tags: ["Python", "FastAPI", "PyTorch", "TensorFlow", "Transformers", "Hugging Face", "NumPy", "Pandas", "MongoDB", "Docker"],
    demoLink: null,
    githubLink: "https://github.com/17arhaan/TherapAI",
    categories: ["ai", "ml"],
    featured: false,
  },
  {
    id: 7,
    title: "Speedy",
    description:
      "• Built an interactive reaction time test with Next.js and Framer Motion\n\n• Implemented random delay system to prevent anticipation\n\n• Created performance metrics and feedback system\n\n• Added dark mode support and responsive design\n\n• Integrated beautiful animations and transitions\n\n• Developed tracking system for best times\n\n• Deployed on Vercel with automatic CI/CD pipeline",
    image: "/speedy_l.png?height=400&width=600",
    tags: ["Node.js", "TypeScript", "Tailwind CSS", "Framer Motion","Next.js","Vercel","CI/CD","React","Animation"],
    demoLink: "https://speedy-green.vercel.app/",
    githubLink: "https://github.com/17arhaan/Speedy",
    categories: ["web"],
    featured: true,
  },
  {
    id: 8,
    title: "Mind Mapper",
    description:
      "• Built an AI-powered mind map generator using Next.js and React Flow\n\n• Integrated Google Gemini API for intelligent content generation with robust error handling\n\n• Implemented interactive node-based visualization with drag-and-drop functionality\n\n• Created custom node and edge components for enhanced visual appeal\n\n• Added export functionality for saving mind maps as high-quality PNG images\n\n• Developed a responsive design with dark mode support\n\n• Implemented real-time node expansion and connection management\n\n• Added comprehensive error handling and user feedback system",
    image: "/mindmapper_l.png?height=400&width=600",
    tags: ["Next.js", "TypeScript", "React Flow", "Google Gemini API", "Tailwind CSS", "shadcn/ui", "Node.js", "AI/ML", "Error Handling"],
    demoLink: "https://v0-mindmap-app-sigma.vercel.app",
    githubLink: "https://github.com/17arhaan/Mind_Mapper",
    categories: ["web", "ai"],
    featured: true,
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
      return project.categories?.includes(activeCategory);
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
    <section id="projects" ref={sectionRef} className="py-20 bg-muted/30 relative overflow-hidden">
      <GradientBackground />
      <div className="container px-4 sm:px-8 lg:px-16 max-w-[2000px] mx-auto relative z-10">
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
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 max-w-[2000px] mx-auto"
            >
              {filteredProjects.map((project, index) => {
                const x = useMotionValue(0)
                const y = useMotionValue(0)

                const rotateX = useTransform(y, [-100, 100], [10, -10])
                const rotateY = useTransform(x, [-100, 100], [-10, 10])

                const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
                  const rect = event.currentTarget.getBoundingClientRect()
                  const width = rect.width
                  const height = rect.height
                  const mouseX = event.clientX - rect.left
                  const mouseY = event.clientY - rect.top
                  const centerX = mouseX - width / 2
                  const centerY = mouseY - height / 2
                  x.set(centerX)
                  y.set(centerY)
                }

                const handleMouseLeave = () => {
                  x.set(0)
                  y.set(0)
                }

                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }}
                    viewport={{ once: true, margin: "-100px" }}
                    whileHover={{ 
                      y: -15,
                      scale: 1.03,
                      transition: { 
                        duration: 0.3,
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                      }
                    }}
                    className={cn("h-full perspective-1000", project.featured && "sm:col-span-2 lg:col-span-1")}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  >
                    <motion.div
                      style={{
                        rotateX,
                        rotateY,
                        transformStyle: "preserve-3d",
                        transition: "transform 0.1s ease-out"
                      }}
                      className="h-full"
                    >
                      <GlowEffect
                        glowColor="rgba(99, 102, 241, 0.5)"
                        intensity={0.7}
                      >
                        <Card
                          className="h-full overflow-hidden group cursor-pointer border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
                          onClick={() => setSelectedProject(project.id)}
                        >
                          <div className="relative overflow-hidden h-48 sm:h-56">
                            <motion.div
                              initial={{ scale: 1 }}
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.5 }}
                              className="absolute inset-0"
                            >
                              <Image
                                src={project.image || "/placeholder.svg"}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                            </motion.div>
                            <motion.div
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                              className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent"
                            />
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              whileHover={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              className="absolute bottom-0 left-0 right-0 p-4"
                            >
                              <div className="flex flex-wrap gap-1">
                                {project.tags.slice(0, 3).map((tag, tagIndex) => (
                                  <motion.div
                                    key={tag}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: tagIndex * 0.1 }}
                                  >
                                    <Badge variant="secondary" className="bg-secondary/50 hover:bg-secondary text-[10px] sm:text-xs">
                                      {tag}
                                    </Badge>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          </div>
                          <CardHeader className="space-y-2 p-4">
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                            >
                              <CardTitle className="group-hover:text-primary transition-colors duration-300 text-lg sm:text-xl">
                                {project.title}
                              </CardTitle>
                            </motion.div>
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                            >
                              <CardDescription className="line-clamp-2 [&>p]:mb-2 last:[&>p]:mb-0 text-xs sm:text-sm">
                                {project.description.split('\n\n').map((line, index) => (
                                  <p key={index}>{line}</p>
                                ))}
                              </CardDescription>
                            </motion.div>
                          </CardHeader>
                          <CardContent className="pb-2 px-4">
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.4 }}
                              className="flex flex-wrap gap-1 sm:gap-2"
                            >
                              {project.tags.map((tag, tagIndex) => (
                                <motion.div
                                  key={tag}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.4 + tagIndex * 0.05 }}
                                >
                                  <Badge variant="secondary" className="bg-secondary/50 hover:bg-secondary text-[10px] sm:text-xs">
                                    {tag}
                                  </Badge>
                                </motion.div>
                              ))}
                            </motion.div>
                          </CardContent>
                          <CardFooter className="flex justify-between p-4">
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 }}
                            >
                              <Button variant="ghost" size="sm" className="gap-1" asChild>
                                <a
                                  href={project.githubLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Github className="h-3 w-3 sm:h-4 sm:w-4" />
                                  <span className="sr-only sm:not-sr-only text-xs">Code</span>
                                </a>
                              </Button>
                            </motion.div>
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 }}
                            >
                              <Button variant="ghost" size="sm" className="gap-1" asChild disabled={!project.demoLink}>
                                <a
                                  href={project.demoLink || "#"}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className={!project.demoLink ? "pointer-events-none opacity-50" : ""}
                                >
                                  <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                                  <span className="sr-only sm:not-sr-only text-xs">{project.demoLink ? "View Demo" : "Working on Demo"}</span>
                                </a>
                              </Button>
                            </motion.div>
                          </CardFooter>
                        </Card>
                      </GlowEffect>
                    </motion.div>
                  </motion.div>
                )
              })}
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
                        {selectedProjectData.id === 1 && (
                          <>
                            <li>Realistic humanoid movement simulation using MuJoCo physics engine</li>
                            <li>Motion tracking with joint angles and velocities capture</li>
                            <li>LSTM model for motion forecasting and classification</li>
                            <li>Interactive React-based GUI for simulation control</li>
                            <li>Real-time visualization of MuJoCo scenes</li>
                            <li>Modular architecture for custom models and algorithms</li>
                          </>
                        )}
                        {selectedProjectData.id === 2 && (
                          <>
                            <li>Multi-modal AI assistant with voice and text interaction</li>
                            <li>Real-time object detection and recognition</li>
                            <li>Face authentication with multi-user support</li>
                            <li>Custom wake word detection system</li>
                            <li>Task automation with 20+ custom plugins</li>
                            <li>Multi-language support with real-time translation</li>
                          </>
                        )}
                        {selectedProjectData.id === 3 && (
                          <>
                            <li>Full-stack finance tracking application</li>
                            <li>Real-time transaction tracking with WebSocket</li>
                            <li>Secure bank account integration via Plaid</li>
                            <li>Custom analytics dashboard with Chart.js</li>
                            <li>Automated bill detection and tracking</li>
                            <li>Role-based access control system</li>
                          </>
                        )}
                        {selectedProjectData.id === 4 && (
                          <>
                            <li>Twitter sentiment analysis platform</li>
                            <li>Custom NLP models for sentiment classification</li>
                            <li>Interactive dashboard with real-time sentiment visualization</li>
                            <li>Secure authentication system</li>
                            <li>Twitter API integration</li>
                            <li>User profiles with analysis history</li>
                          </>
                        )}
                        {selectedProjectData.id === 5 && (
                          <>
                            <li>Multi-mode Snake Game with computer vision controls</li>
                            <li>Real-time hand gesture recognition</li>
                            <li>AI agent using Q-learning</li>
                            <li>Responsive web version with custom animations</li>
                            <li>Replay system with IndexedDB storage</li>
                            <li>Real-time multiplayer with WebRTC</li>
                          </>
                        )}
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold">Technical Details</h4>
                      <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        {selectedProjectData.id === 1 && (
                          <>
                            <li>MuJoCo physics engine for accurate humanoid simulation</li>
                            <li>LSTM model with 95% accuracy for motion prediction</li>
                            <li>React and TypeScript for responsive frontend</li>
                            <li>FastAPI backend for real-time data processing</li>
                            <li>Matplotlib for advanced motion visualization</li>
                            <li>Flask API for ML model serving</li>
                          </>
                        )}
                        {selectedProjectData.id === 2 && (
                          <>
                            <li>YOLOv8 with 91% mAP for object detection</li>
                            <li>Whisper ASR with 95% speech recognition accuracy</li>
                            <li>CNN-based face auth with 98% accuracy</li>
                            <li>GPT-4 integration with custom prompt engineering</li>
                            <li>FastAPI and WebSocket for real-time communication</li>
                            <li>Redis for distributed caching and state management</li>
                          </>
                        )}
                        {selectedProjectData.id === 3 && (
                          <>
                            <li>Next.js 13 with TypeScript and Tailwind CSS</li>
                            <li>Express.js backend with JWT authentication</li>
                            <li>PostgreSQL with Prisma ORM</li>
                            <li>WebSocket with Redis pub/sub for real-time updates</li>
                            <li>Chart.js and D3.js for data visualization</li>
                            <li>AWS S3 for secure document storage</li>
                          </>
                        )}
                        {selectedProjectData.id === 4 && (
                          <>
                            <li>Next.js and Python for sentiment analysis</li>
                            <li>Custom NLP models with 92% accuracy</li>
                            <li>Interactive dashboard with Chart.js</li>
                            <li>JWT for secure authentication</li>
                            <li>Twitter API for real-time tweet fetching</li>
                            <li>User profiles with analysis history</li>
                          </>
                        )}
                        {selectedProjectData.id === 5 && (
                          <>
                            <li>OpenCV and MediaPipe for hand tracking</li>
                            <li>Q-learning AI agent achieving 50+ points</li>
                            <li>React and TypeScript for web interface</li>
                            <li>WebRTC for multiplayer with {'<'}100ms latency</li>
                            <li>IndexedDB for offline replay storage</li>
                            <li>Firebase for real-time leaderboard</li>
                          </>
                        )}
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
                        {selectedProjectData.demoLink ? "View Demo" : "Working on Demo"}
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

