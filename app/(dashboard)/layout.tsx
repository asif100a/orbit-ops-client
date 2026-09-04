import { DashboardHeader } from "@/components/modules/dashboard/DashboardHeader";
import { Sidebar } from "@/components/modules/dashboard/Sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "OrbitOps",
    template: "%s | OrbitOps",
  },
  description:
    "The command center for your agency — projects, teams, clients, and operations.",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#080812] text-white">
      {/* Background atmosphere */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-[300px] left-[20%] h-[600px] w-[700px] rounded-full bg-violet-600/[0.06] blur-[120px]" />

        <div className="absolute bottom-[-250px] right-[-150px] h-[500px] w-[500px] rounded-full bg-teal-400/[0.04] blur-[120px]" />
      </div>

      {/* Sidebar */}
      <Sidebar />

      {/* Main application */}
      <div className="relative min-h-screen lg:pl-[260px]">
        {/* Top header */}
        <DashboardHeader />

        {/* Page content */}
        <main className="px-4 pb-10 pt-6 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1600px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}