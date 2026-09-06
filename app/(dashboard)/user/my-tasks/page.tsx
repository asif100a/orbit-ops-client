import React from 'react'
import MyTasksPage from './_page/MyTasks'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Tasks',
  description: 'Manage your tasks effectively'
}

export default function page() {
  return (
    <div>
      <MyTasksPage />
    </div>
  )
}
