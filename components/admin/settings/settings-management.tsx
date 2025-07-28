"use client"

import { useState } from "react"
import { User, Shield } from "lucide-react"
import Profile from "./profile"
import Security from "./security"
import Notification from "./notification"
import Site from "./site"
import Categories from "./categories"
import Content from "./content"
import { ProfileData } from "@/types/profile"

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
  // {
  //   id: "notifications",
  //   title: "Notifications",
  //   description: "Email and push notification preferences",
  //   icon: Bell,
  //   color: "from-yellow-500 to-yellow-600",
  // },
  // {
  //   id: "site",
  //   title: "Site Settings",
  //   description: "General website configuration",
  //   icon: Globe,
  //   color: "from-green-500 to-green-600",
  // }
]

const SettingsManagement = ({profile}: {profile: ProfileData}) => {
  const [activeCategory, setActiveCategory] = useState("profile")

  const renderSettingsContent = () => {
    switch (activeCategory) {
      case "profile":
        return (
          <Profile profile={profile} />
        )

      case "security":
        return (
          <Security profile={profile} />
        )

      case "notifications":
        return (
          <Notification />
        )

      case "site":
        return (
          <Site />
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
        <Categories activeCategory={activeCategory} setActiveCategory={setActiveCategory} settingsCategories={settingsCategories} />

        {/* Settings Content */}
        <Content activeCategory={activeCategory} renderSettingsContent={renderSettingsContent} settingsCategories={settingsCategories} />
      </div>
    </div>
  )
}

export default SettingsManagement