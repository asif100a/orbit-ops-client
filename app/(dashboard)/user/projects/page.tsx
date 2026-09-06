import React from 'react'
import ProjectsPage from './_page/Projects'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Manage your projects effectively'
}

export default function page() {
  return (
    <div>
      <ProjectsPage />
    </div>
  )
}
