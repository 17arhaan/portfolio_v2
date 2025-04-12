import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { MouseAnimation } from "@/components/ui/mouse-animation"
import { Analytics } from "@vercel/analytics/react"
import Script from "next/script"
import { VideoIntro } from "@/components/video-intro"

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Arhaan Girdhar | Portfolio",
  description: "A showcase of my work, skills, and professional experience as a software engineer specializing in AI & ML. Explore my projects, skills, and get in touch for collaborations.",
  keywords: [
    "Arhaan Girdhar", 
    "portfolio", 
    "software engineer", 
    "AI", 
    "ML", 
    "web developer", 
    "MIT Manipal",
    "machine learning",
    "artificial intelligence",
    "full stack developer",
    "react developer",
    "next.js developer",
    "python developer",
    "portfolio website",
    "personal website"
  ],
  authors: [{ name: "Arhaan Girdhar" }],
  creator: "Arhaan Girdhar",
  metadataBase: new URL('https://arhaanportfolio.in'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://arhaanportfolio.in",
    title: "Arhaan Girdhar | Portfolio",
    description: "A showcase of my work, skills, and professional experience as a software engineer specializing in AI & ML. Explore my projects, skills, and get in touch for collaborations.",
    siteName: "Arhaan Girdhar Portfolio",
    images: [
      {
        url: "/favicon.png",
        width: 1200,
        height: 1200,
        alt: "Arhaan Girdhar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arhaan Girdhar | Portfolio",
    description: "A showcase of my work, skills, and professional experience as a software engineer specializing in AI & ML. Explore my projects, skills, and get in touch for collaborations.",
    creator: "@Arrhhaan",
    images: ["/favicon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
    shortcut: '/favicon.ico',
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#000000'
      }
    ],
  },
  manifest: '/site.webmanifest',
  generator: null,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>{`
          html {
            scroll-behavior: smooth;
            scroll-padding-top: 4rem;
          }
          body {
            scroll-behavior: smooth;
            overflow-x: hidden;
          }
          * {
            scroll-margin-top: 4rem;
          }
          .scroll-smooth {
            scroll-behavior: smooth;
            transition: all 0.3s ease-in-out;
          }
          .scroll-smooth:hover {
            transition: all 0.3s ease-in-out;
          }
          @media (prefers-reduced-motion: reduce) {
            html {
              scroll-behavior: auto;
            }
            body {
              scroll-behavior: auto;
            }
            .scroll-smooth {
              transition: none;
            }
          }
        `}</style>
        <Script id="structured-data" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Arhaan Girdhar",
              "url": "https://arhaanportfolio.in",
              "sameAs": [
                "https://github.com/ArhaanGirdhar",
                "https://linkedin.com/in/arhaan-girdhar"
              ],
              "jobTitle": "Software Engineer",
              "worksFor": {
                "@type": "Organization",
                "name": "MIT Manipal"
              }
            }
          `}
        </Script>
      </head>
      <body className={`${inter.className} min-h-screen bg-background scroll-smooth`}>
        <ThemeProvider defaultTheme="system" storageKey="theme">
          <div className="relative flex min-h-screen flex-col">
            <MouseAnimation />
            <Navbar />
            <VideoIntro />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
          <SpeedInsights />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
