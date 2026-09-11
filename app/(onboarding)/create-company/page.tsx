import React from 'react'
import CreateCompanyPage from './_page/CreateCompany'
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Create Company",
  description: "Create a new company for your account.",
};

export default function page() {
  return (
    <div>
      <CreateCompanyPage />
    </div>
  )
}
