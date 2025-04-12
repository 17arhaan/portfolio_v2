"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Sun, Moon } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { CinematicVideo } from "@/components/cinematic-video"

// Update the navItems array to include all sections including About Me
const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Experience", href: "/experience" },
  { name: "Skills", href: "/skills" },
  { name: "Certifications", href: "/certifications" },
  { name: "Resume", href: "/resume" },
  { name: "Progress", href: "/code-stats" },
  { name: "Contact", href: "/contact" },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const { setTheme, theme } = useTheme()
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 20)
      
      // Update active section based on scroll position
      const sections = navItems.map(item => ({
        id: item.href.replace("/", ""),
        element: document.getElementById(item.href.replace("/", "")),
      }))
      
      // Find the section that's most visible in the viewport
      let currentSection = sections[0]
      let maxVisibleHeight = 0
      
      sections.forEach(section => {
        if (!section.element) return
        
        const rect = section.element.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        const navbarHeight = 64 // Height of the navbar
        
        // Calculate how much of the section is visible
        const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, navbarHeight)
        
        if (visibleHeight > maxVisibleHeight) {
          maxVisibleHeight = visibleHeight
          currentSection = section
        }
      })
      
      if (currentSection) {
        setActiveSection(currentSection.id)
      }
    }
    
    // Initial check
    handleScroll()
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileMenuOpen(false)

    if (href === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
      setActiveSection("home")
      return
    }

    const targetId = href.replace("/", "")
    const element = document.getElementById(targetId)

    if (element) {
      const offset = 80 // Consistent offset for navbar height
      const elementPosition = element.offsetTop - offset

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })

      setActiveSection(targetId)
    }
  }

  const handleNameClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsVideoOpen(true)
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 w-full z-[100] transition-all duration-300 ease-in-out",
          isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent",
        )}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link
              href="/"
              className="text-xl font-bold tracking-tighter transition-colors"
              onClick={handleNameClick}
            >
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">Arhaan Girdhar</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium transition-colors hover:text-primary rounded-md",
                    activeSection === item.href.replace("/", "") ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {item.name}
                  {activeSection === item.href.replace("/", "") && (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary mx-3"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="ml-2 p-0 hover:bg-transparent"
              >
                <div className="relative h-5 w-5">
                  <Sun className="absolute h-5 w-5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
                </div>
                <span className="sr-only">Toggle theme</span>
              </Button>
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-0 hover:bg-transparent"
            >
              <div className="relative h-5 w-5">
                <Sun className="absolute h-5 w-5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
              </div>
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={mobileMenuOpen ? "close" : "menu"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.div>
              </AnimatePresence>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-background/95 backdrop-blur-md border-b"
            >
              <nav className="container mx-auto py-4 px-4 flex flex-col gap-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={cn(
                        "block py-2 px-3 text-sm font-medium transition-colors hover:text-primary rounded-md",
                        activeSection === item.href.replace("/", "") ? "bg-primary/10 text-primary" : "text-muted-foreground",
                      )}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Cinematic Video Player */}
      <CinematicVideo isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
    </>
  )
}

