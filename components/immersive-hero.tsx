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
      {/* 3D Floating Cards */}
      {/* <div className="absolute inset-0 perspective-1000">
        <motion.div
          className="absolute top-20 left-10 w-32 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-xl shadow-2xl transform-gpu"
          animate={{
            rotateX: [0, 10, 0],
            rotateY: [0, -10, 0],
            z: [0, 50, 0],
          }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <div className="p-4 text-white">
            <Code className="w-6 h-6 mb-2" />
            <p className="text-xs handwritten">React Master</p>
          </div>
        </motion.div>

        <motion.div
          className="absolute top-40 right-20 w-28 h-28 bg-gradient-to-br from-orange-400 to-red-500 rounded-full shadow-2xl transform-gpu flex items-center justify-center"
          animate={{
            rotateX: [0, -15, 0],
            rotateY: [0, 15, 0],
            z: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
        >
          <Palette className="w-8 h-8 text-white" />
        </motion.div>

        <motion.div
          className="absolute bottom-32 left-1/4 w-24 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-2xl transform-gpu"
          animate={{
            rotateX: [0, 5, 0],
            rotateY: [0, -20, 0],
            z: [0, 40, 0],
          }}
          transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
        >
          <div className="p-3 text-white h-full flex flex-col justify-center items-center">
            <Heart className="w-6 h-6 mb-2" />
            <p className="text-xs handwritten text-center">Cultural Heritage</p>
          </div>
        </motion.div>
      </div> */}

      {/* Dynamic Text Animation */}
      <div className="text-center relative z-10">
        <motion.div
          className="inline-block"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-8xl lg:text-8xl font-serif text-red-900 dark:text-red-100 leading-tight mb-8 handwritten-title relative">
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

        {/* Floating Sparkles */}
        {/* <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
            </motion.div>
          ))}
        </div> */}
      </div>
    </motion.div>
  )
}
