const DB_NAV = [
  { icon: "📊", label: "Dashboard", active: true },
  { icon: "📁", label: "Projects" },
  { icon: "✅", label: "Tasks" },
  { icon: "👥", label: "Team" },
  { icon: "👤", label: "Clients" },
  { icon: "💬", label: "Chat" },
  { icon: "📈", label: "Analytics" },
  { icon: "💰", label: "Finance" },
  { icon: "🤖", label: "AI Insights" },
];

const DB_CARDS = [
  { num: "24", color: "text-violet-400", label: "Active Projects", trend: "↑ 12% this month", up: true },
  { num: "48", color: "text-white", label: "Team Members", trend: "↑ 3 new this week", up: true },
  { num: "$84k", color: "text-teal-400", label: "Revenue (MTD)", trend: "↑ 8.4%", up: true },
  { num: "7", color: "text-red-400", label: "Overdue Tasks", trend: "↓ Needs attention", up: false },
];

const BAR_HEIGHTS = [45, 60, 40, 75, 65, 90];

export default function DashboardPreview() {
  return (
    <div className="mx-[5%] rounded-2xl bg-[#131629] border border-white/[0.07] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
      {/* Window bar */}
      <div className="flex items-center gap-2 px-5 py-3.5 bg-[#0d0f1e] border-b border-white/[0.07]">
        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
        <span className="ml-3 text-xs text-[#8B89A8]">app.orbitops.io — Admin Dashboard</span>
      </div>
 
      {/* Body */}
      <div className="grid grid-cols-[200px_1fr] min-h-[420px]">
        {/* Sidebar */}
        <div className="border-r border-white/[0.07] py-5">
          <div className="px-5 mb-2 text-[0.65rem] uppercase tracking-widest text-[#8B89A8]">Overview</div>
          {DB_NAV.map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-2.5 px-5 py-2.5 text-[0.82rem] cursor-pointer transition-all ${
                item.active
                  ? "text-white bg-violet-500/15 border-r-2 border-violet-500"
                  : "text-[#8B89A8] hover:text-white hover:bg-violet-500/10"
              }`}
            >
              {item.icon} {item.label}
            </div>
          ))}
        </div>
 
        {/* Main */}
        <div className="p-6">
          {/* Top row */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="font-bold text-[1.1rem] text-white">Good morning, Sarah 👋</div>
              <div className="text-xs text-[#8B89A8]">3 sprints active · 2 invoices pending</div>
            </div>
            <button className="px-3.5 py-1.5 bg-violet-600 text-white text-xs rounded-lg border-none cursor-pointer">
              + New Project
            </button>
          </div>
 
          {/* Cards */}
          <div className="grid grid-cols-4 gap-3 mb-5">
            {DB_CARDS.map((c) => (
              <div key={c.label} className="bg-[#0d0f1e] border border-white/[0.07] rounded-xl p-4">
                <div className={`text-[1.4rem] font-bold ${c.color}`}>{c.num}</div>
                <div className="text-[0.72rem] text-[#8B89A8] mt-1">{c.label}</div>
                <div className={`text-[0.72rem] mt-2 ${c.up ? "text-teal-400" : "text-red-400"}`}>{c.trend}</div>
              </div>
            ))}
          </div>
 
          {/* Charts */}
          <div className="grid grid-cols-[2fr_1fr] gap-3">
            <div className="bg-[#0d0f1e] border border-white/[0.07] rounded-xl p-4">
              <div className="text-[0.78rem] text-[#8B89A8] mb-3.5">Sprint Velocity — Last 6 sprints</div>
              <div className="flex items-end gap-1.5 h-20">
                {BAR_HEIGHTS.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t hover:opacity-100 transition-opacity"
                    style={{
                      height: `${h}%`,
                      background: i === 5 ? "#4ECDC4" : "#6C63FF",
                      opacity: 0.7,
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="bg-[#0d0f1e] border border-white/[0.07] rounded-xl p-4">
              <div className="text-[0.78rem] text-[#8B89A8] mb-3.5">Project Types</div>
              <div
                className="w-20 h-20 rounded-full mx-auto"
                style={{ background: "conic-gradient(#6C63FF 0deg 180deg, #4ECDC4 180deg 270deg, #FF6B6B 270deg 360deg)" }}
              />
              <div className="mt-3 flex flex-col gap-1.5">
                {[
                  { color: "#6C63FF", label: "Web Dev (50%)" },
                  { color: "#4ECDC4", label: "Mobile (25%)" },
                  { color: "#FF6B6B", label: "Design (25%)" },
                ].map((l) => (
                  <div key={l.label} className="flex items-center gap-1.5 text-[0.7rem] text-[#8B89A8]">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: l.color }} />
                    {l.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}