"use client"

import { DashboardLayout } from "@/components/admin/dashboard-layout"
import { SkillsCRUD } from "@/components/admin/skills-crud"

export default function AdminSkillsPage() {
  return (
    <DashboardLayout activeTab="skills">
      <SkillsCRUD />
    </DashboardLayout>
  )
}
