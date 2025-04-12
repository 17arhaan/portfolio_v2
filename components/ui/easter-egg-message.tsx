"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface EasterEggMessageProps {
  easterEggFound: boolean
}

export function EasterEggMessage({ easterEggFound }: EasterEggMessageProps) {
  const [showMessage, setShowMessage] = useState(false)
  const [showFoundMessage, setShowFoundMessage] = useState(false)

  useEffect(() => {
    // Show message immediately on first load
    setShowMessage(true)
    const timeout = setTimeout(() => setShowMessage(false), 5000)

    // Then set up interval for every 2 minutes
    const messageInterval = setInterval(() => {
      if (!easterEggFound) {
        setShowMessage(true)
        setTimeout(() => setShowMessage(false), 5000)
      }
    }, 120000) // 2 minutes

    return () => {
      clearTimeout(timeout)
      clearInterval(messageInterval)
    }
  }, [easterEggFound])

  useEffect(() => {
    if (easterEggFound) {
      setShowFoundMessage(true)
      const foundTimeout = setTimeout(() => setShowFoundMessage(false), 4000)
      return () => clearTimeout(foundTimeout)
    }
  }, [easterEggFound])

  return (
    <AnimatePresence>
      {showMessage && !easterEggFound && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="relative bg-black/80 backdrop-blur-sm p-3 rounded-lg border border-white/10 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-lg" />
            <div className="relative flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              </div>
              <p className="text-xs text-white/90 font-medium">
                There is an Easter egg somewhere here...
              </p>
            </div>
          </div>
        </motion.div>
      )}
      {showFoundMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <div className="relative bg-black/80 backdrop-blur-sm p-3 rounded-lg border border-white/10 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-lg" />
            <div className="relative flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              </div>
              <p className="text-xs text-white/90 font-medium">
                Yay! You found the Easter egg!
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 