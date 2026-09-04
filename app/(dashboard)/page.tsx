import { ActivityFeed } from "@/components/modules/dashboard/_components/ActivityFeed";
import { DashboardStats } from "@/components/modules/dashboard/_components/DashboardStats";
import { MyTasks } from "@/components/modules/dashboard/_components/MyTasks";
import { RecentProjects } from "@/components/modules/dashboard/_components/RecentProjects";
import { Upcoming } from "@/components/modules/dashboard/_components/Upcoming";

export default function DashboardPage() {
  return (
    <div className="space-y-7">
      {/* Greeting */}
      <section>
        <p className="mb-2 text-sm text-[#8B89A8]">
          Friday, September 4
        </p>

        <h1 className="bg-gradient-to-r from-white via-[#c8c4ff] to-teal-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
          Good morning, Asif 👋
        </h1>

        <p className="mt-2 text-sm text-[#8B89A8]">
          Here&apos;s what&apos;s happening across your workspace.
        </p>
      </section>

      {/* Stats */}
      <DashboardStats />

      {/* Tasks + Upcoming */}
      <section className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <MyTasks />
        <Upcoming />
      </section>

      {/* Projects */}
      <RecentProjects />

      {/* Activity */}
      <ActivityFeed />
    </div>
  );
}