"use client"

import { motion, useMotionValue, useTransform } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface CodeCardProps {
  title: string
  code: string
  language: string
  className?: string
}

export function CodeCard({ title, code, language, className }: CodeCardProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [isVisible, setIsVisible] = useState(false)

  const rotateX = useTransform(y, [-100, 100], [10, -10])
  const rotateY = useTransform(x, [-100, 100], [-10, 10])
  const scale = useTransform(y, [-100, 100], [1, 1.05])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top
    const centerX = mouseX - width / 2
    const centerY = mouseY - height / 2
    x.set(centerX)
    y.set(centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.5 }}
      className={cn("perspective-1000", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
        }}
        className="h-full"
      >
        <Card className="h-full overflow-hidden border border-border/50 hover:border-primary/50 transition-colors duration-300 bg-gradient-to-br from-background to-muted/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{title}</h3>
              <span className="text-xs text-muted-foreground">{language}</span>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-shimmer" />
              <pre className="text-sm font-mono overflow-x-auto p-4 rounded-lg bg-muted/30 backdrop-blur-sm">
                <code className="text-muted-foreground">{code}</code>
              </pre>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
} 