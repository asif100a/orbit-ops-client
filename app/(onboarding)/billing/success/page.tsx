import React from 'react'
import BillingSuccessPage from './_page/Success'
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Billing Success",
  description: "Billing success page for onboarding.",
};

export default function page() {
  return (
    <div>
      <BillingSuccessPage />
    </div>
  )
}
