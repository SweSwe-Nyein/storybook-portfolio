import { AIChatInterface } from "@/components/sections/ai-chat"
import Footer from "@/components/sections/footer"
import UIOverlayElements from "@/components/UIOverlayElements"
import { Suspense } from "react"
import Profile from "@/components/sections/profile"
import { LoadingScreen } from "@/components/loading-screen"
import InteractiveSkills from "@/components/sections/skill"
import Project from "@/components/sections/project"
import Connection from "@/components/sections/connection"
import WorkExperience from "@/components/sections/experience"

export const scrollToSection = (sectionId: string) => {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
}

export default async function ArtisticPortfolio() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-red-950 relative overflow-x-hidden book-texture transition-colors duration-500">
      {/* Floating Background Elements */}
      <UIOverlayElements />

      <Suspense fallback={<LoadingScreen />}>
        {/* Chapter 1 & 2: The Profile */}
        <Profile />

        {/* Chapter 3: The Skills */}
        <InteractiveSkills />
        
        {/* Chapter 4: The Adventures (Projects) */}
        <WorkExperience />

        {/* Chapter 4: The Adventures (Projects) */}
        <Project />

        {/* Chapter 5: The Connection */}
        <Connection />

        {/* The End */}
        <Footer />

        {/* AI Chat Interface */}
        <AIChatInterface />
      </Suspense>
      {/* Admin Access Button */}
      {/* <AdminAccessButton /> */}
    </div>
  )
}
