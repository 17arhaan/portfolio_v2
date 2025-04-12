"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function VideoIntro() {
  const [showVideo, setShowVideo] = useState(true)
  const [videoEnded, setVideoEnded] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Check if video has been shown before
    const hasSeenIntro = localStorage.getItem("hasSeenIntro")
    if (hasSeenIntro) {
      setShowVideo(false)
    }
  }, [])

  const handleVideoEnd = () => {
    setVideoEnded(true)
    localStorage.setItem("hasSeenIntro", "true")
    setTimeout(() => {
      setShowVideo(false)
    }, 1500)
  }

  const handleSkip = () => {
    if (videoRef.current) {
      videoRef.current.pause()
    }
    setVideoEnded(true)
    localStorage.setItem("hasSeenIntro", "true")
    setTimeout(() => {
      setShowVideo(false)
    }, 1500)
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  return (
    <AnimatePresence>
      {showVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="relative w-full h-full max-w-[1920px] max-h-[1080px] mx-auto"
          >
            <video
              ref={videoRef}
              autoPlay
              playsInline
              onEnded={handleVideoEnd}
              className="w-full h-full object-contain"
              style={{ backgroundColor: "black" }}
            >
              <source src="/ArhaanGirdhar_MC.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Controls */}
            <div className="absolute top-4 right-4 flex gap-4">
              {/* Mute button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                onClick={toggleMute}
                className="px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-background/90 transition-colors"
              >
                {isMuted ? "🔇" : "🔊"}
              </motion.button>
              
              {/* Skip button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                onClick={handleSkip}
                className="px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-background/90 transition-colors"
              >
                Skip Intro
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 