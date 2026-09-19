import React from 'react'
import { Metadata } from 'next'
import Failed from './_page/Failed'

export const metadata: Metadata = {
 title: 'Billing Failed',
 description: 'Payment could not be completed.'
}

export default function page() {
  return (
    <Failed />
  )
}
