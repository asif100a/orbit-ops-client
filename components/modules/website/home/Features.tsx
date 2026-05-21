import { SectionTag, SectionTitle } from "./helpers";

interface FeatureCard {
  icon: string;
  title: string;
  desc: string;
}

const FEATURES: FeatureCard[] = [
  { icon: "🗂️", title: "Project Management", desc: "Kanban, timeline, Gantt — switch views instantly. Manage sprints, milestones, and budgets with zero friction across your entire portfolio." },
  { icon: "👥", title: "Team & HR", desc: "Role-based access, department management, attendance tracking, leave requests, and salary management — all wired together in one place." },
  { icon: "💬", title: "Real-Time Chat", desc: "Direct messages, group channels, file sharing, voice notes, and emoji reactions. Your team communicates where the work actually happens." },
  { icon: "💰", title: "Finance & Billing", desc: "Generate professional invoices, track recurring payments, manage expenses, and run payroll — all connected to your active projects." },
  { icon: "🤖", title: "AI-Powered Insights", desc: "Predict delays, detect burnout, auto-generate sprint summaries, and let AI draft client progress updates from your actual task data." },
  { icon: "📊", title: "Advanced Analytics", desc: "Revenue trends, sprint velocity, employee utilization, and client satisfaction — beautiful dashboards that turn data into decisions." },
  { icon: "🖥️", title: "Client Portal", desc: "Give clients a clean, branded portal to track progress, approve deliverables, view invoices, and book meetings — no more email threads." },
  { icon: "⚙️", title: "Integrations", desc: "Connect GitHub, Slack, Discord, and Google Calendar. Sync commits, pull requests, notifications, and meetings automatically." },
  { icon: "🔐", title: "Security & RBAC", desc: "5 granular roles, 2FA, session management, audit logs, and SSO. Enterprise-grade security that scales without adding complexity." },
];

export default function Features() {
  return (
    <section className="px-[5%] py-24">
      <div className="text-center">
        <SectionTag>Platform Features</SectionTag>
        <SectionTitle className="max-w-2xl mx-auto mb-4">
          Everything your agency needs — in one orbit
        </SectionTitle>
        <p className="text-[#8B89A8] max-w-xl mx-auto leading-relaxed">
          From sprint planning to client billing, OrbitOps connects every layer of your operation with surgical precision.
        </p>
      </div>
 
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="group bg-white/[0.04] border border-white/[0.07] rounded-2xl p-7 transition-all duration-300 hover:border-violet-500/30 hover:-translate-y-1 cursor-default relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(108,99,255,0.08),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="w-11 h-11 rounded-xl bg-violet-500/12 border border-violet-500/20 flex items-center justify-center text-xl mb-5">
              {f.icon}
            </div>
            <h3 className="font-semibold text-white text-base mb-2.5">{f.title}</h3>
            <p className="text-sm text-[#8B89A8] leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}