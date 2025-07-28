'use client'
import React from 'react'
import { useEffect, useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { FloatingElements } from "@/components/floating-elements"
import { MorphingNavigation } from "@/components/morphing-navigation"
import { scrollToSection } from '@/app/page'
// import { scrollToSection } from '@/app/page'

const UIOverlayElements = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])
  return (
    <div>
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
    </div>
  )
}

export default UIOverlayElements