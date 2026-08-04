import { Metadata } from "next";
import AuthShell from "@/components/modules/auth/AuthShell";
import SignUpForm from "./_components/SignUp";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign up to access our platform and enjoy our services.",
};

export default function page() {
  return (
    <AuthShell
      title="Create your OrbitOps account"
      description="Start your agency workflow with a secure account and connect your team in minutes."
      aside={
        <>
          <div className="rounded-3xl border border-white/8 bg-[#0f1221]/80 p-5">
            <p className="text-sm font-medium text-white">Team-ready setup</p>
            <p className="mt-2 text-sm text-[#8B89A8]">
              Invite collaborators and configure access from day one.
            </p>
          </div>
          <div className="rounded-3xl border border-white/8 bg-[#0f1221]/80 p-5">
            <p className="text-sm font-medium text-white">Secure onboarding</p>
            <p className="mt-2 text-sm text-[#8B89A8]">
              Protect your agency with strong passwords and built-in recovery.
            </p>
          </div>
        </>
      }
    >
      <SignUpForm />
    </AuthShell>
  );
}
