'use client'

import React from 'react'
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mail, MapPin, Github, Linkedin, Instagram } from "lucide-react"
import { ProfileData } from '@/types/profile'
import ContactForm from './form'

// Hand-drawn style icons as SVG components
const HandDrawnHeart = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="hand-drawn-icon">
    <path
      d="M24 42c-1 0-2-1-2-1C14 35 8 29 8 22c0-5 4-9 9-9 3 0 5 1 7 3 2-2 4-3 7-3 5 0 9 4 9 9 0 7-6 13-14 19 0 0-1 1-2 1z"
      stroke="currentColor"
      strokeWidth="2.5"
      fill="none"
      className="wobbly-line"
    />
  </svg>
)

const ConnectionClient = ({profile}: {profile: ProfileData}) => {
  return (
    <section id="contact" className="py-32 relative">
      <div className="container mx-auto px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="chapter-header mb-8">
            <div className="ornamental-border">
              <span className="chapter-number handwritten">Chapter V</span>
            </div>
          </div>
          <h2 className="text-5xl font-serif text-red-900 dark:text-red-100 mb-6 handwritten-title">
            Let's Code Together
          </h2>
          <p className="text-xl text-red-700 dark:text-red-300 max-w-2xl mx-auto story-text">
            Every great application needs collaboration. Let's create the next chapter of digital innovation
            together...
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <ContactForm profile={profile}/>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <Card className="bg-gradient-to-br from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 text-white border-none shadow-xl p-8 artistic-frame">
              <h3 className="text-2xl font-serif mb-6 handwritten">Connect With Me</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Mail className="w-6 h-6" />
                  <a href={`mailto:${profile.email}`} className="story-text">{profile.email}</a>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="w-6 h-6" />
                  <span className="story-text">{profile.address}</span>
                </div>
              </div>
            </Card>

            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-none shadow-xl p-8 artistic-frame">
              <h4 className="text-xl font-serif text-red-900 dark:text-red-100 mb-4 handwritten">Follow the Code</h4>
              <div className="flex space-x-4">
                <Button
                  onClick={() => window.open(profile.githubUrl ?? "", "_blank")}
                  size="icon"
                  className="bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 rounded-full artistic-button"
                >
                  <Github className="w-5 h-5" />
                </Button>
                <Button
                  onClick={() => window.open(profile.linkedInUrl ?? "", "_blank")}
                  size="icon"
                  className="bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 rounded-full artistic-button"
                >
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button
                  onClick={() => window.open(profile.instagramUrl ?? "", "_blank")}
                  size="icon"
                  className="bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 rounded-full artistic-button"
                >
                  <Instagram className="w-5 h-5" />
                </Button>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-orange-400 to-red-500 dark:from-orange-600 dark:to-red-700 text-white border-none shadow-xl p-6 artistic-frame">
              <div className="text-center flex flex-row items-center">
                <HandDrawnHeart />
                <p className="mt-3 handwritten text-lg">Coded with passion in Myanmar</p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ConnectionClient