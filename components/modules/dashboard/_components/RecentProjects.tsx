import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  MoreHorizontal,
  Users,
} from "lucide-react";

const PROJECTS = [
  {
    name: "Acme Website Redesign",
    client: "Acme Corporation",
    progress: 78,
    status: "On Track",
    statusClass: "text-teal-300 bg-teal-400/10",
    due: "Sep 12",
    members: ["AS", "JD", "SM"],
  },
  {
    name: "Mobile Banking App",
    client: "Finova",
    progress: 54,
    status: "In Progress",
    statusClass: "text-violet-300 bg-violet-400/10",
    due: "Sep 24",
    members: ["AS", "MK", "RL", "JD"],
  },
  {
    name: "Brand Campaign",
    client: "Nova Labs",
    progress: 32,
    status: "At Risk",
    statusClass: "text-amber-300 bg-amber-400/10",
    due: "Sep 18",
    members: ["SM", "RL"],
  },
];

export function RecentProjects() {
  return (
    <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
        <div>
          <h2 className="text-sm font-semibold text-white">
            Recent Projects
          </h2>

          <p className="mt-0.5 text-xs text-[#686681]">
            Track your active work
          </p>
        </div>

        <button className="flex items-center gap-1.5 text-xs font-medium text-violet-400 transition hover:text-violet-300">
          All projects
          <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Projects */}
      <div className="divide-y divide-white/[0.05]">
        {PROJECTS.map((project) => (
          <div
            key={project.name}
            className="group px-5 py-4 transition hover:bg-white/[0.025]"
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] sm:flex">
                <BriefcaseBusiness className="h-4 w-4 text-violet-400" />
              </div>

              {/* Main */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-semibold text-[#D9D7EA]">
                    {project.name}
                  </h3>

                  <span
                    className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${project.statusClass}`}
                  >
                    {project.status}
                  </span>
                </div>

                <p className="mt-1 text-[11px] text-[#686681]">
                  {project.client}
                </p>

                {/* Progress */}
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet-600 to-teal-400 transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>

                  <span className="w-8 text-right font-mono text-[10px] text-[#8B89A8]">
                    {project.progress}%
                  </span>
                </div>
              </div>

              {/* Meta */}
              <div className="hidden items-center gap-5 md:flex">
                <div className="flex items-center gap-1.5 text-[10px] text-[#686681]">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {project.due}
                </div>

                <div className="flex -space-x-2">
                  {project.members.map((member) => (
                    <div
                      key={member}
                      className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#10101B] bg-gradient-to-br from-violet-500 to-teal-400 text-[8px] font-bold text-white"
                    >
                      {member}
                    </div>
                  ))}
                </div>

                <button className="rounded-lg p-1.5 text-[#55536B] opacity-0 transition hover:bg-white/[0.05] hover:text-white group-hover:opacity-100">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}