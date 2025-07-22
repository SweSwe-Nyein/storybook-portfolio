"use client"

import { ContentManagement } from "@/components/admin/content-management"
import { DashboardLayout } from "@/components/admin/dashboard-layout"

export default function AdminContentPage() {
  return (
    <DashboardLayout activeTab="content">
      <ContentManagement />
    </DashboardLayout>
  )
}
