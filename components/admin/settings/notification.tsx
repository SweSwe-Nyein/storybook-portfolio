import React, { useState } from 'react'
import { Switch } from "@/components/ui/switch"

const Notification = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    darkMode: false,
    autoSave: true,
    publicProfile: true,
    twoFactorAuth: false,
  })

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
        <div>
          <h4 className="font-medium text-red-900 dark:text-red-100 handwritten">Email Notifications</h4>
          <p className="text-sm text-red-600 dark:text-red-400 story-text">Receive notifications via email</p>
        </div>
        <Switch
          checked={settings.emailNotifications}
          onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
        />
      </div>
      <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
        <div>
          <h4 className="font-medium text-red-900 dark:text-red-100 handwritten">Push Notifications</h4>
          <p className="text-sm text-red-600 dark:text-red-400 story-text">
            Receive push notifications in browser
          </p>
        </div>
        <Switch
          checked={settings.pushNotifications}
          onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
        />
      </div>
      <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
        <div>
          <h4 className="font-medium text-red-900 dark:text-red-100 handwritten">Auto Save</h4>
          <p className="text-sm text-red-600 dark:text-red-400 story-text">
            Automatically save changes as you type
          </p>
        </div>
        <Switch
          checked={settings.autoSave}
          onCheckedChange={(checked) => handleSettingChange("autoSave", checked)}
        />
      </div>
    </div>
  )
}

export default Notification