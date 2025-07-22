"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Plus, Edit, Trash2, Shield, User, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"

interface AdminUser {
  id: string
  name: string | null
  email: string
  emailVerified: Date | null
  password: string | null
  role: string | null
  bio: string | null
  experienceYears: number
  projectsCount: number
  image: string | null
  createdAt: Date
  updatedAt: Date
}

const mockUsers: AdminUser[] = [
  {
    id: "cuid1",
    name: "Swe Admin",
    email: "admin@portfolio.com",
    emailVerified: new Date(),
    password: "hashed_password",
    role: "admin",
    bio: "Full-stack developer with expertise in React and Node.js",
    experienceYears: 5,
    projectsCount: 12,
    image: "/api/placeholder/100/100",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date(),
  },
  {
    id: "cuid2",
    name: "John Developer",
    email: "john@example.com",
    emailVerified: new Date(),
    password: null,
    role: "user",
    bio: "Frontend developer passionate about UI/UX",
    experienceYears: 3,
    projectsCount: 8,
    image: null,
    createdAt: new Date("2023-03-15"),
    updatedAt: new Date(),
  },
]

export function UsersCRUD() {
  const [users, setUsers] = useState<AdminUser[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    bio: "",
    experienceYears: 0,
    projectsCount: 0,
    image: "",
  })

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleCreate = () => {
    setEditingUser(null)
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "user",
      bio: "",
      experienceYears: 0,
      projectsCount: 0,
      image: "",
    })
    setIsModalOpen(true)
  }

  const handleEdit = (user: AdminUser) => {
    setEditingUser(user)
    setFormData({
      name: user.name || "",
      email: user.email,
      password: "",
      role: user.role || "user",
      bio: user.bio || "",
      experienceYears: user.experienceYears,
      projectsCount: user.projectsCount,
      image: user.image || "",
    })
    setIsModalOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingUser) {
      // Update existing user
      setUsers((prev) =>
        prev.map((user) =>
          user.id === editingUser.id
            ? {
                ...user,
                ...formData,
                updatedAt: new Date(),
              }
            : user,
        ),
      )
    } else {
      // Create new user
      const newUser: AdminUser = {
        id: `cuid${Date.now()}`,
        ...formData,
        name: formData.name || null,
        emailVerified: null,
        password: formData.password || null,
        role: formData.role || null,
        bio: formData.bio || null,
        image: formData.image || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      setUsers((prev) => [newUser, ...prev])
    }

    setIsModalOpen(false)
    setEditingUser(null)
  }

  const handleDelete = (userId: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId))
    setSelectedUsers((prev) => prev.filter((id) => id !== userId))
  }

  const handleBulkDelete = () => {
    setUsers((prev) => prev.filter((user) => !selectedUsers.includes(user.id)))
    setSelectedUsers([])
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-serif text-red-900 dark:text-red-100 handwritten-title">
            Users Management
          </h1>
          <p className="text-red-600 dark:text-red-400 story-text">Manage user accounts and permissions</p>
        </div>
        <Button onClick={handleCreate} className="bg-red-600 hover:bg-red-700 text-white artistic-button">
          <Plus className="w-4 h-4 mr-2" />
          <span className="handwritten">Add User</span>
        </Button>
      </div>

      {/* Search and Actions */}
      <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-none shadow-xl p-4 lg:p-6 artistic-frame">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search users by name, email, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/50 dark:bg-gray-700/50 border-red-200 dark:border-red-700 artistic-input"
            />
          </div>
          {selectedUsers.length > 0 && (
            <Button
              onClick={handleBulkDelete}
              variant="outline"
              className="text-red-600 border-red-300 hover:bg-red-50 artistic-button bg-transparent"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Selected ({selectedUsers.length})
            </Button>
          )}
        </div>
      </Card>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-none shadow-xl p-6 artistic-frame hover:scale-105 transition-transform duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                    {user.image ? (
                      <img
                        src={user.image || "/placeholder.svg"}
                        alt={user.name || ""}
                        className="w-full h-full rounded-full"
                      />
                    ) : (
                      <User className="w-6 h-6" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-red-900 dark:text-red-100 handwritten truncate">
                      {user.name || "Unnamed User"}
                    </h3>
                    <p className="text-sm text-red-600 dark:text-red-400 story-text truncate">{user.email}</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedUsers((prev) => [...prev, user.id])
                    } else {
                      setSelectedUsers((prev) => prev.filter((id) => id !== user.id))
                    }
                  }}
                  className="rounded border-red-300"
                />
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-red-700 dark:text-red-300 story-text">Role:</span>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === "admin"
                        ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                        : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                    }`}
                  >
                    {user.role === "admin" && <Shield className="w-3 h-3 mr-1" />}
                    {user.role || "user"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-red-700 dark:text-red-300 story-text">Experience:</span>
                  <span className="text-sm font-medium text-red-900 dark:text-red-100 handwritten">
                    {user.experienceYears} years
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-red-700 dark:text-red-300 story-text">Projects:</span>
                  <span className="text-sm font-medium text-red-900 dark:text-red-100 handwritten">
                    {user.projectsCount}
                  </span>
                </div>

                {user.bio && (
                  <div>
                    <span className="text-sm text-red-700 dark:text-red-300 story-text">Bio:</span>
                    <p className="text-sm text-red-800 dark:text-red-200 story-text mt-1 line-clamp-2">{user.bio}</p>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-red-500 dark:text-red-500">
                  <span>Created: {user.createdAt.toLocaleDateString()}</span>
                  {user.emailVerified && <span className="text-green-600">✓ Verified</span>}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button onClick={() => handleEdit(user)} variant="outline" size="sm" className="flex-1 artistic-button">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(user.id)}
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
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
              className="w-full max-w-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl shadow-2xl artistic-frame"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <h2 className="text-2xl font-serif text-red-900 dark:text-red-100 mb-6 handwritten-title">
                  {editingUser ? "Edit User" : "Create New User"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Name</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="artistic-input"
                        placeholder="Enter full name"
                      />
                    </div>

                    <div>
                      <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Email *</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="artistic-input"
                        placeholder="Enter email address"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Password</label>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className="artistic-input pr-10"
                          placeholder={editingUser ? "Leave blank to keep current" : "Enter password"}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Role</label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full p-2 border border-red-200 dark:border-red-700 rounded-lg bg-white/50 dark:bg-gray-700/50 artistic-input"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="moderator">Moderator</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">
                        Experience (Years)
                      </label>
                      <Input
                        type="number"
                        value={formData.experienceYears}
                        onChange={(e) =>
                          setFormData({ ...formData, experienceYears: Number.parseInt(e.target.value) || 0 })
                        }
                        className="artistic-input"
                        min="0"
                        max="50"
                      />
                    </div>

                    <div>
                      <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Projects Count</label>
                      <Input
                        type="number"
                        value={formData.projectsCount}
                        onChange={(e) =>
                          setFormData({ ...formData, projectsCount: Number.parseInt(e.target.value) || 0 })
                        }
                        className="artistic-input"
                        min="0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Profile Image URL</label>
                    <Input
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="artistic-input"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div>
                    <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Bio</label>
                    <Textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="artistic-input"
                      placeholder="Tell us about this user..."
                      rows={3}
                    />
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <Button type="submit" className="flex-1 bg-red-600 hover:bg-red-700 text-white artistic-button">
                      <span className="handwritten">{editingUser ? "Update User" : "Create User"}</span>
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
          <p className="text-2xl font-bold text-red-900 dark:text-red-100 handwritten">{users.length}</p>
          <p className="text-red-600 dark:text-red-400 story-text text-sm">Total Users</p>
        </Card>
        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-none shadow-xl p-4 artistic-frame text-center">
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 handwritten">
            {users.filter((u) => u.role === "admin").length}
          </p>
          <p className="text-red-600 dark:text-red-400 story-text text-sm">Admins</p>
        </Card>
        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-none shadow-xl p-4 artistic-frame text-center">
          <p className="text-2xl font-bold text-green-600 dark:text-green-400 handwritten">
            {users.filter((u) => u.emailVerified).length}
          </p>
          <p className="text-red-600 dark:text-red-400 story-text text-sm">Verified</p>
        </Card>
        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-none shadow-xl p-4 artistic-frame text-center">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 handwritten">
            {Math.round(users.reduce((acc, u) => acc + u.experienceYears, 0) / users.length) || 0}
          </p>
          <p className="text-red-600 dark:text-red-400 story-text text-sm">Avg Experience</p>
        </Card>
      </div>
    </div>
  )
}
