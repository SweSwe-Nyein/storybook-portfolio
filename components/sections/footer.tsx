import React from 'react'
import { motion } from "framer-motion"

const Footer = () => {
  return (
    <footer className="py-16 text-center">
      <div className="container mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="artistic-frame bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto shadow-xl"
        >
          <div className="ornamental-border mb-4">
            <span className="chapter-number handwritten">The End</span>
          </div>
          <p className="text-red-700 dark:text-red-300 story-text">But every ending is just a new beginning...</p>
          <div className="flex justify-center space-x-2 mt-6">
            <div className="w-2 h-2 bg-red-400 dark:bg-red-500 rounded-full hand-drawn-dot" />
            <div className="w-2 h-2 bg-orange-400 dark:bg-orange-500 rounded-full hand-drawn-dot" />
            <div className="w-2 h-2 bg-yellow-400 dark:bg-yellow-500 rounded-full hand-drawn-dot" />
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer