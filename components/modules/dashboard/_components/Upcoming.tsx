import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Video,
} from "lucide-react";

const EVENTS = [
  {
    day: "TODAY",
    date: "04",
    title: "Team Standup",
    time: "10:00 AM – 10:30 AM",
    type: "Meeting",
  },
  {
    day: "TODAY",
    date: "04",
    title: "Acme Client Review",
    time: "02:00 PM – 03:00 PM",
    type: "Client",
  },
  {
    day: "SAT",
    date: "05",
    title: "Design Sprint",
    time: "11:00 AM – 12:30 PM",
    type: "Workshop",
  },
];

export function Upcoming() {
  return (
    <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
        <div>
          <h2 className="text-sm font-semibold text-white">
            Upcoming
          </h2>

          <p className="mt-0.5 text-xs text-[#686681]">
            Meetings & events
          </p>
        </div>

        <button className="rounded-lg p-2 text-[#686681] transition hover:bg-white/[0.05] hover:text-white">
          <CalendarDays className="h-4 w-4" />
        </button>
      </div>

      {/* Events */}
      <div className="p-3">
        {EVENTS.map((event, index) => (
          <div
            key={`${event.title}-${event.date}`}
            className={`
              group flex gap-3 rounded-xl p-3
              transition hover:bg-white/[0.035]
              ${index !== EVENTS.length - 1 ? "mb-1" : ""}
            `}
          >
            {/* Date */}
            <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.025]">
              <span className="text-[8px] font-semibold tracking-wider text-violet-400">
                {event.day}
              </span>

              <span className="font-mono text-sm font-bold text-white">
                {event.date}
              </span>
            </div>

            {/* Details */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-xs font-semibold text-[#D9D7EA]">
                  {event.title}
                </p>

                {event.type === "Meeting" ||
                event.type === "Client" ? (
                  <Video className="h-3.5 w-3.5 shrink-0 text-[#55536B]" />
                ) : null}
              </div>

              <div className="mt-1 flex items-center gap-1.5 text-[10px] text-[#686681]">
                <Clock3 className="h-3 w-3" />
                {event.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-white/[0.06] px-5 py-3">
        <button className="flex items-center gap-1 text-[11px] font-medium text-violet-400 transition hover:text-violet-300">
          Open calendar
          <ArrowUpRight className="h-3 w-3" />
        </button>
      </div>
    </section>
  );
}