"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Calendar,
  MapPin,
  Briefcase,
  Award,
  Users,
  Code2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"

interface WorkExperience {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate: string | null
  description: string
  technologies: string[]
  companyUrl: string | null
  type: string
}

const mockWorkExperiences: WorkExperience[] = [
  {
    id: "1",
    company: "TechVision Myanmar",
    position: "Senior Frontend Developer",
    location: "Yangon, Myanmar",
    startDate: "2022-03",
    endDate: null,
    description:
      "Leading the frontend development team in creating innovative web applications that bridge traditional Myanmar culture with modern technology. Spearheading the development of cultural heritage preservation platforms and e-commerce solutions.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB"],
    companyUrl: "https://techvision.mm",
    type: "full-time",
  },
  {
    id: "2",
    company: "Digital Pagoda Solutions",
    position: "Frontend Developer",
    location: "Mandalay, Myanmar",
    startDate: "2020-06",
    endDate: "2022-02",
    description:
      "Developed modern web applications for local businesses, focusing on creating user-friendly interfaces that respect Myanmar's cultural values while embracing contemporary design principles.",
    technologies: ["React", "Vue.js", "JavaScript", "SASS", "PHP", "MySQL"],
    companyUrl: null,
    type: "full-time",
  },
  {
    id: "3",
    company: "Golden Valley Tech",
    position: "Junior Frontend Developer",
    location: "Yangon, Myanmar",
    startDate: "2019-01",
    endDate: "2020-05",
    description:
      "Started my professional journey in web development, learning the fundamentals while contributing to various client projects. Gained experience in modern JavaScript frameworks and responsive design.",
    technologies: ["HTML5", "CSS3", "JavaScript", "jQuery", "Bootstrap", "Git"],
    companyUrl: null,
    type: "full-time",
  },
  {
    id: "4",
    company: "Freelance Projects",
    position: "Freelance Web Developer",
    location: "Remote",
    startDate: "2018-06",
    endDate: "2018-12",
    description:
      "Worked on various freelance projects while completing my studies, helping small businesses establish their online presence and learning real-world development skills.",
    technologies: ["WordPress", "HTML", "CSS", "JavaScript", "PHP"],
    companyUrl: null,
    type: "freelance",
  },
]

const jobTypes = [
  { value: "full-time", label: "Full-time", icon: Briefcase, color: "from-blue-500 to-blue-600" },
  { value: "contract", label: "Contract", icon: Code2, color: "from-green-500 to-green-600" },
  { value: "freelance", label: "Freelance", icon: Users, color: "from-orange-500 to-orange-600" },
  { value: "internship", label: "Internship", icon: Award, color: "from-purple-500 to-purple-600" },
]

