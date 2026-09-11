import Logo from "@/components/modules/Logo";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    default: "Company Setup",
    template: "%s | OrbitOps",
  },
  description: "Set up and activate your OrbitOps company workspace.",
};

export default function OnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#080812] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-[260px] left-[12%] h-[560px] w-[620px] rounded-full bg-violet-600/[0.07] blur-[120px]" />
        <div className="absolute bottom-[-260px] right-[-170px] h-[520px] w-[520px] rounded-full bg-teal-400/[0.05] blur-[120px]" />
      </div>

      <header className="relative z-10 border-b border-white/[0.06] bg-[#080812]/75 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <Logo />
          </Link>
          <Link
            href="/sign-in"
            className="rounded-lg px-3 py-2 text-sm font-medium text-[#8B89A8] transition hover:bg-white/[0.04] hover:text-white"
          >
            Sign out
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:py-10">
        {children}
      </main>
    </div>
  );
}
