"use client"

import { DashboardLayout } from "@/components/admin/dashboard-layout"
import { DashboardOverview } from "@/components/admin/dashboard-overview"

export default function AdminPage() {
  return (
    <DashboardLayout activeTab="overview">
      <DashboardOverview />
    </DashboardLayout>
  )
}
