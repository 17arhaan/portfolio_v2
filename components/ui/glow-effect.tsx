"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlowEffectProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
  intensity?: number
}

export function GlowEffect({ 
  children, 
  className,
  glowColor = "rgba(99, 102, 241, 0.5)",
  intensity = 0.5 
}: GlowEffectProps) {
  return (
    <motion.div
      className={cn("relative group", className)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)`,
          filter: `blur(${intensity * 20}px)`,
          transform: "translateZ(0)",
        }}
      />
      <motion.div
        className="relative z-10"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
} 