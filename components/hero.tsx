"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Code, ChevronRight, FileText } from "lucide-react"
import { EasterEggMessage } from "./easter-egg-message"

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showEasterEggHint, setShowEasterEggHint] = useState(true)
  const heroRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window

      // Calculate mouse position as percentage of screen
      setMousePosition({
        x: clientX / innerWidth,
        y: clientY / innerHeight,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []
    const particleCount = 100
    const connectionDistance = 100
    const mouseRadius = 150

    let mouseX = 0
    let mouseY = 0

    // Define Particle class first, before using it
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      originalX: number
      originalY: number
      vx: number
      vy: number
      force: number
      angle: number
      distance: number
      friction: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.originalX = this.x
        this.originalY = this.y
        this.size = Math.random() * 2 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.color = "#8a8a8a"

        // For mouse interaction
        this.vx = 0
        this.vy = 0
        this.force = 0
        this.angle = 0
        this.distance = 0
        this.friction = 0.95
      }

      update() {
        // Mouse interaction with smooth movement
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        this.distance = Math.sqrt(dx * dx + dy * dy)

        if (this.distance < mouseRadius) {
          this.force = (mouseRadius - this.distance) / mouseRadius
          this.angle = Math.atan2(dy, dx)
          this.vx -= this.force * Math.cos(this.angle) * 0.6
          this.vy -= this.force * Math.sin(this.angle) * 0.6
        }

        // Apply friction to slow down particles
        this.vx *= this.friction
        this.vy *= this.friction

        // Move particles
        this.x += this.vx
        this.y += this.vy

        // Slow return to original position
        const dxOrigin = this.originalX - this.x
        const dyOrigin = this.originalY - this.y
        this.x += dxOrigin * 0.01
        this.y += dyOrigin * 0.01

        // Bounce off edges with damping
        if (this.x < 0 || this.x > canvas.width) {
          this.vx *= -0.5
          this.x = this.x < 0 ? 0 : canvas.width
        }
        if (this.y < 0 || this.y > canvas.height) {
          this.vy *= -0.5
          this.y = this.y < 0 ? 0 : canvas.height
        }
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }

    // Define the mouse move handler before using it
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    function initParticles() {
      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    function connectParticles() {
      if (!ctx) return
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            const opacity = 1 - distance / connectionDistance
            ctx.strokeStyle = `rgba(138, 138, 138, ${opacity * 0.2})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      connectParticles()
      animationFrameId = requestAnimationFrame(animate)
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)

    handleResize()
    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  useEffect(() => {
    // Show easter egg hint every 2 minutes for 2 seconds
    const interval = setInterval(() => {
      setShowEasterEggHint(true)
      setTimeout(() => {
        setShowEasterEggHint(false)
      }, 2000)
    }, 120000) // 120 seconds = 2 minutes

    // Initial show
    setShowEasterEggHint(true)
    setTimeout(() => {
      setShowEasterEggHint(false)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  // Calculate parallax effect based on mouse position
  const parallaxX = mousePosition.x * 20 - 10
  const parallaxY = mousePosition.y * 20 - 10

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }} />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-[1]" />

      {/* Animated shapes */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/20 blur-3xl animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-purple-500/20 blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl animate-blob animation-delay-4000" />
      </div>

      <motion.div className="container relative z-10 px-4 py-32 md:py-40" style={{ opacity, scale, y }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6"
            style={{
              transform: `translate(${parallaxX * 0.5}px, ${parallaxY * 0.5}px)`,
            }}
          >
            <span className="block">Hi, I'm </span>
            <motion.span
              className="block bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 15,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% auto",
              }}
            >
              Arhaan Girdhar
            </motion.span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-2xl font-bold mb-4 text-gradient"
          >
            Turning Vision into Reality
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            style={{
              transform: `translate(${parallaxX * 0.2}px, ${parallaxY * 0.2}px)`,
            }}
          >
            Aspiring Software Engineer currently in 3rd year, pursuing Computer Science with a Minor Specialization in
            AI & ML at MIT, Manipal.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" className="rounded-full group relative overflow-hidden" asChild>
              <a href="#projects">
                <span className="relative z-10">View My Work</span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full backdrop-blur-sm" asChild>
              <a href="#contact">Contact Me</a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-10 flex justify-center gap-6"
          >
            {[
              { icon: Linkedin, href: "https://www.linkedin.com/in/arhaan17/", label: "LinkedIn" },
              { icon: Github, href: "https://github.com/17arhaan", label: "GitHub" },
              { icon: Code, href: "https://leetcode.com/arhaan17/", label: "LeetCode" },
              { icon: FileText, href: "#resume", label: "Resume" },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-muted-foreground hover:text-primary transition-colors relative group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
              >
                <social.icon className="h-6 w-6" />
                <span className="sr-only">{social.label}</span>
                <span className="absolute -bottom-2 left-1/2 w-0 h-0.5 bg-primary group-hover:w-full group-hover:left-0 transition-all duration-300" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <a
            href="#projects"
            className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="text-sm mb-2">Scroll Down</span>
            <ArrowDown className="h-5 w-5" />
          </a>
        </motion.div>
      </div>

      <EasterEggMessage 
        message="👀 There's an easter egg hidden somewhere on this website..." 
        isVisible={showEasterEggHint} 
      />
    </section>
  )
}

