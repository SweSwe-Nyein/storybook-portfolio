"use client"

import React from 'react'
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

const Content = ({ activeCategory, renderSettingsContent, settingsCategories }: {activeCategory: string, renderSettingsContent: any, settingsCategories: any}) => {
  return (
    <div className="lg:col-span-3">
      <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-none shadow-xl artistic-frame">
        <div className="p-6">
          <div className="mb-6">
            {settingsCategories.map((category: any) => {
              if (category.id === activeCategory) {
                const Icon = category.icon
                return (
                  <div key={category.id} className="flex items-center space-x-3">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center text-white`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-serif text-red-900 dark:text-red-100 handwritten">
                        {category.title}
                      </h2>
                      <p className="text-red-600 dark:text-red-400 story-text">{category.description}</p>
                    </div>
                  </div>
                )
              }
              return null
            })}
          </div>

          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderSettingsContent()}
          </motion.div>
        </div>
      </Card>
    </div>
  )
}

export default Content