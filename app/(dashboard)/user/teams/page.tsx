import React from 'react'
import TeamsPage from './_page/Teams'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Teams',
  description: 'Manage your teams effectively'
}

export default function page() {
  return (
    <div>
      <TeamsPage />
    </div>
  )
}
