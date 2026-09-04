import {
  ArrowUpRight,
  CheckCircle2,
  FileText,
  MessageSquare,
  UserPlus,
} from "lucide-react";

const ACTIVITIES = [
  {
    user: "Sarah Morgan",
    initials: "SM",
    action: "completed a task",
    target: "Homepage responsive layout",
    time: "12 min ago",
    icon: CheckCircle2,
    iconClass: "text-teal-400 bg-teal-400/10",
  },
  {
    user: "John Davis",
    initials: "JD",
    action: "commented on",
    target: "API Integration",
    time: "38 min ago",
    icon: MessageSquare,
    iconClass: "text-violet-400 bg-violet-400/10",
  },
  {
    user: "Michael Kim",
    initials: "MK",
    action: "uploaded a file to",
    target: "Mobile Banking App",
    time: "1 hr ago",
    icon: FileText,
    iconClass: "text-teal-400 bg-teal-400/10",
  },
  {
    user: "Rachel Lee",
    initials: "RL",
    action: "joined the project",
    target: "Brand Campaign",
    time: "3 hrs ago",
    icon: UserPlus,
    iconClass: "text-violet-400 bg-violet-400/10",
  },
];

export function ActivityFeed() {
  return (
    <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
        <div>
          <h2 className="text-sm font-semibold text-white">
            Recent Activity
          </h2>

          <p className="mt-0.5 text-xs text-[#686681]">
            What&apos;s happening in your workspace
          </p>
        </div>

        <button className="flex items-center gap-1.5 text-xs font-medium text-violet-400 transition hover:text-violet-300">
          View activity
          <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Activity */}
      <div className="divide-y divide-white/[0.05]">
        {ACTIVITIES.map((activity) => {
          const Icon = activity.icon;

          return (
            <div
              key={`${activity.user}-${activity.target}`}
              className="flex items-center gap-3 px-5 py-4"
            >
              {/* Avatar */}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/80 to-teal-400/80 text-[9px] font-bold text-white">
                {activity.initials}
              </div>

              {/* Text */}
              <div className="min-w-0 flex-1 text-xs">
                <span className="font-medium text-[#D9D7EA]">
                  {activity.user}
                </span>{" "}
                <span className="text-[#686681]">
                  {activity.action}
                </span>{" "}
                <span className="font-medium text-[#AAA7C8]">
                  {activity.target}
                </span>
              </div>

              {/* Time + icon */}
              <div className="flex shrink-0 items-center gap-2">
                <span className="hidden text-[10px] text-[#55536B] sm:block">
                  {activity.time}
                </span>

                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-lg ${activity.iconClass}`}
                >
                  <Icon className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}