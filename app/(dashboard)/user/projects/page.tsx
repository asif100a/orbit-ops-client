"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Filter,
  FolderKanban,
  MoreHorizontal,
  Plus,
  Search,
  SlidersHorizontal,
  Users,
} from "lucide-react";

const PROJECTS = [
  {
    name: "Acme Website Redesign",
    client: "Acme Corporation",
    description: "A full visual refresh for the Acme marketing site.",
    progress: 78,
    status: "On Track",
    statusClass: "text-teal-300 bg-teal-400/10 border-teal-400/15",
    due: "Sep 12, 2026",
    tasks: "18 / 23 tasks",
    members: ["AS", "JD", "SM"],
    accent: "from-violet-500 to-indigo-400",
  },
  {
    name: "Mobile Banking App",
    client: "Finova",
    description: "A secure mobile experience for everyday banking.",
    progress: 54,
    status: "In Progress",
    statusClass: "text-violet-300 bg-violet-400/10 border-violet-400/15",
    due: "Sep 24, 2026",
    tasks: "14 / 26 tasks",
    members: ["AS", "MK", "RL", "JD"],
    accent: "from-teal-400 to-cyan-300",
  },
  {
    name: "Brand Campaign",
    client: "Nova Labs",
    description: "Launch creative and content for the autumn campaign.",
    progress: 32,
    status: "At Risk",
    statusClass: "text-amber-300 bg-amber-400/10 border-amber-400/15",
    due: "Sep 18, 2026",
    tasks: "8 / 25 tasks",
    members: ["SM", "RL"],
    accent: "from-amber-400 to-orange-400",
  },
  {
    name: "OrbitOps Platform",
    client: "Internal",
    description: "The next generation of the OrbitOps workspace.",
    progress: 64,
    status: "On Track",
    statusClass: "text-teal-300 bg-teal-400/10 border-teal-400/15",
    due: "Oct 06, 2026",
    tasks: "31 / 48 tasks",
    members: ["AS", "JD", "MK", "SM"],
    accent: "from-sky-400 to-blue-500",
  },
];

const FILTERS = ["All projects", "On Track", "In Progress", "At Risk"];

