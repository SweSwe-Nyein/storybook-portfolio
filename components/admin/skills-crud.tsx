"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Plus, Edit, Trash2, Code, Palette, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"

interface SkillCategory {
  id: number
  name: string
  description: string
  skills: Skill[]
}

interface Skill {
  id: number
  name: string
  skillCategoryId: number
}

const mockSkillCategories: SkillCategory[] = [
  {
    id: 1,
    name: "Frontend Development",
    description: "Modern frontend technologies and frameworks",
    skills: [
      { id: 1, name: "React", skillCategoryId: 1 },
      { id: 2, name: "Next.js", skillCategoryId: 1 },
      { id: 3, name: "TypeScript", skillCategoryId: 1 },
      { id: 4, name: "Tailwind CSS", skillCategoryId: 1 },
    ],
  },
  {
    id: 2,
    name: "UI/UX Design",
    description: "Design systems and user experience",
    skills: [
      { id: 5, name: "Figma", skillCategoryId: 2 },
      { id: 6, name: "Adobe XD", skillCategoryId: 2 },
      { id: 7, name: "Framer", skillCategoryId: 2 },
    ],
  },
  {
    id: 3,
    name: "Mobile Development",
    description: "Cross-platform mobile applications",
    skills: [
      { id: 8, name: "React Native", skillCategoryId: 3 },
      { id: 9, name: "Expo", skillCategoryId: 3 },
      { id: 10, name: "Flutter", skillCategoryId: 3 },
    ],
  },
]

const categoryIcons = {
  "Frontend Development": Code,
  "UI/UX Design": Palette,
  "Mobile Development": Smartphone,
}

