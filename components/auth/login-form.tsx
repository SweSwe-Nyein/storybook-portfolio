"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, Lock, Mail, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"

interface LoginFormProps {
  onSuccess?: () => void
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }
    router.push("/dashboard")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-none shadow-2xl p-8 artistic-frame">
        <div className="text-center mb-8">
          <motion.div
            className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 rounded-full flex items-center justify-center mx-auto mb-4"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <Lock className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="text-3xl font-serif text-red-900 dark:text-red-100 handwritten-title">Admin Portal</h2>
          <p className="text-red-600 dark:text-red-400 story-text mt-2">
            Enter your credentials to access the dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-400" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-12 artistic-input border-2 border-red-200 dark:border-red-700 focus:border-red-500 dark:focus:border-red-400 rounded-lg bg-white/50 dark:bg-gray-700/50"
                placeholder="admin@portfolio.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-400" />
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-12 pr-12 artistic-input border-2 border-red-200 dark:border-red-700 focus:border-red-500 dark:focus:border-red-400 rounded-lg bg-white/50 dark:bg-gray-700/50"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-400 hover:text-red-600 dark:hover:text-red-300"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg"
            >
              {error}
            </motion.div>
          )}
          <Button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white py-3 rounded-lg artistic-button"
          >
            <>
              <LogIn className="w-5 h-5 mr-2" />
              <span className="handwritten">Sign In</span>
            </>
          </Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-red-600 dark:text-red-400 story-text">
            Demo credentials: admin@portfolio.com / password123
          </p>
        </div>
      </Card>
    </motion.div>
  )
}
