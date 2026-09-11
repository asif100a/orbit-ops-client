import React from 'react'
import OnboardingResolvePage from './_page/Resolve'
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Onboarding",
  description: "Onboarding flow for new users.",
};

export default function page() {
  return (
    <div>
      <OnboardingResolvePage />
    </div>
  )
}
