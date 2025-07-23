"use client"

import { motion } from "framer-motion"
import { FileText, ImageIcon, Video, Music, Upload, Edit, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const contentTypes = [
  {
    id: "blog",
    title: "Blog Posts",
    description: "Manage blog articles and stories",
    icon: FileText,
    count: 12,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "images",
    title: "Images",
    description: "Portfolio images and media assets",
    icon: ImageIcon,
    count: 45,
    color: "from-green-500 to-green-600",
  },
  {
    id: "videos",
    title: "Videos",
    description: "Project demos and presentations",
    icon: Video,
    count: 8,
    color: "from-purple-500 to-purple-600",
  },
  {
    id: "audio",
    title: "Audio Files",
    description: "Background music and sound effects",
    icon: Music,
    count: 3,
    color: "from-orange-500 to-orange-600",
  },
]

const recentContent = [
  {
    id: 1,
    title: "New Project Showcase",
    type: "Blog Post",
    status: "Published",
    lastModified: "2 hours ago",
    author: "Swe Admin",
  },
  {
    id: 2,
    title: "Hero Background Image",
    type: "Image",
    status: "Active",
    lastModified: "1 day ago",
    author: "Swe Admin",
  },
  {
    id: 3,
    title: "Portfolio Demo Video",
    type: "Video",
    status: "Draft",
    lastModified: "3 days ago",
    author: "Swe Admin",
  },
]

export function ContentManagement() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-serif text-red-900 dark:text-red-100 handwritten-title">
            Content Management
          </h1>
          <p className="text-red-600 dark:text-red-400 story-text">
            Manage your portfolio content, media, and blog posts
          </p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700 text-white artistic-button">
          <Upload className="w-4 h-4 mr-2" />
          <span className="handwritten">Upload Content</span>
        </Button>
      </div>

      {/* Content Types Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {contentTypes.map((type, index) => {
          const Icon = type.icon
          return (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-none shadow-xl p-6 artistic-frame hover:scale-105 transition-transform duration-300 cursor-pointer">
                <div className="text-center">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${type.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-4`}
                  >
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-serif text-red-900 dark:text-red-100 handwritten mb-2">{type.title}</h3>
                  <p className="text-red-600 dark:text-red-400 story-text text-sm mb-4">{type.description}</p>
                  <div className="text-2xl font-bold text-red-900 dark:text-red-100 handwritten">{type.count}</div>
                  <div className="text-sm text-red-500 dark:text-red-500">items</div>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Recent Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-none shadow-xl artistic-frame">
          <div className="p-6">
            <h3 className="text-xl font-serif text-red-900 dark:text-red-100 handwritten mb-6">Recent Content</h3>
            <div className="space-y-4">
              {recentContent.map((content, index) => (
                <motion.div
                  key={content.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-red-900 dark:text-red-100 handwritten">{content.title}</h4>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-red-600 dark:text-red-400 story-text">{content.type}</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          content.status === "Published"
                            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                            : content.status === "Active"
                              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                              : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                        }`}
                      >
                        {content.status}
                      </span>
                      <span className="text-sm text-red-500 dark:text-red-500">{content.lastModified}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" className="hover:bg-red-100 dark:hover:bg-red-900/20">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="hover:bg-red-100 dark:hover:bg-red-900/20">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
