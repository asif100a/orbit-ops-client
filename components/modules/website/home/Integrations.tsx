import { SectionTag, SectionTitle } from "./helpers";

const INTEGRATIONS = [
  { icon: "🐙", label: "GitHub" },
  { icon: "💬", label: "Slack" },
  { icon: "🎮", label: "Discord" },
  { icon: "📅", label: "Google Calendar" },
  { icon: "💳", label: "Stripe" },
  { icon: "☁️", label: "AWS S3" },
  { icon: "📸", label: "Cloudinary" },
];

export default function Integrations() {
  return (
    <section className="bg-[#0d0f1e] border-y border-white/[0.07] px-[5%] py-24 text-center">
      <SectionTag>Integrations</SectionTag>
      <SectionTitle className="max-w-lg mx-auto mb-4">Connects with your entire stack</SectionTitle>
      <p className="text-[#8B89A8] max-w-md mx-auto leading-relaxed">
        OrbitOps plays well with every tool your team already loves.
      </p>
      <div className="flex flex-wrap gap-4 justify-center mt-12">
        {INTEGRATIONS.map((i) => (
          <div
            key={i.label}
            className="flex items-center gap-2.5 px-6 py-3 rounded-xl border border-white/[0.07] bg-white/[0.04] text-[0.875rem] text-[#8B89A8] hover:border-white/20 hover:text-white transition-all cursor-default"
          >
            <span className="text-lg">{i.icon}</span>
            {i.label}
          </div>
        ))}
      </div>
    </section>
  );
}