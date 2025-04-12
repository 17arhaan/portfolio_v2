"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { EasterEggMessage } from "./easter-egg-message"

interface CinematicVideoProps {
  isOpen: boolean
  onClose: () => void
}

export function CinematicVideo({ isOpen, onClose }: CinematicVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isClosing, setIsClosing] = useState(false)
  const [showEasterEgg, setShowEasterEgg] = useState(false)

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
      setIsClosing(false)
      setShowEasterEgg(true)
      setTimeout(() => {
        setShowEasterEgg(false)
      }, 3000)
    }
  }, [isOpen])

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause()
    }
    setIsClosing(true)
    setTimeout(() => {
      onClose()
      setIsClosing(false)
    }, 1000)
  }

  const handleVideoEnd = () => {
    handleClose()
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[9999] bg-black"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ 
                scale: isClosing ? 0.95 : 1,
                opacity: isClosing ? 0 : 1
              }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <div className="w-full max-w-[1920px] aspect-video">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  onEnded={handleVideoEnd}
                  className="w-full h-full object-cover"
                  onClick={(e) => e.stopPropagation()}
                >
                  <source src="/ArhaanGirdhar_MC.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                aria-label="Close video"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <EasterEggMessage 
        message="🎉 Yay! You found the easter egg!" 
        isVisible={showEasterEgg} 
      />
    </>
  )
} 