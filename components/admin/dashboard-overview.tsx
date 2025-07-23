"use client"

import { motion } from "framer-motion"
import { Users, Eye, MessageSquare, TrendingUp, Calendar, Globe } from "lucide-react"
import { Card } from "@/components/ui/card"

const stats = [
  {
    title: "Total Visitors",
    value: "12,543",
    change: "+12.5%",
    trend: "up",
    icon: Eye,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Active Users",
    value: "1,234",
    change: "+8.2%",
    trend: "up",
    icon: Users,
    color: "from-green-500 to-green-600",
  },
  {
    title: "Messages",
    value: "89",
    change: "+23.1%",
    trend: "up",
    icon: MessageSquare,
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    change: "-2.1%",
    trend: "down",
    icon: TrendingUp,
    color: "from-orange-500 to-orange-600",
  },
]

const recentActivity = [
  {
    id: 1,
    type: "contact",
    message: "New contact form submission from John Doe",
    time: "2 minutes ago",
    icon: MessageSquare,
  },
  {
    id: 2,
    type: "user",
    message: "New user registration: jane@example.com",
    time: "15 minutes ago",
    icon: Users,
  },
  {
    id: 3,
    type: "view",
    message: "Portfolio viewed 50+ times today",
    time: "1 hour ago",
    icon: Eye,
  },
  {
    id: 4,
    type: "update",
    message: "Project showcase updated successfully",
    time: "3 hours ago",
    icon: Globe,
  },
]

export function DashboardOverview() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-serif text-red-900 dark:text-red-100 mb-2 handwritten-title">
          Dashboard Overview
        </h1>
        <p className="text-red-600 dark:text-red-400 story-text">
          Welcome back! Here's what's happening with your portfolio.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-none shadow-xl p-4 lg:p-6 artistic-frame hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center text-white`}
                  >
                    <Icon className="w-5 h-5 lg:w-6 lg:h-6" />
                  </div>
                  <span
                    className={`text-xs lg:text-sm font-medium ${
                      stat.trend === "up" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-red-900 dark:text-red-100 handwritten">
                  {stat.value}
                </h3>
                <p className="text-red-600 dark:text-red-400 story-text text-sm">{stat.title}</p>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        {/* Visitor Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-none shadow-xl p-4 lg:p-6 artistic-frame h-full">
            <h3 className="text-lg lg:text-xl font-serif text-red-900 dark:text-red-100 mb-4 handwritten">
              Visitor Analytics
            </h3>
            <div className="h-48 lg:h-64 bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl flex items-center justify-center">
              <div className="text-center text-red-600 dark:text-red-400">
                <TrendingUp className="w-8 h-8 lg:w-12 lg:h-12 mx-auto mb-2" />
                <p className="handwritten text-sm lg:text-base">Chart visualization would go here</p>
                <p className="story-text text-xs lg:text-sm mt-1">Integration with analytics service</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-none shadow-xl p-4 lg:p-6 artistic-frame h-full">
            <h3 className="text-lg lg:text-xl font-serif text-red-900 dark:text-red-100 mb-4 handwritten">
              Recent Activity
            </h3>
            <div className="space-y-3 lg:space-y-4 max-h-64 lg:max-h-80 overflow-y-auto">
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                  >
                    <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-red-600 dark:text-red-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-red-800 dark:text-red-200 story-text text-sm leading-relaxed">
                        {activity.message}
                      </p>
                      <p className="text-red-500 dark:text-red-500 text-xs mt-1">{activity.time}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
