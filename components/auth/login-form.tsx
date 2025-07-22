"use client"

import type React from "react"

import { useActionState, useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, Lock, Mail, LogIn, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useSearchParams } from "next/navigation"
import { authenticate, login, signInWithGoogle } from "@/lib/actions/authActions"

interface LoginFormProps {
  onSuccess?: () => void
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );
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

        <form action={formAction} className="space-y-6">
          <div>
            <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-400" />
              <Input
                id="email"
                type="email"
                name="email"
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
                id="password"
                name="password"
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

          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg"
            >
              {errorMessage}
            </motion.div>
          )}
          <input type="hidden" name="redirectTo" value={callbackUrl} />
          <Button
            aria-disabled={isPending}
            className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white py-3 rounded-lg artistic-button"
          >
            <>
              <LogIn className="w-5 h-5 mr-2" />
              <span className="handwritten">Sign In</span>
            </>
          </Button>
        </form>
        {/* Social Sign-In */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-red-200 dark:border-red-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-red-600 dark:text-red-400 story-text">
                Or sign in with
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={() => login("google")}
                type="button"
                variant="outline"
                className="w-full border-2 border-red-200 dark:border-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 artistic-button bg-white dark:bg-gray-800 social-button relative overflow-hidden"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
                  <g>
                    <path fill="#000" d="M44.5 20H24v8.5h11.7C34.7 33.1 29.9 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.5 6.5 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.2-4z"/>
                  </g>
                </svg>
                <span className="ml-2 handwritten">Google</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={() => login("github")}
                type="button"
                variant="outline"
                className="w-full border-2 border-red-200 dark:border-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 artistic-button bg-white dark:bg-gray-800 social-button relative overflow-hidden"
              >
                <Github className="w-5 h-5" />
                <span className="ml-2 handwritten">GitHub</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Button>
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
