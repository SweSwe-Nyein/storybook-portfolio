"use client"

import { motion } from "framer-motion"
import { Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AdminAccessButton() {
  return (
    <motion.div
      className="fixed bottom-8 left-8 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 3, duration: 0.5, type: "spring" }}
    >
      <Button
        onClick={() => window.open("/admin", "_blank")}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 hover:from-purple-600 hover:to-purple-700 dark:hover:from-purple-700 dark:hover:to-purple-800 text-white shadow-2xl artistic-button relative overflow-hidden"
        title="Admin Dashboard"
      >
        <Shield className="w-6 h-6" />
        <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-400 rounded-full flex items-center justify-center">
          <span className="text-xs font-bold text-white">!</span>
        </div>
      </Button>
    </motion.div>
  )
}
