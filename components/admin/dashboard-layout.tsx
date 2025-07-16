"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BarChart3, Users, FileText, Settings, LogOut, Menu, X, Home, Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"

interface DashboardLayoutProps {
  children: React.ReactNode
  activeTab: string
  onTabChange: (tab: string) => void
}

const sidebarItems = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "users", label: "Users", icon: Users },
  { id: "content", label: "Content", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
]

export function DashboardLayout({ children, activeTab, onTabChange }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-red-950 book-texture flex">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: sidebarOpen ? 0 : -320,
          width: 320,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed left-0 top-0 h-full w-80 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-2xl z-50 lg:relative lg:translate-x-0 lg:z-auto artistic-frame flex flex-col"
      >
        <div className="flex-1 flex flex-col p-6">
          {/* Logo */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-500 dark:bg-red-600 rounded-full flex items-center justify-center hand-drawn-circle">
                <span className="text-white font-bold">မ</span>
              </div>
              <div>
                <h1 className="text-xl font-serif text-red-900 dark:text-red-100 handwritten">Admin Portal</h1>
                <p className="text-sm text-red-600 dark:text-red-400 story-text">Portfolio Dashboard</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden hover:bg-red-100 dark:hover:bg-red-900/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* User Info */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 rounded-2xl p-4 mb-8 text-white artistic-frame">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hand-drawn-circle">
                <span className="text-lg font-bold">S</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium handwritten truncate">Swe Swe </p>
                <p className="text-sm opacity-90 story-text truncate">sweswe4720@gmail</p>
                <span className="inline-block px-2 py-1 bg-white/20 rounded-full text-xs mt-1 handwritten">
                  Developer
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2 flex-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id

              return (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id)
                    setSidebarOpen(false)
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 relative ${
                    isActive
                      ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                      : "text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-950/20"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="handwritten">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute right-3 w-2 h-2 bg-red-500 rounded-full"
                      transition={{ type: "spring", damping: 25, stiffness: 400 }}
                    />
                  )}
                </motion.button>
              )
            })}
          </nav>

          {/* Logout Button */}
          <div className="mt-6 pt-6 border-t border-red-100 dark:border-red-800">
            <Button
              onClick={() => {}}
              variant="outline"
              className="w-full border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 artistic-button"
            >
              <LogOut className="w-4 h-4 mr-2" />
              <span className="handwritten">Sign Out</span>
            </Button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-b border-red-100 dark:border-red-800 p-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden hover:bg-red-100 dark:hover:bg-red-900/20"
              >
                <Menu className="w-5 h-5" />
              </Button>

              <div className="hidden md:flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search..."
                    className="pl-10 w-64 bg-white/50 dark:bg-gray-700/50 border-red-200 dark:border-red-700 artistic-input"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="relative hover:bg-red-100 dark:hover:bg-red-900/20">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                  3
                </span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.open("/", "_blank")}
                className="hover:bg-red-100 dark:hover:bg-red-900/20"
                title="View Portfolio"
              >
                <Home className="w-5 h-5" />
              </Button>

              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}
