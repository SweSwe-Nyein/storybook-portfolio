"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Plus, MoreHorizontal, Edit, Trash2, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

interface UserManagementUser {
  id: string
  name: string
  email: string
  role: "admin" | "user"
  status: "active" | "inactive"
  lastLogin: string
  joinDate: string
  avatar?: string
}

const mockUsers: UserManagementUser[] = [
  {
    id: "1",
    name: "Swe Admin",
    email: "admin@portfolio.com",
    role: "admin",
    status: "active",
    lastLogin: "2 minutes ago",
    joinDate: "Jan 2023",
    avatar: "/api/placeholder/40/40",
  },
  {
    id: "2",
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    status: "active",
    lastLogin: "1 hour ago",
    joinDate: "Mar 2023",
  },
  {
    id: "3",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "user",
    status: "inactive",
    lastLogin: "2 days ago",
    joinDate: "Feb 2023",
  },
  {
    id: "4",
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "user",
    status: "active",
    lastLogin: "5 hours ago",
    joinDate: "Apr 2023",
  },
]

export function UserManagement() {
  const [users, setUsers] = useState<UserManagementUser[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSelectUser = (userId: string) => {
    setSelectedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  const handleDeleteUser = (userId: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId))
    setSelectedUsers((prev) => prev.filter((id) => id !== userId))
  }

  const handleToggleStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user,
      ),
    )
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-serif text-red-900 dark:text-red-100 handwritten-title">
            User Management
          </h1>
          <p className="text-red-600 dark:text-red-400 story-text">Manage users and their permissions</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white artistic-button self-start sm:self-auto">
          <Plus className="w-4 h-4 mr-2" />
          <span className="handwritten">Add User</span>
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-none shadow-xl p-4 lg:p-6 artistic-frame">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/50 dark:bg-gray-700/50 border-red-200 dark:border-red-700 artistic-input"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" className="artistic-button text-sm">
              All Users
            </Button>
            <Button variant="outline" className="artistic-button text-sm">
              Active
            </Button>
            <Button variant="outline" className="artistic-button text-sm">
              Inactive
            </Button>
          </div>
        </div>
      </Card>

      {/* Users Table */}
      <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-none shadow-xl artistic-frame overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-red-50 dark:bg-red-950/20">
              <tr>
                <th className="text-left p-3 lg:p-4 text-red-900 dark:text-red-100 handwritten">
                  <input
                    type="checkbox"
                    className="rounded border-red-300"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers(filteredUsers.map((u) => u.id))
                      } else {
                        setSelectedUsers([])
                      }
                    }}
                  />
                </th>
                <th className="text-left p-3 lg:p-4 text-red-900 dark:text-red-100 handwritten">User</th>
                <th className="text-left p-3 lg:p-4 text-red-900 dark:text-red-100 handwritten hidden sm:table-cell">
                  Role
                </th>
                <th className="text-left p-3 lg:p-4 text-red-900 dark:text-red-100 handwritten">Status</th>
                <th className="text-left p-3 lg:p-4 text-red-900 dark:text-red-100 handwritten hidden md:table-cell">
                  Last Login
                </th>
                <th className="text-left p-3 lg:p-4 text-red-900 dark:text-red-100 handwritten">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-t border-red-100 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-950/10"
                >
                  <td className="p-3 lg:p-4">
                    <input
                      type="checkbox"
                      className="rounded border-red-300"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                    />
                  </td>
                  <td className="p-3 lg:p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-red-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm lg:text-base flex-shrink-0">
                        {user.avatar ? (
                          <img
                            src={user.avatar || "/placeholder.svg"}
                            alt={user.name}
                            className="w-full h-full rounded-full"
                          />
                        ) : (
                          user.name.charAt(0)
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-red-900 dark:text-red-100 handwritten text-sm lg:text-base truncate">
                          {user.name}
                        </p>
                        <p className="text-xs lg:text-sm text-red-600 dark:text-red-400 story-text truncate">
                          {user.email}
                        </p>
                        <div className="sm:hidden mt-1">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              user.role === "admin"
                                ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                                : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                            }`}
                          >
                            {user.role === "admin" ? <Shield className="w-3 h-3 mr-1" /> : null}
                            {user.role}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 lg:p-4 hidden sm:table-cell">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === "admin"
                          ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                          : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                      }`}
                    >
                      {user.role === "admin" ? <Shield className="w-3 h-3 mr-1" /> : null}
                      {user.role}
                    </span>
                  </td>
                  <td className="p-3 lg:p-4">
                    <button
                      onClick={() => handleToggleStatus(user.id)}
                      className={`inline-flex items-center px-2 lg:px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        user.status === "active"
                          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full mr-1 lg:mr-2 ${
                          user.status === "active" ? "bg-green-500" : "bg-gray-400"
                        }`}
                      />
                      {user.status}
                    </button>
                  </td>
                  <td className="p-3 lg:p-4 text-red-700 dark:text-red-300 story-text text-sm hidden md:table-cell">
                    {user.lastLogin}
                  </td>
                  <td className="p-3 lg:p-4">
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="icon" className="hover:bg-red-100 dark:hover:bg-red-900/20 w-8 h-8">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteUser(user.id)}
                        className="hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 w-8 h-8"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-red-100 dark:hover:bg-red-900/20 w-8 h-8 hidden sm:flex"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bulk Actions */}
        {selectedUsers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-t border-red-100 dark:border-red-800 p-4 bg-red-50 dark:bg-red-950/20"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-red-700 dark:text-red-300 story-text text-sm">
                {selectedUsers.length} user{selectedUsers.length > 1 ? "s" : ""} selected
              </p>
              <div className="flex space-x-2 flex-wrap">
                <Button variant="outline" size="sm" className="artistic-button text-xs">
                  Activate
                </Button>
                <Button variant="outline" size="sm" className="artistic-button text-xs">
                  Deactivate
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50 text-xs">
                  Delete
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-none shadow-xl p-3 lg:p-4 artistic-frame text-center">
          <p className="text-xl lg:text-2xl font-bold text-red-900 dark:text-red-100 handwritten">{users.length}</p>
          <p className="text-red-600 dark:text-red-400 story-text text-xs lg:text-sm">Total Users</p>
        </Card>
        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-none shadow-xl p-3 lg:p-4 artistic-frame text-center">
          <p className="text-xl lg:text-2xl font-bold text-green-600 dark:text-green-400 handwritten">
            {users.filter((u) => u.status === "active").length}
          </p>
          <p className="text-red-600 dark:text-red-400 story-text text-xs lg:text-sm">Active Users</p>
        </Card>
        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-none shadow-xl p-3 lg:p-4 artistic-frame text-center">
          <p className="text-xl lg:text-2xl font-bold text-purple-600 dark:text-purple-400 handwritten">
            {users.filter((u) => u.role === "admin").length}
          </p>
          <p className="text-red-600 dark:text-red-400 story-text text-xs lg:text-sm">Admins</p>
        </Card>
        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-none shadow-xl p-3 lg:p-4 artistic-frame text-center">
          <p className="text-xl lg:text-2xl font-bold text-blue-600 dark:text-blue-400 handwritten">
            {users.filter((u) => u.role === "user").length}
          </p>
          <p className="text-red-600 dark:text-red-400 story-text text-xs lg:text-sm">Regular Users</p>
        </Card>
      </div>
    </div>
  )
}
