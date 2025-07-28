import { DashboardLayout } from "@/components/admin/dashboard-layout"
import SettingsManagement from "@/components/admin/settings/settings-management"
import { getProfile } from "@/lib/data/home";

const AdminSettingsPage = async () => {
  const profile = await getProfile();

  if (!profile) {
    return <div>No profile data</div>;
  }
  return (
    <DashboardLayout activeTab="settings">
      <SettingsManagement profile={profile} />
    </DashboardLayout>
  )
}

export default AdminSettingsPage