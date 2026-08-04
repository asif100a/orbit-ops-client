import React from "react"
import ResetPassword from "./_page/ResetPassword"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset your password to access our platform and enjoy our services.",
}

export default function page() {
  return <ResetPassword />
}