export function WorkExperienceCRUD() {
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>(mockWorkExperiences)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingExperience, setEditingExperience] = useState<WorkExperience | null>(null)

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
    technologies: "",
    companyUrl: "",
    type: "full-time",
  })

  const filteredExperiences = workExperiences.filter(
    (experience) =>
      experience.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      experience.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      experience.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      experience.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      experience.technologies.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleCreate = () => {
    setEditingExperience(null)
    setFormData({
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
      technologies: "",
      companyUrl: "",
      type: "full-time",
    })
    setIsModalOpen(true)
  }

  const handleEdit = (experience: WorkExperience) => {
    setEditingExperience(experience)
    setFormData({
      company: experience.company,
      position: experience.position,
      location: experience.location,
      startDate: experience.startDate,
      endDate: experience.endDate || "",
      description: experience.description,
      technologies: experience.technologies.join(", "),
      companyUrl: experience.companyUrl || "",
      type: experience.type,
    })
    setIsModalOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const technologiesArray = formData.technologies
      .split(",")
      .map((tech) => tech.trim())
      .filter((tech) => tech.length > 0)

    if (editingExperience) {
      setWorkExperiences((prev) =>
        prev.map((experience) =>
          experience.id === editingExperience.id
            ? {
                ...experience,
                company: formData.company,
                position: formData.position,
                location: formData.location,
                startDate: formData.startDate,
                endDate: formData.endDate || null,
                description: formData.description,
                technologies: technologiesArray,
                companyUrl: formData.companyUrl || null,
                type: formData.type,
              }
            : experience,
        ),
      )
    } else {
      const newExperience: WorkExperience = {
        id: Date.now().toString(),
        company: formData.company,
        position: formData.position,
        location: formData.location,
        startDate: formData.startDate,
        endDate: formData.endDate || null,
        description: formData.description,
        technologies: technologiesArray,
        companyUrl: formData.companyUrl || null,
        type: formData.type,
      }
      setWorkExperiences((prev) => [newExperience, ...prev])
    }

    setIsModalOpen(false)
    setEditingExperience(null)
  }

  const handleDelete = (experienceId: string) => {
    setWorkExperiences((prev) => prev.filter((experience) => experience.id !== experienceId))
    setSelectedExperiences((prev) => prev.filter((id) => id !== experienceId))
  }

  const handleBulkDelete = () => {
    setWorkExperiences((prev) => prev.filter((experience) => !selectedExperiences.includes(experience.id)))
    setSelectedExperiences([])
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
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

  const getJobTypeInfo = (type: string) => {
    return jobTypes.find((jt) => jt.value === type) || jobTypes[0]
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-serif text-red-900 dark:text-red-100 handwritten-title">
            Work Experience Management
          </h1>
          <p className="text-red-600 dark:text-red-400 story-text">
            Manage your professional journey and career history
          </p>
        </div>
        <Button onClick={handleCreate} className="bg-red-600 hover:bg-red-700 text-white artistic-button">
          <Plus className="w-4 h-4 mr-2" />
          <span className="handwritten">Add Experience</span>
        </Button>
      </div>

      {/* Search and Actions */}
      <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-none shadow-xl p-4 lg:p-6 artistic-frame">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by company, position, location, or technology..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/50 dark:bg-gray-700/50 border-red-200 dark:border-red-700 artistic-input"
            />
          </div>
          {selectedExperiences.length > 0 && (
            <Button
              onClick={handleBulkDelete}
              variant="outline"
              className="text-red-600 border-red-300 hover:bg-red-50 artistic-button bg-transparent"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Selected ({selectedExperiences.length})
            </Button>
          )}
        </div>
      </Card>

      {/* Work Experiences Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredExperiences.map((experience, index) => {
          const jobTypeInfo = getJobTypeInfo(experience.type)
          const JobTypeIcon = jobTypeInfo.icon

          return (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-none shadow-xl artistic-frame hover:scale-105 transition-transform duration-300 h-full">
                <div className="p-6 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-serif text-red-900 dark:text-red-100 handwritten-title truncate">
                          {experience.position}
                        </h3>
                        <span
                          className={`px-2 py-1 bg-gradient-to-r ${jobTypeInfo.color} text-white rounded-full text-xs handwritten flex items-center space-x-1`}
                        >
                          <JobTypeIcon className="w-3 h-3" />
                          <span>{jobTypeInfo.label}</span>
                        </span>
                      </div>

                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="text-lg text-red-700 dark:text-red-300 handwritten font-medium truncate">
                          {experience.company}
                        </h4>
                        {experience.companyUrl && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-5 h-5 p-0 hover:bg-red-100 dark:hover:bg-red-900/20"
                            onClick={(e) => {
                              e.stopPropagation()
                              window.open(experience.companyUrl!, "_blank")
                            }}
                          >
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        )}
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-red-600 dark:text-red-400 story-text mb-2">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {formatDate(experience.startDate)} -{" "}
                            {experience.endDate ? formatDate(experience.endDate) : "Present"}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span className="truncate">{experience.location}</span>
                        </div>
                      </div>

                      <div className="text-xs text-red-500 dark:text-red-500 handwritten mb-3">
                        {calculateDuration(experience.startDate, experience.endDate)}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {!experience.endDate && (
                        <motion.div
                          className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs handwritten"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        >
                          Current
                        </motion.div>
                      )}
                      <input
                        type="checkbox"
                        checked={selectedExperiences.includes(experience.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedExperiences((prev) => [...prev, experience.id])
                          } else {
                            setSelectedExperiences((prev) => prev.filter((id) => id !== experience.id))
                          }
                        }}
                        className="rounded border-red-300"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-red-700 dark:text-red-300 story-text text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                    {experience.description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <Code2 className="w-4 h-4 text-red-600 dark:text-red-400 mr-2" />
                      <span className="text-sm font-medium text-red-700 dark:text-red-300 handwritten">
                        Technologies:
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.slice(0, 4).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-xs handwritten"
                        >
                          {tech}
                        </span>
                      ))}
                      {experience.technologies.length > 4 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs handwritten">
                          +{experience.technologies.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleEdit(experience)}
                      variant="outline"
                      size="sm"
                      className="flex-1 artistic-button"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(experience.id)}
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
          )
        })}
      </div>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="w-full max-w-4xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl shadow-2xl artistic-frame max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <h2 className="text-2xl font-serif text-red-900 dark:text-red-100 mb-6 handwritten-title">
                  {editingExperience ? "Edit Work Experience" : "Add New Work Experience"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Company Name *</label>
                      <Input
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="artistic-input"
                        placeholder="TechVision Myanmar"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Position *</label>
                      <Input
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        className="artistic-input"
                        placeholder="Senior Frontend Developer"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Location *</label>
                      <Input
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="artistic-input"
                        placeholder="Yangon, Myanmar"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Job Type *</label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full p-2 border border-red-200 dark:border-red-700 rounded-lg bg-white/50 dark:bg-gray-700/50 artistic-input"
                        required
                      >
                        {jobTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Start Date *</label>
                      <Input
                        type="month"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className="artistic-input"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">
                        End Date (Leave empty if current)
                      </label>
                      <Input
                        type="month"
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        className="artistic-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Company URL</label>
                    <Input
                      type="url"
                      value={formData.companyUrl}
                      onChange={(e) => setFormData({ ...formData, companyUrl: e.target.value })}
                      className="artistic-input"
                      placeholder="https://company.com"
                    />
                  </div>

                  <div>
                    <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">
                      Technologies (comma-separated) *
                    </label>
                    <Input
                      value={formData.technologies}
                      onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                      className="artistic-input"
                      placeholder="React, Next.js, TypeScript, Tailwind CSS"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Description *</label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="artistic-input"
                      placeholder="Describe your role, responsibilities, and key contributions..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <Button type="submit" className="flex-1 bg-red-600 hover:bg-red-700 text-white artistic-button">
                      <span className="handwritten">{editingExperience ? "Update Experience" : "Add Experience"}</span>
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
          <p className="text-2xl font-bold text-red-900 dark:text-red-100 handwritten">{workExperiences.length}</p>
          <p className="text-red-600 dark:text-red-400 story-text text-sm">Total Experiences</p>
        </Card>
        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-none shadow-xl p-4 artistic-frame text-center">
          <p className="text-2xl font-bold text-green-600 dark:text-green-400 handwritten">
            {workExperiences.filter((exp) => !exp.endDate).length}
          </p>
          <p className="text-red-600 dark:text-red-400 story-text text-sm">Current Positions</p>
        </Card>
        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-none shadow-xl p-4 artistic-frame text-center">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 handwritten">
            {new Set(workExperiences.flatMap((exp) => exp.technologies)).size}
          </p>
          <p className="text-red-600 dark:text-red-400 story-text text-sm">Unique Technologies</p>
        </Card>
        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-none shadow-xl p-4 artistic-frame text-center">
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 handwritten">
            {workExperiences.filter((exp) => exp.type === "full-time").length}
          </p>
          <p className="text-red-600 dark:text-red-400 story-text text-sm">Full-time Roles</p>
        </Card>
      </div>
    </div>
  )
}
