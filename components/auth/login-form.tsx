"use client"

import type React from "react"

import { useActionState, useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, Lock, Mail, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useSearchParams } from "next/navigation"
import { authenticate, signInWithGoogle } from "@/lib/actions/authActions"

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
  const [errorMessage2, formAction2, isPending2] = useActionState(
    signInWithGoogle,
    undefined,
  )
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
        <div className="mt-6 flex flex-col items-center">
          <form action={formAction2} className="space-y-6">
            <input type="hidden" name="redirectTo" value={callbackUrl} />
            <Button
              aria-disabled={isPending2}
              variant="outline"
              className="w-full border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 artistic-button"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
                <g>
                  <path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 33.1 29.9 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.5 6.5 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.2-4z"/>
                  <path fill="#34A853" d="M6.3 14.7l7 5.1C15.2 17.1 19.2 14 24 14c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.5 6.5 29.5 4 24 4c-7.2 0-13.4 4.1-16.7 10.7z"/>
                  <path fill="#FBBC05" d="M24 44c5.5 0 10.5-1.8 14.4-4.9l-6.7-5.5C29.9 36 24 36 24 36c-5.9 0-10.7-2.9-13.7-7.1l-7 5.4C10.6 41.9 16.8 44 24 44z"/>
                  <path fill="#EA4335" d="M44.5 20H24v8.5h11.7C34.7 33.1 29.9 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.5 6.5 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.2-4z"/>
                </g>
              </svg>
              <span className="handwritten">Sign in with Google</span>
            </Button>
          </form>
        </div>
      </Card>
    </motion.div>
  )
}
