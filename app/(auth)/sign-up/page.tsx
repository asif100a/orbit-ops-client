import React from "react"
import SignUp from "./_page/SignUp"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign up to access our platform and enjoy our services.",
}

export default function page() {
  return <SignUp />
}