export default function ProjectsPage() {
  const [filter, setFilter] = useState("All projects");
  const [query, setQuery] = useState("");
  const visibleProjects = PROJECTS.filter((project) => {
    const matchesFilter =
      filter === "All projects" || project.status === filter;
    const matchesQuery = `${project.name} ${project.client}`
      .toLowerCase()
      .includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <div className="space-y-7">
      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-sm text-[#8B89A8]">Your active workspace</p>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Projects
          </h1>
          <p className="mt-2 text-sm text-[#8B89A8]">
            A clear view of the work, people, and deadlines in motion.
          </p>
        </div>
        <button className="flex h-10 items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 text-sm font-medium text-white shadow-[0_0_24px_rgba(108,99,255,0.2)] transition hover:bg-violet-500">
          <Plus className="h-4 w-4" /> New project
        </button>
      </section>

      {/* <section className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {[
          ["Active projects", "8", "Across your workspace", FolderKanban],
          ["On track", "5", "62% of active work", CheckCircle2],
          ["Due this month", "3", "Keep an eye on Sep 18", CalendarDays],
          ["Team members", "12", "Across 4 projects", Users],
        ].map(([label, value, caption, Icon]) => {
          const StatIcon = Icon as typeof FolderKanban;
          return (
            <div
              key={label as string}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 sm:p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#686681]">
                  {label as string}
                </p>
                <StatIcon className="h-4 w-4 text-violet-400" />
              </div>
              <p className="mt-3 font-mono text-2xl font-bold text-white">
                {value as string}
              </p>
              <p className="mt-1 text-[10px] text-[#686681]">
                {caption as string}
              </p>
            </div>
          );
        })}
      </section> */}

      {/* <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-1 overflow-x-auto rounded-xl border border-white/[0.06] bg-white/[0.02] p-1">
          {FILTERS.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`shrink-0 rounded-lg px-3 py-2 text-xs font-medium transition ${filter === item ? "bg-violet-500/15 text-violet-300" : "text-[#686681] hover:text-white"}`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1 sm:w-52 sm:flex-none">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#686681]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search projects"
              className="h-10 w-full rounded-xl border border-white/[0.07] bg-white/[0.025] pl-9 pr-3 text-xs text-white outline-none placeholder:text-[#55536B] focus:border-violet-500/50"
            />
          </div>
          <button
            aria-label="Filter projects"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-[#686681] hover:bg-white/[0.05] hover:text-white"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>
      </section> */}

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_290px]">
        <section className="grid gap-4 md:grid-cols-2">
          {PROJECTS.map((project) => (
            <article
              key={project.name}
              className="group overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] transition hover:border-violet-500/25 hover:bg-white/[0.04]"
            >
              <div className={`h-1 bg-gradient-to-r ${project.accent}`} />
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${project.accent} bg-opacity-10`}
                  >
                    <BriefcaseBusiness className="h-4 w-4 text-white" />
                  </div>
                  <button
                    aria-label={`More options for ${project.name}`}
                    className="rounded-lg p-1.5 text-[#55536B] hover:bg-white/[0.05] hover:text-white"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-sm font-semibold text-[#D9D7EA]">
                      {project.name}
                    </h2>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[9px] font-medium ${project.statusClass}`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-[#686681]">
                    {project.client}
                  </p>
                  <p className="mt-3 min-h-8 text-xs leading-5 text-[#8B89A8]">
                    {project.description}
                  </p>
                </div>
                <div className="mt-5 flex items-center justify-between text-[10px] text-[#686681]">
                  <span>Project progress</span>
                  <span className="font-mono text-[#AAA7C8]">
                    {project.progress}%
                  </span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${project.accent}`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
                  <div className="flex items-center gap-1.5 text-[10px] text-[#686681]">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {project.due}
                  </div>
                  <div className="flex -space-x-2">
                    {project.members.map((member) => (
                      <span
                        key={member}
                        className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#10101B] bg-gradient-to-br from-violet-500 to-teal-400 text-[8px] font-bold text-white"
                      >
                        {member}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
          {visibleProjects.length === 0 ? (
            <div className="col-span-full rounded-2xl border border-dashed border-white/[0.1] px-6 py-16 text-center">
              <Search className="mx-auto h-6 w-6 text-[#55536B]" />
              <p className="mt-3 text-sm font-medium text-[#D9D7EA]">
                No projects found
              </p>
              <p className="mt-1 text-xs text-[#686681]">
                Try a different name or status filter.
              </p>
            </div>
          ) : null}
        </section>

        <aside className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-white">Workload</h2>
              <p className="mt-1 text-[11px] text-[#686681]">
                Your project focus
              </p>
            </div>
            <Filter className="h-4 w-4 text-violet-400" />
          </div>
          <div className="mt-6 flex items-center gap-5">
            <div
              className="relative flex h-24 w-24 items-center justify-center rounded-full"
              style={{
                background:
                  "conic-gradient(#6C63FF 0 64%, rgba(255,255,255,.06) 64% 100%)",
              }}
            >
              <div className="flex h-16 w-16 flex-col items-center justify-center rounded-full bg-[#12121e]">
                <span className="font-mono text-xl font-bold text-white">
                  64%
                </span>
                <span className="text-[9px] text-[#686681]">capacity</span>
              </div>
            </div>
            <div className="space-y-2 text-[10px] text-[#8B89A8]">
              <p className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-violet-400" />
                Billable work <strong className="text-white">42h</strong>
              </p>
              <p className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-teal-400" />
                Internal work <strong className="text-white">12h</strong>
              </p>
            </div>
          </div>
          <div className="mt-7 border-t border-white/[0.06] pt-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#5F5D78]">
              Next deadline
            </p>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-400/10 text-amber-300">
                <Clock3 className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-medium text-[#D9D7EA]">
                  Brand Campaign
                </p>
                <p className="mt-0.5 text-[10px] text-amber-300">
                  Due in 12 days
                </p>
              </div>
            </div>
          </div>
          <button className="mt-6 flex items-center gap-1 text-[11px] font-medium text-violet-400 hover:text-violet-300">
            View time report <ArrowUpRight className="h-3 w-3" />
          </button>
        </aside>
      </div>
      <div className="flex items-center gap-2 text-[10px] text-[#55536B]">
        <FolderKanban className="h-3.5 w-3.5" /> Showing{" "}
        {visibleProjects.length} of {PROJECTS.length} active projects{" "}
        <span className="h-1 w-1 rounded-full bg-teal-400" /> Updated just now
      </div>
    </div>
  );
}
