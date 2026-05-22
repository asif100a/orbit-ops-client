import { SectionTag } from "../home/helpers";

const PILLARS = [
  { icon: "🎯", title: "Focus on Agencies", desc: "Every feature is designed specifically for how agencies actually operate — not adapted from other use cases." },
  { icon: "🤖", title: "AI at the Core", desc: "Intelligence baked in from day one — not bolted on. AI that genuinely saves hours every week." },
  { icon: "🔗", title: "Deep Integration", desc: "Connect the entire stack — GitHub, Slack, Calendar, Stripe — so nothing falls between the cracks." },
  { icon: "⚡", title: "Built for Speed", desc: "Fast to set up, faster to learn. Your team shouldn't need a training course to use their own tool." },
];

export default function Mission() {
  return (
    <section className="px-[5%] py-16 border-t border-white/[0.07] grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      {/* Text */}
      <div>
        <SectionTag>Mission</SectionTag>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
          To eliminate operational chaos for creative agencies — everywhere.
        </h2>
        <p className="text-sm text-[#8B89A8] leading-relaxed mb-4">
          Most project management tools are built for solo developers or enterprise corporations. Agencies are neither. They&apos;re fast-moving, client-facing, team-driven organizations that need something smarter.
        </p>
        <p className="text-sm text-[#8B89A8] leading-relaxed">
          We built OrbitOps to be the connective tissue between every department: from the PM planning sprints to the designer seeking approval, from the developer closing tickets to the finance team chasing invoices.
        </p>
      </div>
 
      {/* Pillars */}
      <div className="grid grid-cols-2 gap-3">
        {PILLARS.map((p) => (
          <div
            key={p.title}
            className="bg-white/[0.04] border border-white/[0.07] rounded-xl p-5 hover:border-violet-500/30 hover:-translate-y-0.5 transition-all duration-300 cursor-default"
          >
            <div className="text-[22px] mb-2.5">{p.icon}</div>
            <div className="font-semibold text-white text-[0.85rem] mb-1.5">{p.title}</div>
            <div className="text-[0.78rem] text-[#8B89A8] leading-relaxed">{p.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}