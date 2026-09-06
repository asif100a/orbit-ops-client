import React from 'react'
import SettingsPage from './_page/Settings'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Manage your account settings'
}

export default function page() {
  return (
    <div>
      <SettingsPage />
    </div>
  )
}
