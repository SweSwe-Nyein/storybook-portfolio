"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProjectData } from "@/types/profile"

const ProjectShowcaseClient = ({projects} : {projects: ProjectData[]}) => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

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
                          {project.tag}
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
                      {project.techStack.map((tech, techIndex) => (
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
                      <Button 
                        onClick={() => window.open(project.liveUrl ?? "", "_blank")} 
                        className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white px-6 py-3 rounded-full artistic-button"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        <span className="handwritten">View Live</span>
                      </Button>
                      <Button
                        onClick={() => window.open(project.codeUrl ?? "", "_blank")}
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
                      className={`relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl artistic-frame overflow-hidden ${
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
        </div>
      </div>
    </section>
  )
}

export default ProjectShowcaseClient