"use client"

import { DashboardLayout } from "@/components/admin/dashboard-layout"
import { UsersCRUD } from "@/components/admin/users-crud"

export default function AdminUsersPage() {
  return (
    <DashboardLayout activeTab="users">
      <UsersCRUD />
    </DashboardLayout>
  )
}
