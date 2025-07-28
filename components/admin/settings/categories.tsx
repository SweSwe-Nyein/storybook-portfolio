"use client"

import React from 'react'
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

const Categories = ({activeCategory, setActiveCategory, settingsCategories}: {activeCategory: string, setActiveCategory: React.Dispatch<React.SetStateAction<string>>, settingsCategories: any}) => {
  return (
    <div className="lg:col-span-1">
      <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-none shadow-xl artistic-frame">
        <div className="p-4">
          <h3 className="text-lg font-serif text-red-900 dark:text-red-100 handwritten mb-4">Categories</h3>
          <div className="space-y-2">
            {settingsCategories.map((category: any) => {
              const Icon = category.icon
              const isActive = activeCategory === category.id

              return (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 text-left ${
                    isActive
                      ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                      : "text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-950/20"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className={`w-8 h-8 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center text-white flex-shrink-0`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium handwritten text-sm truncate">{category.title}</p>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Categories