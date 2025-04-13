"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"

interface SmoothScrollProps {
  children: React.ReactNode
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  
  // Disable smooth scroll on mobile for better performance
  useEffect(() => {
    const isMobile = window.innerWidth <= 768
    if (isMobile) {
      document.documentElement.style.scrollBehavior = "auto"
    } else {
      document.documentElement.style.scrollBehavior = "smooth"
    }

    return () => {
      document.documentElement.style.scrollBehavior = "auto"
    }
  }, [])

  // Only apply smooth scroll spring on desktop
  const smoothScroll = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Only apply parallax on desktop
  const y = useTransform(smoothScroll, [0, 1000], [0, -100])

  return (
    <motion.div
      ref={containerRef}
      style={{ y }}
      className="relative"
    >
      {children}
    </motion.div>
  )
} 