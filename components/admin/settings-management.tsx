"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Shield, Bell, Palette, Globe, Database, Key } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

const settingsCategories = [
  {
    id: "profile",
    title: "Profile Settings",
    description: "Personal information and preferences",
    icon: User,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "security",
    title: "Security",
    description: "Password and authentication settings",
    icon: Shield,
    color: "from-red-500 to-red-600",
  },
  {
    id: "notifications",
    title: "Notifications",
    description: "Email and push notification preferences",
    icon: Bell,
    color: "from-yellow-500 to-yellow-600",
  },
  {
    id: "appearance",
    title: "Appearance",
    description: "Theme and display customization",
    icon: Palette,
    color: "from-purple-500 to-purple-600",
  },
  {
    id: "site",
    title: "Site Settings",
    description: "General website configuration",
    icon: Globe,
    color: "from-green-500 to-green-600",
  },
  {
    id: "database",
    title: "Database",
    description: "Database connection and backup settings",
    icon: Database,
    color: "from-indigo-500 to-indigo-600",
  },
]

export function SettingsManagement() {
  const [activeCategory, setActiveCategory] = useState("profile")
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    darkMode: false,
    autoSave: true,
    publicProfile: true,
    twoFactorAuth: false,
  })

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const renderSettingsContent = () => {
    switch (activeCategory) {
      case "profile":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Full Name</label>
                <Input defaultValue="Swe Admin" className="artistic-input" />
              </div>
              <div>
                <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Email</label>
                <Input defaultValue="admin@portfolio.com" className="artistic-input" />
              </div>
            </div>
            <div>
              <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Bio</label>
              <Textarea
                defaultValue="Full-stack developer with expertise in React and Node.js"
                className="artistic-input"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Experience (Years)</label>
                <Input type="number" defaultValue="5" className="artistic-input" />
              </div>
              <div>
                <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Projects Count</label>
                <Input type="number" defaultValue="12" className="artistic-input" />
              </div>
            </div>
          </div>
        )

      case "security":
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Current Password</label>
              <Input type="password" className="artistic-input" />
            </div>
            <div>
              <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">New Password</label>
              <Input type="password" className="artistic-input" />
            </div>
            <div>
              <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Confirm New Password</label>
              <Input type="password" className="artistic-input" />
            </div>
            <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
              <div>
                <h4 className="font-medium text-red-900 dark:text-red-100 handwritten">Two-Factor Authentication</h4>
                <p className="text-sm text-red-600 dark:text-red-400 story-text">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Switch
                checked={settings.twoFactorAuth}
                onCheckedChange={(checked) => handleSettingChange("twoFactorAuth", checked)}
              />
            </div>
          </div>
        )

      case "notifications":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
              <div>
                <h4 className="font-medium text-red-900 dark:text-red-100 handwritten">Email Notifications</h4>
                <p className="text-sm text-red-600 dark:text-red-400 story-text">Receive notifications via email</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
              />
            </div>
            <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
              <div>
                <h4 className="font-medium text-red-900 dark:text-red-100 handwritten">Push Notifications</h4>
                <p className="text-sm text-red-600 dark:text-red-400 story-text">
                  Receive push notifications in browser
                </p>
              </div>
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
              />
            </div>
            <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
              <div>
                <h4 className="font-medium text-red-900 dark:text-red-100 handwritten">Auto Save</h4>
                <p className="text-sm text-red-600 dark:text-red-400 story-text">
                  Automatically save changes as you type
                </p>
              </div>
              <Switch
                checked={settings.autoSave}
                onCheckedChange={(checked) => handleSettingChange("autoSave", checked)}
              />
            </div>
          </div>
        )

      case "appearance":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
              <div>
                <h4 className="font-medium text-red-900 dark:text-red-100 handwritten">Dark Mode</h4>
                <p className="text-sm text-red-600 dark:text-red-400 story-text">Use dark theme for the interface</p>
              </div>
              <Switch
                checked={settings.darkMode}
                onCheckedChange={(checked) => handleSettingChange("darkMode", checked)}
              />
            </div>
            <div>
              <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Primary Color</label>
              <div className="flex space-x-2">
                <div className="w-8 h-8 bg-red-500 rounded-full cursor-pointer border-2 border-red-700" />
                <div className="w-8 h-8 bg-blue-500 rounded-full cursor-pointer" />
                <div className="w-8 h-8 bg-green-500 rounded-full cursor-pointer" />
                <div className="w-8 h-8 bg-purple-500 rounded-full cursor-pointer" />
              </div>
            </div>
            <div>
              <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Font Size</label>
              <select className="w-full p-2 border border-red-200 dark:border-red-700 rounded-lg bg-white/50 dark:bg-gray-700/50 artistic-input">
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>
          </div>
        )

      case "site":
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Site Title</label>
              <Input defaultValue="Artistic Portfolio | Frontend Developer" className="artistic-input" />
            </div>
            <div>
              <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Site Description</label>
              <Textarea
                defaultValue="An artistic portfolio showcasing frontend development work with traditional Burmese aesthetic"
                className="artistic-input"
                rows={3}
              />
            </div>
            <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
              <div>
                <h4 className="font-medium text-red-900 dark:text-red-100 handwritten">Public Profile</h4>
                <p className="text-sm text-red-600 dark:text-red-400 story-text">
                  Make your portfolio publicly accessible
                </p>
              </div>
              <Switch
                checked={settings.publicProfile}
                onCheckedChange={(checked) => handleSettingChange("publicProfile", checked)}
              />
            </div>
          </div>
        )

      case "database":
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Database URL</label>
              <Input
                type="password"
                defaultValue="postgresql://user:password@localhost:5432/portfolio"
                className="artistic-input"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button className="bg-green-600 hover:bg-green-700 text-white artistic-button">
                <Database className="w-4 h-4 mr-2" />
                Test Connection
              </Button>
              <Button variant="outline" className="artistic-button bg-transparent">
                <Key className="w-4 h-4 mr-2" />
                Backup Database
              </Button>
            </div>
            <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 handwritten mb-2">Database Statistics</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-yellow-700 dark:text-yellow-300 story-text">Total Records:</span>
                  <span className="font-bold ml-2">1,247</span>
                </div>
                <div>
                  <span className="text-yellow-700 dark:text-yellow-300 story-text">Last Backup:</span>
                  <span className="font-bold ml-2">2 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return <div>Select a category to view settings</div>
    }
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl lg:text-4xl font-serif text-red-900 dark:text-red-100 handwritten-title">
          Settings Management
        </h1>
        <p className="text-red-600 dark:text-red-400 story-text">Configure your portfolio and account preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Settings Categories */}
        <div className="lg:col-span-1">
          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-none shadow-xl artistic-frame">
            <div className="p-4">
              <h3 className="text-lg font-serif text-red-900 dark:text-red-100 handwritten mb-4">Categories</h3>
              <div className="space-y-2">
                {settingsCategories.map((category) => {
                  const Icon = category.icon
                  const isActive = activeCategory === category.id

                  return (
                    <motion.button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 text-left ${
                        isActive
                          ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                          : "text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-950/20"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div
                        className={`w-8 h-8 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center text-white flex-shrink-0`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium handwritten text-sm truncate">{category.title}</p>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </div>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-none shadow-xl artistic-frame">
            <div className="p-6">
              <div className="mb-6">
                {settingsCategories.map((category) => {
                  if (category.id === activeCategory) {
                    const Icon = category.icon
                    return (
                      <div key={category.id} className="flex items-center space-x-3">
                        <div
                          className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center text-white`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-serif text-red-900 dark:text-red-100 handwritten">
                            {category.title}
                          </h2>
                          <p className="text-red-600 dark:text-red-400 story-text">{category.description}</p>
                        </div>
                      </div>
                    )
                  }
                  return null
                })}
              </div>

              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {renderSettingsContent()}
              </motion.div>

              <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-red-100 dark:border-red-800">
                <Button variant="outline" className="artistic-button bg-transparent">
                  <span className="handwritten">Cancel</span>
                </Button>
                <Button className="bg-red-600 hover:bg-red-700 text-white artistic-button">
                  <span className="handwritten">Save Changes</span>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
