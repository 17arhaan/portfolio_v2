"use client"

import { motion, AnimatePresence } from "framer-motion"

interface EasterEggMessageProps {
  message: string
  isVisible: boolean
}

export function EasterEggMessage({ message, isVisible }: EasterEggMessageProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[10000]"
        >
          <div className="bg-background/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-primary/10 shadow-sm">
            <p className="text-sm font-medium bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent animate-gradient">
              {message}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 