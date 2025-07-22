"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Plus, Edit, Trash2, ExternalLink, Github, Calendar, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"

interface Project {
  id: number
  title: string
  subtitle: string
  description: string
  techStack: string[]
  liveUrl: string | null
  codeUrl: string | null
  createdAt: Date
  updatedAt: Date
}

const mockProjects: Project[] = [
  {
    id: 1,
    title: "E-commerce Platform",
    subtitle: "A Tale of Modern Shopping",
    description:
      "Built a full-stack e-commerce platform with React, Next.js, and Stripe integration. Features include real-time inventory, user authentication, and responsive design that works seamlessly across all devices.",
    techStack: ["React", "Next.js", "TypeScript", "Stripe", "Tailwind CSS", "Prisma"],
    liveUrl: "https://example.com",
    codeUrl: "https://github.com/example/ecommerce",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-12-01"),
  },
  {
    id: 2,
    title: "Cultural Heritage App",
    subtitle: "Preserving Myanmar's Digital Legacy",
    description:
      "A React Native application that showcases Myanmar's cultural heritage through interactive storytelling. Features include 3D models, audio guides, and offline functionality for remote areas.",
    techStack: ["React Native", "Three.js", "Firebase", "Expo", "AR Kit"],
    liveUrl: null,
    codeUrl: "https://github.com/example/heritage-app",
    createdAt: new Date("2023-03-20"),
    updatedAt: new Date("2023-11-15"),
  },
  {
    id: 3,
    title: "SaaS Dashboard",
    subtitle: "Data Visualization Mastery",
    description:
      "Developed a comprehensive SaaS dashboard with real-time analytics, custom charts, and role-based access control. Built with modern React patterns and optimized for performance.",
    techStack: ["React", "TypeScript", "D3.js", "Node.js", "Socket.io"],
    liveUrl: "https://dashboard.example.com",
    codeUrl: null,
    createdAt: new Date("2023-06-10"),
    updatedAt: new Date("2023-12-10"),
  },
]

