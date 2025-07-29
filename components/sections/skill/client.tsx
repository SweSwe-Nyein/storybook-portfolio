"use client"

import type React from "react"
import { ElementType, useState } from "react"
import { motion } from "framer-motion"
import { SkillData } from "@/types/profile"
import * as Icons from "lucide-react"

const SkillIcon = ({ name, icon, id, color, hoveredSkill }: { name: string, icon: string | null, id: number, color: string | null, hoveredSkill: number }) => {
  const Icon = Icons[icon as keyof typeof Icons] as ElementType
  return (
    <motion.div
      className={`w-16 h-16 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center text-white mb-6 mx-auto`}
      animate={{
        rotate: hoveredSkill === id ? 5 : 0,
        scale: hoveredSkill === id ? 1.1 : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      <Icon className="w-8 h-8" />
    </motion.div>
  )
}

const InteractiveSkillsClient = ({ skills }: { skills: SkillData[] }) => {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null)

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-5 md:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="chapter-header mb-8">
            <div className="ornamental-border">
              <span className="chapter-number handwritten">Chapter III</span>
            </div>
          </div>
          <h2 className="text-5xl font-serif text-red-900 dark:text-red-100 mb-6 handwritten-title">
            The Magical Arts
          </h2>
          <p className="text-xl text-red-700 dark:text-red-300 max-w-3xl mx-auto story-text">
            Through years of practice and countless moonlit coding sessions, mastering the arts of frontend
            development...
          </p>
        </motion.div>
        <div className="relative">
          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.id}
                className="relative group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredSkill(skill.id)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                {/* Card Background */}
                <motion.div
                  className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl artistic-frame overflow-hidden"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Animated Background Gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br  ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    animate={{
                      opacity: hoveredSkill === skill.id ? 0.1 : 0,
                    }}
                  />

                  {/* Icon */}
                  <SkillIcon  name={skill.name} icon={skill.icon} id={skill.id} color={skill.color} hoveredSkill={hoveredSkill || 0} />

                  {/* Skill Name */}
                  <h3 className="text-xl font-serif text-red-900 dark:text-red-100 mb-4 text-center handwritten">
                    {skill.name}
                  </h3>
                  <p className="text-center text-red-700 dark:text-red-300 leading-relaxed story-text mb-6">
                    {skill.description}
                  </p>
                  <div className="flex flex-wrap gap-3 mb-8">
                    {skill.skills.map((tech, techIndex) => (
                      <motion.span
                        key={tech.id}
                        className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-xs handwritten artistic-tag"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: techIndex * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {tech.name}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default InteractiveSkillsClient;