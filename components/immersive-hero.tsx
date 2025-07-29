"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Sparkles, Code, Heart, Palette } from "lucide-react"

export function ImmersiveHero() {
  const [currentWord, setCurrentWord] = useState(0)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  const words = ["Frontend Developer", "Storyteller", "Innovator"]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [words.length])

  return (
    <motion.div style={{ y, opacity }} className="relative">

      {/* Dynamic Text Animation */}
      <div className="text-center relative z-10">
        <motion.div
          className="inline-block"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-8xl lg:text-8xl font-serif text-red-900 dark:text-red-100 leading-tight mb-4 md:mb-8 handwritten-title relative">
            <span className="inline-block">I'm a</span>
            <br />
            <motion.span
              key={currentWord}
              initial={{ y: 50, opacity: 0, rotateX: 0 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              exit={{ y: -50, opacity: 0, rotateX: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-block h-32 text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-500 to-red-700 dark:from-red-400 dark:via-orange-400 dark:to-red-500"
            >
              {words[currentWord]}
            </motion.span>
          </h1>
        </motion.div>
      </div>
    </motion.div>
  )
}
