import React from 'react'
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Github, Linkedin, Twitter } from "lucide-react"

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

const HandDrawnMessage = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="hand-drawn-icon">
    <path
      d="M8 12c0-2 2-4 4-4h24c2 0 4 2 4 4v16c0 2-2 4-4 4H16l-8 8V12z"
      stroke="currentColor"
      strokeWidth="2.5"
      fill="none"
      className="wobbly-line"
    />
    <path d="M16 20h16M16 26h12" stroke="currentColor" strokeWidth="2" className="wobbly-line" />
  </svg>
)


const Connection = () => {
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
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-none shadow-xl p-8 artistic-frame">
              <div className="mb-8">
                <HandDrawnMessage />
                <h3 className="text-2xl font-serif text-red-900 dark:text-red-100 mt-4 mb-6 handwritten">
                  Send a Message
                </h3>
              </div>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Your Name</label>
                    <Input className="artistic-input border-2 border-red-200 dark:border-red-700 focus:border-red-500 dark:focus:border-red-400 rounded-lg bg-white/50 dark:bg-gray-700/50" />
                  </div>
                  <div>
                    <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Your Email</label>
                    <Input
                      type="email"
                      className="artistic-input border-2 border-red-200 dark:border-red-700 focus:border-red-500 dark:focus:border-red-400 rounded-lg bg-white/50 dark:bg-gray-700/50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Project Details</label>
                  <Textarea
                    className="artistic-input border-2 border-red-200 dark:border-red-700 focus:border-red-500 dark:focus:border-red-400 rounded-lg min-h-32 bg-white/50 dark:bg-gray-700/50"
                    placeholder="Tell me about your frontend project..."
                  />
                </div>
                <Button className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white py-4 rounded-full artistic-button">
                  <span className="handwritten text-lg">Start Our Journey</span>
                </Button>
              </form>
            </Card>
          </motion.div>

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
                  <a href="mailto:sweswe4720@gmail.com" className="story-text">sweswe4720@gmail.com</a>
                </div>
                {/* <div className="flex items-center space-x-4">
                  <Phone className="w-6 h-6" />
                  <span className="story-text">+66 9 123 456 789</span>
                </div> */}
                <div className="flex items-center space-x-4">
                  <MapPin className="w-6 h-6" />
                  <span className="story-text">Chiang Mai, Thailand</span>
                </div>
              </div>
            </Card>

            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-none shadow-xl p-8 artistic-frame">
              <h4 className="text-xl font-serif text-red-900 dark:text-red-100 mb-4 handwritten">Follow the Code</h4>
              <div className="flex space-x-4">
                <Button
                  size="icon"
                  className="bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 rounded-full artistic-button"
                >
                  <Github className="w-5 h-5" />
                </Button>
                <Button
                  size="icon"
                  className="bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 rounded-full artistic-button"
                >
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button
                  size="icon"
                  className="bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 rounded-full artistic-button"
                >
                  <Twitter className="w-5 h-5" />
                </Button>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-orange-400 to-red-500 dark:from-orange-600 dark:to-red-700 text-white border-none shadow-xl p-6 artistic-frame">
              <div className="text-center flex flex-row items-center">
                <HandDrawnHeart />
                <p className="mt-4 handwritten text-lg">Coded with passion in Myanmar</p>
                {/* <p className="story-text text-sm mt-2 opacity-90">မင်္ဂလာပါ</p> */}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Connection