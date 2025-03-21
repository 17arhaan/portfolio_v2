"use client"

import Link from "next/link"
import { Heart } from "lucide-react"
import { motion } from "framer-motion"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { name: "Home", href: "#home" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Certifications", href: "#certifications" },
    { name: "Resume", href: "#resume" },
    { name: "Contact", href: "#contact" },
  ]

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/17arhaan", icon: "github" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/arhaan17/", icon: "linkedin" },
    { name: "LeetCode", href: "https://leetcode.com/arhaan17/", icon: "code" },
  ]

  return (
    <footer className="border-t py-12 md:py-16 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <Link href="/" className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                Arhaan Girdhar
              </span>
            </Link>
            <p className="mt-4 text-muted-foreground max-w-xs">
              Aspiring Software Engineer specializing in creating beautiful, functional, and user-friendly applications
              with a focus on AI & ML.
            </p>

            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-muted hover:bg-primary/10 transition-colors"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
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
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0-2-1.5-3-1.5-3-1.5-.28 1.15-.28 2.35 0 3.5C4 9 3 11 3 13c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
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
          </div>

          <div className="md:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 grid grid-cols-1 sm:grid-cols-2">
                  {footerLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors inline-block py-1"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="mailto:arhaan.girdhar@gmail.com"
                      className="text-muted-foreground hover:text-primary transition-colors inline-block py-1"
                    >
                      arhaan.girdhar@gmail.com
                    </a>
                  </li>
                  <li className="text-muted-foreground py-1">Manipal, Karnataka, India</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>&copy; {currentYear} Arhaan Girdhar. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
            <span>using Next.js & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

