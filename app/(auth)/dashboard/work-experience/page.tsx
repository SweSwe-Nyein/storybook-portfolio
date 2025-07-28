"use client"

import { DashboardLayout } from "@/components/admin/dashboard-layout"
import { WorkExperienceCRUD } from "@/components/admin/work-experience-crud"

export default function AdminWorkExperiencePage() {
  return (
    <DashboardLayout activeTab="work-experience">
      <WorkExperienceCRUD />
    </DashboardLayout>
  )
}