export function ProjectsCRUD() {
  const [projects, setProjects] = useState<Project[]>(mockProjects)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProjects, setSelectedProjects] = useState<number[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    techStack: "",
    liveUrl: "",
    codeUrl: "",
  })

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.techStack.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleCreate = () => {
    setEditingProject(null)
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      techStack: "",
      liveUrl: "",
      codeUrl: "",
    })
    setIsModalOpen(true)
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setFormData({
      title: project.title,
      subtitle: project.subtitle,
      description: project.description,
      techStack: project.techStack.join(", "),
      liveUrl: project.liveUrl || "",
      codeUrl: project.codeUrl || "",
    })
    setIsModalOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const techStackArray = formData.techStack
      .split(",")
      .map((tech) => tech.trim())
      .filter((tech) => tech.length > 0)

    if (editingProject) {
      setProjects((prev) =>
        prev.map((project) =>
          project.id === editingProject.id
            ? {
                ...project,
                title: formData.title,
                subtitle: formData.subtitle,
                description: formData.description,
                techStack: techStackArray,
                liveUrl: formData.liveUrl || null,
                codeUrl: formData.codeUrl || null,
                updatedAt: new Date(),
              }
            : project,
        ),
      )
    } else {
      const newProject: Project = {
        id: Date.now(),
        title: formData.title,
        subtitle: formData.subtitle,
        description: formData.description,
        techStack: techStackArray,
        liveUrl: formData.liveUrl || null,
        codeUrl: formData.codeUrl || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      setProjects((prev) => [newProject, ...prev])
    }

    setIsModalOpen(false)
    setEditingProject(null)
  }

  const handleDelete = (projectId: number) => {
    setProjects((prev) => prev.filter((project) => project.id !== projectId))
    setSelectedProjects((prev) => prev.filter((id) => id !== projectId))
  }

  const handleBulkDelete = () => {
    setProjects((prev) => prev.filter((project) => !selectedProjects.includes(project.id)))
    setSelectedProjects([])
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-serif text-red-900 dark:text-red-100 handwritten-title">
            Projects Management
          </h1>
          <p className="text-red-600 dark:text-red-400 story-text">Manage your portfolio projects and showcases</p>
        </div>
        <Button onClick={handleCreate} className="bg-red-600 hover:bg-red-700 text-white artistic-button">
          <Plus className="w-4 h-4 mr-2" />
          <span className="handwritten">Add Project</span>
        </Button>
      </div>

      {/* Search and Actions */}
      <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-none shadow-xl p-4 lg:p-6 artistic-frame">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search projects by title, description, or technology..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/50 dark:bg-gray-700/50 border-red-200 dark:border-red-700 artistic-input"
            />
          </div>
          {selectedProjects.length > 0 && (
            <Button
              onClick={handleBulkDelete}
              variant="outline"
              className="text-red-600 border-red-300 hover:bg-red-50 artistic-button bg-transparent"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Selected ({selectedProjects.length})
            </Button>
          )}
        </div>
      </Card>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-none shadow-xl artistic-frame hover:scale-105 transition-transform duration-300 h-full">
              <div className="p-6 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-serif text-red-900 dark:text-red-100 handwritten-title truncate">
                      {project.title}
                    </h3>
                    <p className="text-red-600 dark:text-red-400 story-text italic">{project.subtitle}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedProjects.includes(project.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedProjects((prev) => [...prev, project.id])
                      } else {
                        setSelectedProjects((prev) => prev.filter((id) => id !== project.id))
                      }
                    }}
                    className="rounded border-red-300 ml-4"
                  />
                </div>

                {/* Description */}
                <p className="text-red-700 dark:text-red-300 story-text text-sm leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <Tag className="w-4 h-4 text-red-600 dark:text-red-400 mr-2" />
                    <span className="text-sm font-medium text-red-700 dark:text-red-300 handwritten">Tech Stack:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-xs handwritten"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex items-center justify-between mb-4 text-sm">
                  <div className="flex space-x-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Live Demo
                      </a>
                    )}
                    {project.codeUrl && (
                      <a
                        href={project.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-600 dark:text-gray-400 hover:underline"
                      >
                        <Github className="w-3 h-3 mr-1" />
                        Source Code
                      </a>
                    )}
                  </div>
                </div>

                {/* Dates */}
                <div className="flex items-center justify-between text-xs text-red-500 dark:text-red-500 mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    Created: {project.createdAt.toLocaleDateString()}
                  </div>
                  <div>Updated: {project.updatedAt.toLocaleDateString()}</div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleEdit(project)}
                    variant="outline"
                    size="sm"
                    className="flex-1 artistic-button"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(project.id)}
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 modal"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="w-full max-w-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl shadow-2xl artistic-frame max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <h2 className="text-2xl font-serif text-red-900 dark:text-red-100 mb-6 handwritten-title">
                  {editingProject ? "Edit Project" : "Create New Project"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Project Title *</label>
                      <Input
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="artistic-input"
                        placeholder="E-commerce Platform"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Subtitle</label>
                      <Input
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        className="artistic-input"
                        placeholder="A Tale of Modern Shopping"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Description *</label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="artistic-input"
                      placeholder="Describe your project in detail..."
                      rows={4}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">
                      Tech Stack (comma-separated)
                    </label>
                    <Input
                      value={formData.techStack}
                      onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                      className="artistic-input"
                      placeholder="React, Next.js, TypeScript, Tailwind CSS"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Live URL</label>
                      <Input
                        type="url"
                        value={formData.liveUrl}
                        onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                        className="artistic-input"
                        placeholder="https://example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Code URL</label>
                      <Input
                        type="url"
                        value={formData.codeUrl}
                        onChange={(e) => setFormData({ ...formData, codeUrl: e.target.value })}
                        className="artistic-input"
                        placeholder="https://github.com/username/repo"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <Button type="submit" className="flex-1 bg-red-600 hover:bg-red-700 text-white artistic-button">
                      <span className="handwritten">{editingProject ? "Update Project" : "Create Project"}</span>
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      variant="outline"
                      className="flex-1 artistic-button"
                    >
                      <span className="handwritten">Cancel</span>
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-none shadow-xl p-4 artistic-frame text-center">
          <p className="text-2xl font-bold text-red-900 dark:text-red-100 handwritten">{projects.length}</p>
          <p className="text-red-600 dark:text-red-400 story-text text-sm">Total Projects</p>
        </Card>
        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-none shadow-xl p-4 artistic-frame text-center">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 handwritten">
            {projects.reduce((acc, project) => acc + project.techStack.length, 0)}
          </p>
          <p className="text-red-600 dark:text-red-400 story-text text-sm">Technologies Used</p>
        </Card>
        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-none shadow-xl p-4 artistic-frame text-center">
          <p className="text-2xl font-bold text-green-600 dark:text-green-400 handwritten">
            {projects.filter((p) => p.liveUrl).length}
          </p>
          <p className="text-red-600 dark:text-red-400 story-text text-sm">Live Projects</p>
        </Card>
        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-none shadow-xl p-4 artistic-frame text-center">
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 handwritten">
            {projects.filter((p) => p.codeUrl).length}
          </p>
          <p className="text-red-600 dark:text-red-400 story-text text-sm">Open Source</p>
        </Card>
      </div>
    </div>
  )
}
