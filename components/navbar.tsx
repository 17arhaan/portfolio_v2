"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Moon, Sun, Menu, X } from 'lucide-react'
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

// Update the navItems array to include all sections including About Me
const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Certifications", href: "#certifications" },
  { name: "Resume", href: "#resume" },
  { name: "Progress", href: "#code-stats" },
  { name: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const { theme, setTheme } = useTheme()

  // Handle scroll events
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10)

    // Get all sections
    const sections = navItems.map((item) => {
      const element = document.getElementById(item.href.substring(1))
      return {
        id: item.href.substring(1),
        element,
        top: element?.offsetTop ?? 0,
        bottom: (element?.offsetTop ?? 0) + (element?.offsetHeight ?? 0)
      }
    })

    // Get current scroll position with offset for navbar height
    const scrollPosition = window.scrollY + 80 // Adjusted offset for navbar height

    // Find the current section with more precise boundaries
    const currentSection = sections.find(section => {
      const sectionTop = section.top - 80 // Adjust for navbar height
      const sectionBottom = section.bottom - 80 // Adjust for navbar height
      const isInSection = scrollPosition >= sectionTop && scrollPosition < sectionBottom
      
      // Add a small buffer zone at the top of each section
      const isNearTop = Math.abs(scrollPosition - sectionTop) < 100
      
      return isInSection || isNearTop
    })

    if (currentSection) {
      setActiveSection(currentSection.id)
    }
  }, [])

  useEffect(() => {
    // Initial check for active section
    handleScroll()

    // Add a small delay to ensure all elements are properly loaded
    const timeoutId = setTimeout(() => {
      handleScroll()
    }, 100)

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(timeoutId)
    }
  }, [handleScroll])

  // Handle smooth scrolling with improved offset
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileMenuOpen(false)

    const targetId = href.substring(1)
    const element = document.getElementById(targetId)

    if (element) {
      const offset = 80 // Consistent offset for navbar height
      const elementPosition = element.offsetTop - offset

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })

      // Update URL without page reload
      window.history.pushState(null, "", href)
      setActiveSection(targetId)
    }
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent",
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link
            href="#home"
            className="text-xl font-bold tracking-tighter transition-colors"
            onClick={(e) => handleNavClick(e, "#home")}
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
                  activeSection === item.href.substring(1) ? "text-primary" : "text-muted-foreground",
                )}
              >
                {item.name}
                {activeSection === item.href.substring(1) && (
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
              className="ml-2"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
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
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
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
                      activeSection === item.href.substring(1) ? "bg-primary/10 text-primary" : "text-muted-foreground",
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
  )
}

