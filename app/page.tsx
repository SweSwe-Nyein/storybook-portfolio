"use client"

import { useEffect, useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { AIChatInterface } from "@/components/sections/ai-chat"
import { FloatingElements } from "@/components/floating-elements"
import { MorphingNavigation } from "@/components/morphing-navigation"
import { InteractiveSkills } from "@/components/sections/interactive-skills"
import { ProjectShowcase } from "@/components/sections/project-showcase"
import Footer from "@/components/sections/footer"
import AboutMe from "@/components/sections/about-me"
import Connection from "@/components/sections/connection"
import Beginning from "@/components/sections/beginning"

export const scrollToSection = (sectionId: string) => {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
}
export default function ArtisticPortfolio() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-red-950 relative overflow-x-hidden book-texture transition-colors duration-500">
      {/* Floating Background Elements */}
      <FloatingElements />

      {/* Custom Artistic Cursor */}
      <div
        className="fixed w-8 h-8 pointer-events-none z-50 mix-blend-multiply dark:mix-blend-screen"
        style={{
          left: cursorPosition.x - 16,
          top: cursorPosition.y - 16,
          transform: "translate3d(0, 0, 0)",
        }}
      >
        <div className="w-full h-full border-2 border-red-600 dark:border-red-400 rounded-full opacity-60 animate-pulse brush-stroke" />
      </div>

      {/* Morphing Navigation */}
      <MorphingNavigation onNavigate={scrollToSection} />

      {/* Theme Toggle */}
      <div className="fixed top-8 right-8 z-40">
        <ThemeToggle />
      </div>

      {/* Chapter 1: The Beginning */}
      <Beginning />

      {/* Chapter 2: About Me */}
      <AboutMe />

      {/* Chapter 3: The Skills */}
      <InteractiveSkills />

      {/* Chapter 4: The Adventures (Projects) */}
      <ProjectShowcase />

      {/* Chapter 5: The Connection */}
      <Connection />

      {/* The End */}
      <Footer />

      {/* AI Chat Interface */}
      <AIChatInterface />

      {/* Admin Access Button */}
      {/* <AdminAccessButton /> */}
    </div>
  )
}
