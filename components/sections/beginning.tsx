import React from 'react'
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ImmersiveHero } from "@/components/immersive-hero"
import { scrollToSection } from '@/app/page'

const Beginning = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative py-20">
      <div className="container mx-auto px-8 max-w-6xl">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="inline-block"
          >
            <div className="chapter-header mb-8">
              <div className="ornamental-border">
                <span className="chapter-number handwritten">Chapter I</span>
              </div>
            </div>
          </motion.div>
        </div>

        <ImmersiveHero />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-center mt-16"
        >
          <div className="artistic-frame p-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg shadow-xl max-w-4xl mx-auto">
            <p className="text-xl text-red-800 dark:text-red-200 leading-relaxed font-light story-text mb-8">
              I am a Frontend Engineer living in Thailand, specializing in modern JavaScript frameworks. With a strong foundation in frontend and backend development, I deliver high-quality solutions while staying updated on emerging technologies. Passionate about tech education, I teach computer science to children and create technical content, combining expertise with knowledge-sharing.
            </p>
            <div className="flex justify-center space-x-4">
              <Button
                onClick={() => scrollToSection("about")}
                className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white px-8 py-4 rounded-full shadow-lg artistic-button"
              >
                <span className="handwritten">Begin Journey</span>
              </Button>
              <Button
                onClick={() => scrollToSection("projects")}
                variant="outline"
                className="border-2 border-red-600 dark:border-red-400 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 px-8 py-4 rounded-full artistic-button"
              >
                <span className="handwritten">View Projects</span>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Beginning