import React from "react"
import ForgotPassword from "./_page/ForgotPassword"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Reset your password to access our platform and enjoy our services.",
}

export default function page() {
  return <ForgotPassword />
}
