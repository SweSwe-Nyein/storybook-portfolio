"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code, Palette, Smartphone, Globe, Database, Zap } from "lucide-react"

interface Skill {
  id: string
  name: string
  icon: React.ReactNode
  level: number
  color: string
  description: string
  technologies: string[]
}

const skills: Skill[] = [
  {
    id: "frontend",
    name: "Frontend Development",
    icon: <Code className="w-8 h-8" />,
    level: 95,
    color: "from-blue-500 to-cyan-500",
    description: "Crafting beautiful, responsive user interfaces with modern frameworks",
    technologies: ["React", "Next.js","TypeScript", "Redux", "Tanstack", "Zustand"],
  },
  {
    id: "design",
    name: "UI/UX Design",
    icon: <Palette className="w-8 h-8" />,
    level: 88,
    color: "from-purple-500 to-pink-500",
    description: "Creating intuitive designs that blend aesthetics with functionality",
    technologies: ["Figma", "Framer", "Principle", "User Accessibility"],
  },
  {
    id: "mobile",
    name: "Mobile Development",
    icon: <Smartphone className="w-8 h-8" />,
    level: 82,
    color: "from-green-500 to-emerald-500",
    description: "Building cross-platform mobile applications with native performance",
    technologies: ["React Native", "Expo", "Flutter", "PWA"],
  },
  {
    id: "web",
    name: "Web Technologies",
    icon: <Globe className="w-8 h-8" />,
    level: 92,
    color: "from-orange-500 to-red-500",
    description: "Mastering the full spectrum of modern web development",
    technologies: ["HTML5", "CSS3", "JavaScript", "WebGL"],
  },
  {
    id: "backend",
    name: "Backend Integration",
    icon: <Database className="w-8 h-8" />,
    level: 78,
    color: "from-indigo-500 to-purple-500",
    description: "Connecting frontends with robust backend services and APIs",
    technologies: ["Node.js", "GraphQL", "REST APIs", "Firebase"],
  },
  {
    id: "performance",
    name: "Performance Optimization",
    icon: <Zap className="w-8 h-8" />,
    level: 90,
    color: "from-yellow-500 to-orange-500",
    description: "Optimizing applications for speed, accessibility, and user experience",
    technologies: ["Webpack", "Vite", "Lighthouse", "Core Web Vitals"],
  },
];

export function InteractiveSkills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  return (
    <section id="skills" className="py-32 relative">
      <div className="container mx-auto px-8 max-w-6xl">
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
                    className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    animate={{
                      opacity: hoveredSkill === skill.id ? 0.1 : 0,
                    }}
                  />

                  {/* Icon */}
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-br ${skill.color} rounded-2xl flex items-center justify-center text-white mb-6 mx-auto`}
                    animate={{
                      rotate: hoveredSkill === skill.id ? 5 : 0,
                      scale: hoveredSkill === skill.id ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {skill.icon}
                  </motion.div>

                  {/* Skill Name */}
                  <h3 className="text-xl font-serif text-red-900 dark:text-red-100 mb-4 text-center handwritten">
                    {skill.name}
                  </h3>
                  <p className="text-center text-red-700 dark:text-red-300 leading-relaxed story-text mb-6">
                    {skill.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-6 flex items-center gap-2">
                    <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.5, delay: index * 0.2 }}
                      />
                    </div>
                    <motion.span
                      className="text-sm font-bold text-red-600 dark:text-red-400 handwritten"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.2 + 1 }}
                    >
                      {skill.level}%
                    </motion.span>
                  </div>
                  <div className="flex flex-wrap gap-3 mb-8">
                    {skill.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-xs handwritten artistic-tag"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: techIndex * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {tech}
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