export function SkillsCRUD() {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>(mockSkillCategories)
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<SkillCategory | null>(null)
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)

  const [categoryFormData, setCategoryFormData] = useState({
    name: "",
    description: "",
  })

  const [skillFormData, setSkillFormData] = useState({
    name: "",
    skillCategoryId: 0,
  })

  const filteredCategories = skillCategories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.skills.some((skill) => skill.name.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleCreateCategory = () => {
    setEditingCategory(null)
    setCategoryFormData({ name: "", description: "" })
    setIsModalOpen(true)
  }

  const handleEditCategory = (category: SkillCategory) => {
    setEditingCategory(category)
    setCategoryFormData({
      name: category.name,
      description: category.description,
    })
    setIsModalOpen(true)
  }

  const handleSubmitCategory = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingCategory) {
      setSkillCategories((prev) =>
        prev.map((cat) =>
          cat.id === editingCategory.id
            ? {
                ...cat,
                ...categoryFormData,
              }
            : cat,
        ),
      )
    } else {
      const newCategory: SkillCategory = {
        id: Date.now(),
        ...categoryFormData,
        skills: [],
      }
      setSkillCategories((prev) => [newCategory, ...prev])
    }

    setIsModalOpen(false)
    setEditingCategory(null)
  }

  const handleDeleteCategory = (categoryId: number) => {
    setSkillCategories((prev) => prev.filter((cat) => cat.id !== categoryId))
  }

  const handleCreateSkill = (categoryId: number) => {
    setEditingSkill(null)
    setSelectedCategoryId(categoryId)
    setSkillFormData({ name: "", skillCategoryId: categoryId })
    setIsSkillModalOpen(true)
  }

  const handleEditSkill = (skill: Skill) => {
    setEditingSkill(skill)
    setSelectedCategoryId(skill.skillCategoryId)
    setSkillFormData({ name: skill.name, skillCategoryId: skill.skillCategoryId })
    setIsSkillModalOpen(true)
  }

  const handleSubmitSkill = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingSkill) {
      setSkillCategories((prev) =>
        prev.map((cat) => ({
          ...cat,
          skills: cat.skills.map((skill) =>
            skill.id === editingSkill.id ? { ...skill, name: skillFormData.name } : skill,
          ),
        })),
      )
    } else {
      const newSkill: Skill = {
        id: Date.now(),
        name: skillFormData.name,
        skillCategoryId: skillFormData.skillCategoryId,
      }
      setSkillCategories((prev) =>
        prev.map((cat) =>
          cat.id === skillFormData.skillCategoryId ? { ...cat, skills: [...cat.skills, newSkill] } : cat,
        ),
      )
    }

    setIsSkillModalOpen(false)
    setEditingSkill(null)
    setSelectedCategoryId(null)
  }

  const handleDeleteSkill = (skillId: number) => {
    setSkillCategories((prev) =>
      prev.map((cat) => ({
        ...cat,
        skills: cat.skills.filter((skill) => skill.id !== skillId),
      })),
    )
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-serif text-red-900 dark:text-red-100 handwritten-title">
            Skills Management
          </h1>
          <p className="text-red-600 dark:text-red-400 story-text">Manage skill categories and individual skills</p>
        </div>
        <Button onClick={handleCreateCategory} className="bg-red-600 hover:bg-red-700 text-white artistic-button">
          <Plus className="w-4 h-4 mr-2" />
          <span className="handwritten">Add Category</span>
        </Button>
      </div>

      {/* Search */}
      <Card className=" bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-none shadow-xl p-4 lg:p-6 artistic-frame">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search categories and skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/50 dark:bg-gray-700/50 border-red-200 dark:border-red-700 artistic-input"
          />
        </div>
      </Card>

      {/* Skills Categories */}
      <div className="space-y-6">
        {filteredCategories.map((category, index) => {
          const IconComponent = categoryIcons[category.name as keyof typeof categoryIcons] || Code

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-none shadow-xl artistic-frame overflow-hidden">
                {/* Category Header */}
                <div className="p-6 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-serif text-red-900 dark:text-red-100 handwritten">
                          {category.name}
                        </h3>
                        <p className="text-red-600 dark:text-red-400 story-text">{category.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleCreateSkill(category.id)}
                          size="sm"
                          variant="outline"
                          className="artistic-button"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add Skill
                        </Button>
                        <Button
                          onClick={() => handleEditCategory(category)}
                          size="sm"
                          variant="outline"
                          className="artistic-button"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => handleDeleteCategory(category.id)}
                          size="sm"
                          variant="outline"
                          className="text-red-600 border-red-300 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills List */}
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.id}
                        className="flex items-center justify-between bg-red-50 dark:bg-red-950/20 rounded-lg p-3 group hover:bg-red-100 dark:hover:bg-red-950/30 transition-colors"
                      >
                        <span className="text-red-800 dark:text-red-200 story-text font-medium">{skill.name}</span>
                        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            onClick={() => handleEditSkill(skill)}
                            size="sm"
                            variant="ghost"
                            className="w-6 h-6 p-0"
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            onClick={() => handleDeleteSkill(skill.id)}
                            size="sm"
                            variant="ghost"
                            className="w-6 h-6 p-0 text-red-600"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {category.skills.length === 0 && (
                      <div className="col-span-full text-center py-8 text-red-500 dark:text-red-500 story-text">
                        No skills added yet. Click "Add Skill" to get started.
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Category Modal */}
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
              className="w-full max-w-md bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl shadow-2xl artistic-frame"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <h2 className="text-2xl font-serif text-red-900 dark:text-red-100 mb-6 handwritten-title">
                  {editingCategory ? "Edit Category" : "Create New Category"}
                </h2>

                <form onSubmit={handleSubmitCategory} className="space-y-4">
                  <div>
                    <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Category Name *</label>
                    <Input
                      value={categoryFormData.name}
                      onChange={(e) => setCategoryFormData({ ...categoryFormData, name: e.target.value })}
                      className="artistic-input"
                      placeholder="e.g., Frontend Development"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Description</label>
                    <Textarea
                      value={categoryFormData.description}
                      onChange={(e) => setCategoryFormData({ ...categoryFormData, description: e.target.value })}
                      className="artistic-input"
                      placeholder="Describe this skill category..."
                      rows={3}
                    />
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <Button type="submit" className="flex-1 bg-red-600 hover:bg-red-700 text-white artistic-button">
                      <span className="handwritten">{editingCategory ? "Update" : "Create"}</span>
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

      {/* Skill Modal */}
      <AnimatePresence>
        {isSkillModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 modal"
            onClick={() => setIsSkillModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="w-full max-w-md bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl shadow-2xl artistic-frame"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <h2 className="text-2xl font-serif text-red-900 dark:text-red-100 mb-6 handwritten-title">
                  {editingSkill ? "Edit Skill" : "Add New Skill"}
                </h2>

                <form onSubmit={handleSubmitSkill} className="space-y-4">
                  <div>
                    <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Skill Name *</label>
                    <Input
                      value={skillFormData.name}
                      onChange={(e) => setSkillFormData({ ...skillFormData, name: e.target.value })}
                      className="artistic-input"
                      placeholder="e.g., React"
                      required
                    />
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <Button type="submit" className="flex-1 bg-red-600 hover:bg-red-700 text-white artistic-button">
                      <span className="handwritten">{editingSkill ? "Update" : "Add"}</span>
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setIsSkillModalOpen(false)}
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
    </div>
  )
}
