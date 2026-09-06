import React from 'react'
import TimeTrackingPage from './_page/TimeTracking'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Time Tracking',
  description: 'Track your time effectively'
}

export default function page() {
  return (
	<div>
	  <TimeTrackingPage />
	</div>
  )
}
