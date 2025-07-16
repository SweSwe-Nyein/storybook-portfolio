"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

const aiResponses = {
  greeting: [
    "မင်္ဂလာပါ! I'm Swe's AI assistant. I can tell you about their frontend development journey and projects. What would you like to know?",
    "Hello! I'm here to share insights about Swe's work as a frontend developer. Feel free to ask about their skills, projects, or background!",
    "Welcome! I'm Swe's digital storyteller. I can help you learn more about their React expertise and cultural heritage projects.",
  ],
  skills: [
    "Swe is a master of React 18, Next.js 14, and TypeScript. They specialize in creating culturally-rich applications that bridge traditional Myanmar aesthetics with modern web technologies.",
    "Their technical arsenal includes React, Next.js, TypeScript, Tailwind CSS, and Framer Motion. She's particularly skilled at creating responsive designs with smooth animations.",
    "Swe excels in frontend development with React ecosystem, modern JavaScript, CSS3 animations, and has a keen eye for UI/UX design that preserves cultural heritage.",
  ],
  projects: [
    "Swe has built amazing projects including an e-commerce platform with Stripe integration, a cultural heritage app showcasing Myanmar's traditions, and a comprehensive SaaS dashboard with real-time analytics.",
    "Their portfolio includes a React Native app for Myanmar cultural preservation, modern e-commerce solutions, and data visualization dashboards. Each project tells a story while solving real problems.",
    "Notable projects include cultural heritage applications, e-commerce platforms, and SaaS dashboards. Swe combines technical excellence with storytelling to create meaningful digital experiences.",
  ],
  background: [
    "Swe is a frontend developer from Myanmar who combines traditional Burmese aesthetics with modern web development. They believe in preserving culture through digital innovation.",
    "Based in Yangon, Myanmar, Swe brings 3+ years of experience in frontend development. She's passionate about creating applications that honor cultural heritage while embracing modern technology.",
    "Swe's journey began in the golden temples of Yangon, where they learned to blend traditional Myanmar artistry with cutting-edge React development. They've completed 50+ projects with cultural storytelling at heart.",
  ],
  contact: [
    "You can reach Swe at sweswe4720@gmail.com. She's always excited to discuss new projects that combine technology with cultural preservation!",
    "Swe is available for frontend development projects. Contact them via email at sweswe4720@gmail.com or connect through their social media links in the portfolio.",
    "For collaboration opportunities, reach out to Swe at sweswe@gmail.com. She's particularly interested in projects that celebrate cultural heritage through modern web technologies.",
  ],
  default: [
    "That's an interesting question! While I focus on Swe's professional work, I'd be happy to tell you more about their React expertise, cultural projects, or development philosophy.",
    "I'm here to share insights about Swe's frontend development journey. Would you like to know about their technical skills, recent projects, or cultural heritage work?",
    "Let me help you learn more about Swe's work! I can discuss their React mastery, Myanmar-inspired projects, or their approach to blending tradition with technology.",
  ],
}

const getAIResponse = (userMessage: string): string => {
  const message = userMessage.toLowerCase()

  if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
    return aiResponses.greeting[Math.floor(Math.random() * aiResponses.greeting.length)]
  } else if (
    message.includes("skill") ||
    message.includes("tech") ||
    message.includes("react") ||
    message.includes("javascript")
  ) {
    return aiResponses.skills[Math.floor(Math.random() * aiResponses.skills.length)]
  } else if (message.includes("project") || message.includes("work") || message.includes("portfolio")) {
    return aiResponses.projects[Math.floor(Math.random() * aiResponses.projects.length)]
  } else if (
    message.includes("background") ||
    message.includes("about") ||
    message.includes("who") ||
    message.includes("myanmar") ||
    message.includes("burma")
  ) {
    return aiResponses.background[Math.floor(Math.random() * aiResponses.background.length)]
  } else if (
    message.includes("contact") ||
    message.includes("email") ||
    message.includes("reach") ||
    message.includes("hire")
  ) {
    return aiResponses.contact[Math.floor(Math.random() * aiResponses.contact.length)]
  } else {
    return aiResponses.default[Math.floor(Math.random() * aiResponses.default.length)]
  }
}

const TypingIndicator = () => (
  <div className="flex items-center space-x-2 p-4">
    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
      <Bot className="w-4 h-4 text-white" />
    </div>
    <div className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm rounded-2xl px-4 py-3 artistic-frame">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
        <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
        <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  </div>
)

export function AIChatInterface() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Send initial greeting
      const initialMessage: Message = {
        id: "initial",
        content:
          "မင်္ဂလာပါ! I'm Swe's AI assistant. I can tell you about their frontend development journey, projects, and cultural heritage work. What would you like to know?",
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages([initialMessage])
    }
  }, [isOpen, messages.length])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(
      () => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: getAIResponse(inputValue),
          sender: "ai",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, aiResponse])
        setIsTyping(false)
      },
      1500 + Math.random() * 1000,
    ) // Random delay between 1.5-2.5 seconds
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5, type: "spring" }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 hover:from-red-600 hover:to-red-700 dark:hover:from-red-700 dark:hover:to-red-800 text-white shadow-2xl artistic-button relative overflow-hidden"
        >
          <MessageCircle className="w-6 h-6" />
          <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-400 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-white">AI</span>
          </div>
        </Button>
      </motion.div>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-md h-[600px] bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-2xl artistic-frame overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-serif text-lg handwritten">Swe's AI Assistant</h3>
                    <p className="text-white/80 text-sm story-text">Ask me about Swe's work!</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 rounded-full"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[400px] book-texture">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex items-start space-x-2 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.sender === "user" ? "bg-blue-500 dark:bg-blue-600" : "bg-red-500 dark:bg-red-600"
                        }`}
                      >
                        {message.sender === "user" ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <div className="px-2">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                      <div
                        className={`rounded-2xl px-4 py-3 artistic-frame ${
                          message.sender === "user"
                            ? "bg-blue-500 dark:bg-blue-600 text-white"
                            : "bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-red-900 dark:text-red-100"
                        }`}
                      >
                        <p className="text-sm story-text leading-relaxed">{message.content}</p>
                        <p
                          className={`text-xs mt-1 opacity-70 ${
                            message.sender === "user" ? "text-white/70" : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isTyping && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-red-100 dark:border-red-800">
                <div className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about Swe's projects, skills, or background..."
                    className="flex-1 artistic-input border-2 border-red-200 dark:border-red-700 focus:border-red-500 dark:focus:border-red-400 rounded-full px-4 py-2"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white rounded-full px-4 py-2 artistic-button"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                {/* <p className="text-xs text-red-600 dark:text-red-400 mt-2 text-center handwritten">
                  Powered by AI storytelling ✨
                </p> */}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
