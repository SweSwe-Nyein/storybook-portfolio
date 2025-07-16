"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, Play, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  longDescription: string
  technologies: string[]
  image: string
  liveUrl: string
  githubUrl: string
  features: string[]
  category: string
}

const projects: Project[] = [
  {
    id: "1",
    title: "Storybook Portfolio",
    subtitle: "A Tale of a Developer",
    description: "Built with Framer Motion for dynamic visuals and smooth interactions. Backend in progress with Prisma and MongoDB.",
    longDescription:
      "A comprehensive e-commerce solution built with modern technologies. Features include real-time inventory management, secure payment processing, user authentication, and a responsive design that works seamlessly across all devices. The platform incorporates advanced search functionality, product recommendations, and an intuitive admin dashboard.",
    technologies: ["Next.js", "TypeScript", "Radix UI", "Tailwind CSS", "Framer Motion", "Prisma", "MongoDB"],
    image: "bg-gradient-to-br from-blue-400 via-purple-500 to-pink-600",
    liveUrl: "#",
    githubUrl: "#",
    features: ["Real-time inventory", "Secure payments", "User authentication", "Admin dashboard"],
    category: "Full Stack",
  },
  {
    id: "2",
    title: "SaaS Dashboard",
    subtitle: "Data Visualization Mastery",
    description: "Comprehensive dashboard with real-time analytics and custom charts.",
    longDescription:
      "A powerful SaaS dashboard built with modern React patterns and optimized for performance. Features include real-time analytics, custom data visualizations, role-based access control, and advanced filtering capabilities. The dashboard provides actionable insights through interactive charts and comprehensive reporting tools.",
    technologies: ["React", "TypeScript", "D3.js", "Node.js", "Socket.io"],
    image: "bg-gradient-to-br from-orange-400 via-red-500 to-pink-600",
    liveUrl: "#",
    githubUrl: "#",
    features: ["Real-time analytics", "Custom charts", "Role-based access", "Advanced filtering"],
    category: "Web App",
  },
  // {
  //   id: "3",
  //   title: "Cultural Heritage App",
  //   subtitle: "Preserving Myanmar's Digital Legacy",
  //   description: "React Native app showcasing Myanmar's cultural heritage through interactive storytelling.",
  //   longDescription:
  //     "An immersive mobile application that brings Myanmar's rich cultural heritage to life through interactive storytelling, 3D models, and audio guides. The app features offline functionality for remote areas, multilingual support, and augmented reality experiences that allow users to explore historical sites virtually.",
  //   technologies: ["React Native", "Three.js", "Firebase", "Expo", "AR Kit"],
  //   image: "bg-gradient-to-br from-green-400 via-teal-500 to-blue-600",
  //   liveUrl: "#",
  //   githubUrl: "#",
  //   features: ["3D models", "Audio guides", "Offline functionality", "AR experiences"],
  //   category: "Mobile",
  // },
]

