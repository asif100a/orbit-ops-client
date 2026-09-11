import type { Metadata } from "next";
import CompanyOtpVerify from "./_page/CompanyOtpVerify";

export const metadata: Metadata = {
  title: "Verify Company",
  description: "Verify your company workspace with a one-time code.",
};

export default function CompanyOtpVerifyPage() {
  return <CompanyOtpVerify />;
}
