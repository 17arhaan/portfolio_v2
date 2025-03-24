"use client"

import Link from "next/link"
import { Heart } from "lucide-react"
import { motion } from "framer-motion"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/17arhaan", icon: "github" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/arhaan17/", icon: "linkedin" },
    { name: "LeetCode", href: "https://leetcode.com/arhaan17/", icon: "code" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <footer className="border-t py-6 bg-muted/30">
      <motion.div
        className="container px-4 mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div variants={itemVariants} className="space-y-3">
            <Link href="/" className="inline-block">
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                Arhaan Girdhar
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Aspiring Software Engineer specializing in creating beautiful, functional, and user-friendly applications
              with a focus on AI & ML.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col items-center justify-center">
            <h3 className="text-sm font-medium mb-3 text-muted-foreground">Connect</h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 flex items-center justify-center rounded-full bg-muted hover:bg-primary/10 transition-all duration-300"
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`lucide lucide-${social.icon}`}
                  >
                    {social.icon === "github" && (
                      <>
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                      </>
                    )}
                    {social.icon === "linkedin" && (
                      <>
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect width="4" height="12" x="2" y="9" />
                        <circle cx="4" cy="4" r="2" />
                      </>
                    )}
                    {social.icon === "code" && (
                      <>
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                      </>
                    )}
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col items-center justify-center">
            <div>
              <h3 className="text-sm font-medium mb-3 text-muted-foreground">Contact</h3>
              <ul className="space-y-2">
                <motion.li
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <a
                    href="mailto:17arhaan.connect@gmail.com"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    17arhaan.connect@gmail.com
                  </a>
                </motion.li>
                <motion.li
                  className="text-sm text-muted-foreground"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  Noida, Uttar Pradesh, India
                </motion.li>
              </ul>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col items-end justify-center">
            <div className="text-sm text-muted-foreground">
              <span>&copy; {currentYear} Arhaan Girdhar</span>
              <span className="hidden md:inline mx-2">•</span>
              <span className="hidden md:inline">All rights reserved</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  )
}