export function ProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  return (
    <section id="projects" className="py-32 relative">
      <div className="container mx-auto px-8 max-w-6xl">
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
            Epic Adventures
          </h2>
          <p className="text-xl text-red-700 dark:text-red-300 max-w-3xl mx-auto story-text">
            Each project became a legendary quest, where React components met user needs and dreams transformed into
            digital reality...
          </p>
        </motion.div>
        <div className="relative">
          {/* Projects Grid */}
          <div className="space-y-16">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Project Info */}
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <motion.div
                    className="artistic-frame bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-8 rounded-2xl shadow-xl"
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm handwritten">
                          {project.category}
                        </span>
                      </div>
                      <h3 className="text-3xl font-serif text-red-900 dark:text-red-100 mb-2 handwritten-title">
                        {project.title}
                      </h3>
                      <p className="text-lg text-red-600 dark:text-red-400 handwritten italic">{project.subtitle}</p>
                    </div>

                    <div className="w-16 h-1 bg-red-500 dark:bg-red-400 mb-6 brush-stroke-line" />

                    <p className="text-red-700 dark:text-red-300 leading-relaxed mb-8 story-text">{project.description}</p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-3 mb-8">
                      {project.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm handwritten artistic-tag"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: techIndex * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4">
                      <Button className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white px-6 py-3 rounded-full artistic-button">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        <span className="handwritten">View Live</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="border-red-600 dark:border-red-400 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 px-6 py-3 rounded-full artistic-button"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        <span className="handwritten">View Code</span>
                      </Button>
                    </div>
                  </motion.div>
                </div>

                {/* Project Visual */}
                <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                  <motion.div
                    className="project-illustration"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className={`${project.image} rounded-2xl p-8 shadow-2xl transform ${
                        index % 2 === 0 ? "rotate-2" : "-rotate-2"
                      } hover:rotate-0 transition-transform duration-500 relative overflow-hidden`}
                      animate={{
                        rotate: hoveredProject === project.id ? 0 : index % 2 === 0 ? 2 : -2,
                      }}
                    >
                        <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg h-64 flex items-center justify-center relative">
                          <img
                            src={`/images/projects/${project.id}.png`}
                            alt={project.title}
                            className="w-full h-full mx-auto shadow-lg object-cover"
                            loading="lazy"
                          />
                        </div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Project Modal */}
          {/* <AnimatePresence>
            {selectedProject && selectedProjectData && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={() => setSelectedProject(null)}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0, y: 50 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.8, opacity: 0, y: 50 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="w-full max-w-4xl max-h-[90vh] bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-3xl shadow-2xl artistic-frame overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className={`bg-gradient-to-r ${selectedProjectData.image} p-6 relative`}>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedProject(null)}
                      className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full"
                    >
                      <X className="w-6 h-6" />
                    </Button>
                    <div className="text-white">
                      <h2 className="text-4xl font-serif mb-2 handwritten-title">{selectedProjectData.title}</h2>
                      <p className="text-xl opacity-90 handwritten italic">{selectedProjectData.subtitle}</p>
                    </div>
                  </div>

                  <div className="p-8 overflow-y-auto max-h-[60vh]">
                    <div className="grid lg:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-2xl font-serif text-red-900 dark:text-red-100 mb-4 handwritten">
                          About This Project
                        </h3>
                        <p className="text-red-700 dark:text-red-300 leading-relaxed story-text mb-6">
                          {selectedProjectData.longDescription}
                        </p>

                        <h4 className="text-xl font-serif text-red-900 dark:text-red-100 mb-4 handwritten">Key Features</h4>
                        <ul className="space-y-2 mb-6">
                          {selectedProjectData.features.map((feature, index) => (
                            <motion.li
                              key={feature}
                              className="flex items-center space-x-3"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <div className="w-2 h-2 bg-red-400 dark:bg-red-500 rounded-full" />
                              <span className="text-red-700 dark:text-red-300 story-text">{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-xl font-serif text-red-900 dark:text-red-100 mb-4 handwritten">
                          Technologies Used
                        </h4>
                        <div className="grid grid-cols-2 gap-3 mb-8">
                          {selectedProjectData.technologies.map((tech, index) => (
                            <motion.div
                              key={tech}
                              className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl text-center handwritten artistic-tag"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.05 }}
                              whileHover={{ scale: 1.05 }}
                            >
                              {tech}
                            </motion.div>
                          ))}
                        </div>

                        <div className="flex space-x-4">
                          <Button className="flex-1 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white py-3 rounded-full artistic-button">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            <span className="handwritten">View Live Demo</span>
                          </Button>
                          <Button
                            variant="outline"
                            className="flex-1 border-red-600 dark:border-red-400 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 py-3 rounded-full artistic-button"
                          >
                            <Github className="w-4 h-4 mr-2" />
                            <span className="handwritten">Source Code</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence> */}
        </div>
      </div>
    </section>
  )
}
