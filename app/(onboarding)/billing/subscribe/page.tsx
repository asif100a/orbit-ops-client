import React from 'react'
import SubscribePage from './_page/Subscribe'
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Subscribe",
  description: "Subscribe to a plan for your account.",
};

export default function page() {
  return (
    <div>
      <SubscribePage />
    </div>
  )
}
