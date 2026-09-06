import AuthShell from "@/components/modules/auth/AuthShell";
import { Metadata } from "next";
import SignInForm from "./_page/SignIn";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to access our platform and enjoy our services.",
};

export default function Page() {
  return (
    <AuthShell
      title="Welcome back to OrbitOps"
      description="Sign in to access the command center for your agency and keep every project, client, and campaign aligned."
      aside={
        <>
          <div className="rounded-3xl border border-white/8 bg-[#0f1221]/80 p-5">
            <p className="text-sm font-medium text-white">Faster approvals</p>
            <p className="mt-2 text-sm text-[#8B89A8]">
              Move projects forward with secure access and shared visibility.
            </p>
          </div>
          <div className="rounded-3xl border border-white/8 bg-[#0f1221]/80 p-5">
            <p className="text-sm font-medium text-white">
              Agency-ready security
            </p>
            <p className="mt-2 text-sm text-[#8B89A8]">
              Multi-layer protection and sign-in options for every team member.
            </p>
          </div>
        </>
      }
    >
      <SignInForm />
    </AuthShell>
  );
}
