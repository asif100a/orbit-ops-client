import React from 'react'
import MessagesPage from './_page/Message'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Messages',
  description: 'Manage your messages effectively'
}

export default function page() {
  return (
    <div>
      <MessagesPage />
    </div>
  )
}
