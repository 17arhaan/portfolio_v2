"use client"

import { motion } from "framer-motion"

interface EasterEggMessageProps {
  message: string
  isVisible: boolean
  onFound?: () => void
}

export function EasterEggMessage({ message, isVisible, onFound }: EasterEggMessageProps) {
  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
      onClick={onFound}
    >
      <div className="bg-background/60 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg text-sm">
        {message}
      </div>
    </motion.div>
  )
} 