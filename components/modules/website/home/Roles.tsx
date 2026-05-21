import { SectionTag, SectionTitle } from "./helpers";

interface RoleCard {
  icon: string;
  name: string;
  desc: string;
  bg: string;
}

const ROLES: RoleCard[] = [
  { icon: "🛡️", name: "Super Admin", desc: "Platform-level control. Manage all agencies, subscriptions, AI usage, and system health.", bg: "bg-violet-500/10" },
  { icon: "👑", name: "Agency Owner", desc: "Full business overview — projects, team, finances, and client relationships in one dashboard.", bg: "bg-red-500/10" },
  { icon: "📋", name: "Project Manager", desc: "Sprint planning, task allocation, workload balancing, and daily standups — built for PMs.", bg: "bg-teal-500/10" },
  { icon: "💻", name: "Employee", desc: "Personal task board, time tracking, attendance, learning center, and performance metrics.", bg: "bg-yellow-500/10" },
  { icon: "🤝", name: "Client", desc: "Branded portal with project progress, approvals, invoices, and direct communication.", bg: "bg-teal-500/10" },
];

export default function Roles() {
  return (
    <section className="bg-[#0d0f1e] border-y border-white/[0.07] px-[5%] py-24">
      <div className="text-center">
        <SectionTag>Built for Everyone</SectionTag>
        <SectionTitle className="max-w-xl mx-auto mb-4">One platform. Five powerful roles.</SectionTitle>
        <p className="text-[#8B89A8] max-w-lg mx-auto leading-relaxed">
          Every stakeholder gets a tailored experience — no bloat, no confusion.
        </p>
      </div>
 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-14">
        {ROLES.map((r) => (
          <div
            key={r.name}
            className="bg-[#131629] border border-white/[0.07] rounded-xl p-6 text-center transition-all duration-300 hover:border-violet-500/35 hover:bg-violet-500/[0.06] cursor-default"
          >
            <div className={`w-13 h-13 rounded-full ${r.bg} w-12 h-12 flex items-center justify-center text-2xl mx-auto mb-4`}>
              {r.icon}
            </div>
            <div className="font-semibold text-white text-[0.95rem] mb-1.5">{r.name}</div>
            <div className="text-[0.78rem] text-[#8B89A8] leading-snug">{r.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}