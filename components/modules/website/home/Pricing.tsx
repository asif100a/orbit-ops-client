import { useState } from "react";
import { SectionTag, SectionTitle } from "./helpers";

interface PricePlan {
  plan: string;
  amount: string;
  period: string;
  features: string[];
  featured?: boolean;
  cta: string;
}

const PRICING: PricePlan[] = [
  {
    plan: "Starter",
    amount: "$0",
    period: "Free forever · Up to 3 users",
    features: ["3 active projects", "Basic task management", "Team chat", "Client portal (1 client)", "5GB file storage"],
    cta: "Get Started Free",
  },
  {
    plan: "Agency",
    amount: "$49",
    period: "Billed annually · Up to 25 users",
    features: ["Unlimited projects", "AI features & task generator", "Finance & invoicing", "Sprint analytics", "50GB file storage", "GitHub & Slack integrations"],
    featured: true,
    cta: "Start 14-Day Trial",
  },
  {
    plan: "Enterprise",
    amount: "Custom",
    period: "Tailored for large agencies",
    features: ["Unlimited everything", "Custom AI models", "SSO & advanced security", "Dedicated account manager", "SLA guarantee", "Custom integrations"],
    cta: "Talk to Sales",
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(true);
 
  return (
    <section className="px-[5%] py-24 text-center">
      <SectionTag>Pricing</SectionTag>
      <SectionTitle className="max-w-lg mx-auto mb-4">Simple, transparent pricing</SectionTitle>
      <p className="text-[#8B89A8] max-w-md mx-auto leading-relaxed">
        Start free, scale as you grow. No hidden fees, no per-seat surprises.
      </p>
 
      {/* Toggle */}
      <div className="flex items-center justify-center gap-3 mt-8">
        <span className={`text-sm ${!annual ? "text-white" : "text-[#8B89A8]"}`}>Monthly</span>
        <button
          onClick={() => setAnnual((p) => !p)}
          className="w-10 h-5 rounded-full bg-violet-600 relative border-none cursor-pointer"
        >
          <div
            className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all duration-200 ${annual ? "left-5" : "left-0.5"}`}
          />
        </button>
        <span className={`text-sm ${annual ? "text-white" : "text-[#8B89A8]"}`}>
          Annual <span className="text-teal-400 text-xs">Save 20%</span>
        </span>
      </div>
 
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
        {PRICING.map((p) => (
          <div
            key={p.plan}
            className={`relative rounded-2xl p-9 text-left transition-all ${
              p.featured
                ? "border border-violet-500 bg-violet-500/[0.07]"
                : "border border-white/[0.07] bg-white/[0.04]"
            }`}
          >
            {p.featured && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-600 text-white text-xs font-medium px-4 py-1 rounded-full whitespace-nowrap">
                Most Popular
              </div>
            )}
            <div className="text-xs tracking-widest uppercase text-[#8B89A8] mb-3">{p.plan}</div>
            <div className="text-4xl font-bold tracking-tight text-white mb-1.5">
              {p.amount}
              {p.plan === "Agency" && <span className="text-base font-normal">/mo</span>}
            </div>
            <div className="text-xs text-[#8B89A8] mb-6">{p.period}</div>
            <ul className="space-y-0 mb-8 divide-y divide-white/[0.07]">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 py-2.5 text-sm text-[#8B89A8]">
                  <div className="w-4 h-4 rounded-full bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400 text-[10px] flex-shrink-0">
                    ✓
                  </div>
                  {f}
                </li>
              ))}
            </ul>
            <button
              className={`w-full py-3 rounded-xl font-medium text-sm transition-all cursor-pointer ${
                p.featured
                  ? "bg-violet-600 hover:bg-violet-500 text-white border-none shadow-[0_0_32px_rgba(108,99,255,0.35)]"
                  : "bg-transparent border border-white/[0.07] hover:border-white/25 text-white"
              }`}
            >
              {p.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}