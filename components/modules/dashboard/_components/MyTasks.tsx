import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Circle,
  MoreHorizontal,
} from "lucide-react";

const TASKS = [
  {
    title: "Implement authentication flow",
    project: "OrbitOps Platform",
    priority: "High",
    priorityClass: "text-red-300 bg-red-400/10 border-red-400/15",
    due: "Today",
    completed: false,
  },
  {
    title: "Review landing page designs",
    project: "Acme Website",
    priority: "Medium",
    priorityClass:
      "text-amber-300 bg-amber-400/10 border-amber-400/15",
    due: "Today",
    completed: false,
  },
  {
    title: "Update API documentation",
    project: "Internal",
    priority: "Low",
    priorityClass: "text-teal-300 bg-teal-400/10 border-teal-400/15",
    due: "Tomorrow",
    completed: false,
  },
  {
    title: "Deploy staging environment",
    project: "Mobile App",
    priority: "High",
    priorityClass: "text-red-300 bg-red-400/10 border-red-400/15",
    due: "Sep 6",
    completed: true,
  },
];

export function MyTasks() {
  return (
    <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
        <div>
          <h2 className="text-sm font-semibold text-white">
            My Tasks
          </h2>

          <p className="mt-0.5 text-xs text-[#686681]">
            Your most important work
          </p>
        </div>

        <button className="flex items-center gap-1.5 text-xs font-medium text-violet-400 transition hover:text-violet-300">
          View all
          <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Tasks */}
      <div className="divide-y divide-white/[0.05]">
        {TASKS.map((task) => (
          <div
            key={task.title}
            className="group flex items-center gap-3 px-5 py-4 transition hover:bg-white/[0.025]"
          >
            {/* Checkbox */}
            <button
              className="shrink-0 text-[#55536B] transition hover:text-violet-400"
              aria-label={`Complete ${task.title}`}
            >
              {task.completed ? (
                <CheckCircle2 className="h-[19px] w-[19px] text-teal-400" />
              ) : (
                <Circle className="h-[19px] w-[19px]" />
              )}
            </button>

            {/* Content */}
            <div className="min-w-0 flex-1">
              <p
                className={`truncate text-sm font-medium ${
                  task.completed
                    ? "text-[#55536B] line-through"
                    : "text-[#D9D7EA]"
                }`}
              >
                {task.title}
              </p>

              <div className="mt-1 flex items-center gap-2">
                <span className="truncate text-[11px] text-[#686681]">
                  {task.project}
                </span>

                <span className="h-1 w-1 rounded-full bg-[#444257]" />

                <span className="flex items-center gap-1 text-[11px] text-[#686681]">
                  <CalendarDays className="h-3 w-3" />
                  {task.due}
                </span>
              </div>
            </div>

            {/* Priority */}
            <span
              className={`
                hidden rounded-md border px-2 py-1
                text-[10px] font-medium
                sm:block
                ${task.priorityClass}
              `}
            >
              {task.priority}
            </span>

            <button className="rounded-lg p-1.5 text-[#55536B] opacity-0 transition hover:bg-white/[0.05] hover:text-white group-hover:opacity-100">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}