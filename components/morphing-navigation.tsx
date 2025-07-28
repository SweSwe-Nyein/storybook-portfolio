"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Home, User, Briefcase, Code, Mail, Menu, X, Workflow } from "lucide-react"

interface NavItem {
  id: string
  label: string
  icon: React.ReactNode
  color: string
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: <Home className="w-5 h-5" />, color: "from-red-500 to-red-600" },
  { id: "about", label: "About", icon: <User className="w-5 h-5" />, color: "from-orange-500 to-red-500" },
  { id: "skills", label: "Skills", icon: <Code className="w-5 h-5" />, color: "from-yellow-500 to-orange-500" },
  { id: "experience", label: "Experience", icon: <Briefcase className="w-5 h-5" />, color: "from-yellow-500 to-orange-500" },
  { id: "projects", label: "Projects", icon: <Workflow className="w-5 h-5" />, color: "from-green-500 to-teal-500" },
  { id: "contact", label: "Contact", icon: <Mail className="w-5 h-5" />, color: "from-blue-500 to-purple-500" },
]

export function MorphingNavigation({ onNavigate }: { onNavigate: (section: string) => void }) {
  const [activeSection, setActiveSection] = useState("home")
  const [isExpanded, setIsExpanded] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "contact"]
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      className="fixed top-8 left-8 z-50"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <motion.div
        className="relative"
        animate={{
          width: isExpanded ? 280 : 50,
          height: isExpanded ? 620 : 50,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {/* Background Blob */}
        <motion.div
          className="absolute inset-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-2xl"
          style={{
            borderRadius: isExpanded ? "24px" : "30px",
          }}
          animate={{
            borderRadius: isExpanded ? "24px" : "30px",
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Toggle Button */}
        <motion.button
          className="absolute top-3 left-3 w-5 h-5 flex items-center justify-center text-red-600 dark:text-red-400 z-10"
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-5 h-5" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="w-5 h-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Navigation Items */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="absolute top-16 left-4 right-4 space-y-3"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  className="w-full relative overflow-hidden rounded-2xl p-4 text-left transition-all duration-300"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => {
                    console.log("Navigating to", item.id)
                    onNavigate(item.id)
                    setIsExpanded(false)
                  }}
                >
                  {/* Background Gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0`}
                    animate={{
                      opacity: activeSection === item.id ? 0.2 : hoveredItem === item.id ? 0.1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Content */}
                  <div className="relative flex items-center space-x-3">
                    <motion.div
                      className={`p-2 rounded-xl bg-gradient-to-r ${item.color} text-white`}
                      animate={{
                        scale: activeSection === item.id ? 1.1 : hoveredItem === item.id ? 1.05 : 1,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.icon}
                    </motion.div>
                    <div>
                      <motion.p
                        className="font-medium text-gray-800 dark:text-gray-200 handwritten"
                        animate={{
                          x: activeSection === item.id ? 5 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.label}
                      </motion.p>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <motion.div
                    className="absolute inset-0 border-2 border-transparent rounded-2xl"
                    animate={{
                      borderColor: hoveredItem === item.id ? "rgba(220, 38, 38, 0.3)" : "none",
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.nav>
  )
}
