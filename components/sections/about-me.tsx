'use client'
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { ProfileData } from "@/types/profile"

const AboutMe = ({profile}: {profile: ProfileData}) => {
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-5 md:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="chapter-header mb-8">
            <div className="ornamental-border">
              <span className="chapter-number handwritten">Chapter II</span>
            </div>
          </div>
          <h2 className="text-5xl font-serif text-red-900 dark:text-red-100 mb-6 handwritten-title">
            The Developer's Tale
          </h2>
        </motion.div>

        <div className="md:grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-none shadow-xl p-8 artistic-frame">
              <h3 className="text-3xl font-serif text-red-900 dark:text-red-100 mb-6 handwritten-title">
                My Journey
              </h3>
              <div className="w-16 h-1 bg-red-500 dark:bg-red-400 mb-6 brush-stroke-line" />
              <p className="whitespace-pre-line text-red-700 dark:text-red-300 leading-relaxed story-text">
                { profile.bio }
              </p>
            </Card>

            <div className="grid grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-red-400 to-red-500 dark:from-red-600 dark:to-red-700 text-white p-6 text-center artistic-frame">
                <div className="text-2xl font-bold handwritten">{profile.experienceYears}+</div>
                <div className="text-sm story-text">Years<span className="hidden md:block"> Experience</span></div>
              </Card>
              <Card className="bg-gradient-to-br from-orange-400 to-red-400 dark:from-orange-600 dark:to-red-600 text-white p-6 text-center artistic-frame">
                <div className="text-2xl font-bold handwritten">{profile.projectsCount}+</div>
                <div className="text-sm story-text">Projects<span className="hidden md:block"> Built</span></div>
              </Card>
              <Card className="bg-gradient-to-br from-yellow-400 to-orange-400 dark:from-yellow-600 dark:to-orange-600 text-white p-6 text-center artistic-frame">
                <div className="text-2xl font-bold handwritten">∞</div>
                <div className="text-sm story-text">Passion<span className="hidden md:block"> for code</span></div>
              </Card>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8 mt-8 md:mt-0"
          >
            {/* Large Profile Photo */}
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-none shadow-xl p-8 artistic-frame">
              <div className="w-full h-80 flex items-center justify-center">
                <div className="w-72 h-72 flex items-center justify-center">
                  <div className="text-center text-red-900 dark:text-red-100">
                    <img
                      src="/swe.png"
                      alt="Swe's Profile"
                      className="w-48 h-52 object-cover mx-auto mb-4 border-4 border-red-300 shadow-lg"
                    />
                    <div className="handwritten text-3xl">{profile.name}</div>
                    <div className="story-text text-xl mt-2 opacity-90">{profile.role}</div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 text-white border-none shadow-xl p-6 artistic-frame">
              <h4 className="text-xl font-serif mb-4 handwritten">Philosophy</h4>
              <p className="text-sm story-text opacity-90 leading-relaxed">
                "Code is poetry, design is storytelling, and every pixel has the power to preserve culture while
                embracing the future."
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutMe