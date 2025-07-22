"use client"

import { DashboardLayout } from "@/components/admin/dashboard-layout"
import { ProjectsCRUD } from "@/components/admin/projects-crud"

export default function AdminProjectsPage() {
  return (
    <DashboardLayout activeTab="projects">
      <ProjectsCRUD />
    </DashboardLayout>
  )
}
