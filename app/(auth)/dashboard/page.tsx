"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DashboardLayout } from "@/components/admin/dashboard-layout"
import { DashboardOverview } from "@/components/admin/dashboard-overview"
import { UserManagement } from "@/components/admin/user-management"

function AdminContent() {
  const [activeTab, setActiveTab] = useState("overview")

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <DashboardOverview />
      case "users":
        return <UserManagement />
      case "content":
        return (
          <div className="text-center py-20">
            <h2 className="text-3xl font-serif text-red-900 dark:text-red-100 handwritten-title mb-4">
              Content Management
            </h2>
            <p className="text-red-600 dark:text-red-400 story-text">Content management features coming soon...</p>
          </div>
        )
      case "settings":
        return (
          <div className="text-center py-20">
            <h2 className="text-3xl font-serif text-red-900 dark:text-red-100 handwritten-title mb-4">Settings</h2>
            <p className="text-red-600 dark:text-red-400 story-text">Settings panel coming soon...</p>
          </div>
        )
      default:
        return <DashboardOverview />
    }
  }

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </DashboardLayout>
  )
}

export default function AdminPage() {
  return (
      <AdminContent />
  )
}
