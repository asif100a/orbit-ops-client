import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function BillingSuccessPage() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-160px)] max-w-2xl items-center justify-center">
      <div className="w-full rounded-2xl border border-white/[0.07] bg-[#0d0d18]/90 p-6 text-center shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:p-8">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-400/10 text-teal-300">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <p className="mt-6 text-sm text-[#8B89A8]">Company activated</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
          Your workspace is ready
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#8B89A8]">
          Your subscription is active. You can now invite members, create teams,
          manage projects, and use the full OrbitOps dashboard.
        </p>
        <Link
          href="/user"
          className="mt-7 inline-flex h-11 items-center justify-center gap-1.5 rounded-lg bg-violet-600 px-4 text-sm font-medium text-white transition hover:bg-violet-500"
        >
          Go to dashboard
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
