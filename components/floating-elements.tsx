"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function FloatingElements() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  type FloatingElement = {
    id: number
    size: number
    initialX: number
    initialY: number
    deltaX: number
    deltaY: number
    duration: number
  }

  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    setFloatingElements(() =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        size: Math.random() * 15 + 10,
        initialX: Math.random() * window.innerWidth,
        initialY: Math.random() * window.innerHeight,
        deltaX: Math.random() * 100 - 50,
        deltaY: Math.random() * 100 - 50,
        duration: 20 + Math.random() * 10,
      }))
    )
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute opacity-20 dark:opacity-20"
          style={{
            width: element.size,
            height: element.size,
            top: element.initialY,
            left: element.initialX,
          }}
          animate={{
            x: [0, element.deltaX, 0],
            y: [0, element.deltaY, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <path
              d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"
              fill="currentColor"
              className="text-red-400 dark:text-red-600"
            />
          </svg>
        </motion.div>
      ))}

      {/* Interactive light following cursor */}
      <motion.div
        className="absolute w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(220,38,38,0.1) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
        }}
      />
    </div>
  )
}
