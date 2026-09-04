import {
  CheckSquare,
  FolderKanban,
  MessageSquare,
  Timer,
  TrendingUp,
} from "lucide-react";

const STATS = [
  {
    label: "My Tasks",
    value: "12",
    description: "3 completed today",
    icon: CheckSquare,
    trend: "+18%",
  },
  {
    label: "Due Today",
    value: "4",
    description: "2 high priority",
    icon: Timer,
    trend: "Today",
  },
  {
    label: "Active Projects",
    value: "8",
    description: "3 due this week",
    icon: FolderKanban,
    trend: "+2",
  },
  {
    label: "Unread Messages",
    value: "7",
    description: "From 4 channels",
    icon: MessageSquare,
    trend: "New",
  },
];

export function DashboardStats() {
  return (
    <section className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
      {STATS.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="
              group relative overflow-hidden
              rounded-2xl
              border border-white/[0.07]
              bg-white/[0.025]
              p-5
              transition-all duration-300
              hover:border-violet-500/20
              hover:bg-white/[0.04]
            "
          >
            {/* Glow */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-violet-600/[0.08] blur-2xl transition-all group-hover:bg-violet-600/[0.14]" />

            <div className="relative">
              <div className="flex items-start justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-500/15 bg-violet-500/10">
                  <Icon className="h-[17px] w-[17px] text-violet-400" />
                </div>

                <span className="flex items-center gap-1 rounded-full bg-white/[0.04] px-2 py-1 text-[10px] font-medium text-[#8B89A8]">
                  <TrendingUp className="h-3 w-3 text-teal-400" />
                  {stat.trend}
                </span>
              </div>

              <div className="mt-5">
                <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-[#686681]">
                  {stat.label}
                </p>

                <div className="mt-1 flex items-end gap-2">
                  <span className="font-mono text-3xl font-bold tracking-tight text-white">
                    {stat.value}
                  </span>
                </div>

                <p className="mt-1 text-xs text-[#686681]">
                  {stat.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}