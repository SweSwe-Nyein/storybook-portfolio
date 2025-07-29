"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, MapPin, ExternalLink, Briefcase } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { workExperienceData } from "@/types/profile"

const WorkExperienceClient = ({ workExperiences }: { workExperiences: workExperienceData[] }) => {
  const [hoveredExperience, setHoveredExperience] = useState<string | null>(null)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
  }

  const calculateDuration = (startDate: string, endDate: string | null) => {
    const start = new Date(startDate)
    const end = endDate ? new Date(endDate) : new Date()
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())

    if (months < 12) {
      return `${months} month${months !== 1 ? "s" : ""}`
    } else {
      const years = Math.floor(months / 12)
      const remainingMonths = months % 12
      if (remainingMonths === 0) {
        return `${years} year${years !== 1 ? "s" : ""}`
      } else {
        return `${years} year${years !== 1 ? "s" : ""} ${remainingMonths} month${remainingMonths !== 1 ? "s" : ""}`
      }
    }
  }

  return (
    <div id="experience" className="py-20 relative">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <div className="chapter-header mb-8">
          <div className="ornamental-border">
            <span className="chapter-number handwritten">Chapter IV</span>
          </div>
        </div>
        <h2 className="text-5xl font-serif text-red-900 dark:text-red-100 mb-6 handwritten-title">
          Professional Journey
        </h2>
        <p className="text-xl text-red-700 dark:text-red-300 max-w-3xl mx-auto story-text">
          Each role became a stepping stone in my quest to master the art of frontend development...
        </p>
      </motion.div>
      {/* Timeline */}
      <div className="relative container mx-auto px-5 md:px-8 max-w-6xl">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-red-300 via-orange-300 to-red-300 dark:from-red-600 dark:via-orange-600 dark:to-red-600 rounded-full opacity-60" />

        {/* Experience Cards */}
        <div className="space-y-12">
          {workExperiences.map((experience, index) => {
            const isHovered = hoveredExperience === experience.id

            return (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative md:ml-auto md:mr-20 md:pl-0"}`}
                onMouseEnter={() => setHoveredExperience(experience.id)}
                onMouseLeave={() => setHoveredExperience(null)}
              >
                {/* Timeline Node */}
                <motion.div
                  className={`absolute -left-[0.1rem] md:-left-[15px] md:-right-16 md:left-auto"} top-8 w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white shadow-lg z-10`}
                  animate={{
                    scale: isHovered ? 1.2 : 1,
                    boxShadow: isHovered ? "0 0 20px rgba(220, 38, 38, 0.4)" : "0 4px 10px rgba(0, 0, 0, 0.2)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Briefcase className="w-4 h-4" />
                </motion.div>

                {/* Experience Card */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-none shadow-xl p-6 artistic-frame overflow-hidden relative ml-10">
                    {/* Background Gradient */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0`}
                      animate={{ opacity: isHovered ? 0.05 : 0 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-serif text-red-900 dark:text-red-100 handwritten-title">
                            {experience.position}
                          </h3>
                          <span
                            className={`px-2 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-xs handwritten`}
                          >
                            {experience.type}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="text-lg text-red-700 dark:text-red-300 handwritten font-medium">
                            {experience.company}
                          </h4>
                          {experience.companyUrl && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-5 h-5 p-0 hover:bg-red-100 dark:hover:bg-red-900/20"
                              onClick={(e) => {
                                e.stopPropagation()
                                window.open(experience.companyUrl || "", "_blank")
                              }}
                            >
                              <ExternalLink className="w-3 h-3" />
                            </Button>
                          )}
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-red-600 dark:text-red-400 story-text">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {experience.startDate } -  {experience.endDate}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{experience.location}</span>
                          </div>
                        </div>

                        {/* <div className="mt-2 text-xs text-red-500 dark:text-red-500 handwritten">
                          {calculateDuration(experience.startDate, experience.endDate)}
                        </div> */}
                      </div>

                      {/* Current Job Indicator */}
                      {!experience.endDate && (
                        <motion.div
                          className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs handwritten"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        >
                          Current
                        </motion.div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-red-700 dark:text-red-300 story-text leading-relaxed mb-4">
                      {experience.description}
                    </p>

                    {/* Technologies Preview */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {experience.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-xs handwritten artistic-tag"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: techIndex * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default WorkExperienceClient