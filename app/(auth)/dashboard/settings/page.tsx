"use client"

import { DashboardLayout } from "@/components/admin/dashboard-layout"
import { SettingsManagement } from "@/components/admin/settings-management"

export default function AdminSettingsPage() {
  return (
    <DashboardLayout activeTab="settings">
      <SettingsManagement />
    </DashboardLayout>
  )
}
