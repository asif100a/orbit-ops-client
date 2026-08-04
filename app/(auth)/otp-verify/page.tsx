import React from "react"
import OtpVerify from "./_page/OtpVerify"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "OTP Verify",
  description: "Verify your email or phone number to access our platform and enjoy our services.",
}

export default function page() {
  return <OtpVerify />
}
