"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter, usePathname } from "next/navigation"
import {
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  Code,
  FolderOpen,
  Award,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { signOutAction } from "@/lib/actions/authActions"
interface DashboardLayoutProps {
  children: React.ReactNode
  activeTab?: string
}

const sidebarItems = [
  // { id: "overview", label: "Overview", icon: BarChart3, href: "/dashboard" },
  { id: "skills", label: "Skills", icon: Code, href: "/dashboard/skills" },
  { id: "work-experience", label: "Work Experience", icon: Award, href: "/admin/work-experience" },
  { id: "projects", label: "Projects", icon: FolderOpen, href: "/dashboard/projects" },
  { id: "content", label: "Content", icon: FileText, href: "/dashboard/content" },
  { id: "settings", label: "Settings", icon: Settings, href: "/dashboard/settings" },
]

export function DashboardLayout({ children, activeTab }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Determine active tab from pathname if not provided
  const currentActiveTab = activeTab || sidebarItems.find((item) => item.href === pathname)?.id || "overview"

  const handleNavigation = (href: string) => {
    router.push(href)
    // setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-red-950 book-texture flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && <div>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
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
                  <p className="font-medium handwritten truncate">Swe Swe Nyein</p>
                  <p className="text-sm opacity-90 story-text truncate">sweswe4720@gmail.com</p>
                  <span className="inline-block px-2 py-1 bg-white/20 rounded-full text-xs mt-1 handwritten">
                    Frontend Developer
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-2 flex-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon
                const isActive = currentActiveTab === item.id

                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavigation(item.href)}
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
              <form action={signOutAction}>
                <Button
                  variant="outline"
                  className="w-full border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 artistic-button"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  <span className="handwritten">Sign Out</span>
                </Button>
              </form>
            </div>
          </div>
        </motion.aside>
      </div>}
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
            </div>

            <div className="flex items-center space-x-2">
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
            key={pathname}
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
