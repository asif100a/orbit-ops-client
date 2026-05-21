import { SectionTag, SectionTitle } from "./helpers";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
  avatarBg: string;
  avatarColor: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "We replaced 4 separate tools with OrbitOps. Our PM workflow is 40% faster and clients actually love the portal experience.",
    name: "Ayesha Khan",
    role: "CEO, PixelCraft Agency",
    initials: "AK",
    avatarBg: "bg-violet-500/15",
    avatarColor: "text-violet-300",
  },
  {
    quote: "The AI sprint summaries alone save us 3 hours every two weeks. The client update generator is genuinely magic — it reads our task data perfectly.",
    name: "Marcus Reed",
    role: "Head of Ops, Devforge Labs",
    initials: "MR",
    avatarBg: "bg-teal-500/15",
    avatarColor: "text-teal-300",
  },
  {
    quote: "Finally, a tool that understands how agencies actually work. The multi-role system is perfectly designed — every team member gets exactly what they need.",
    name: "Sara Patel",
    role: "Founder, Luminary Digital",
    initials: "SP",
    avatarBg: "bg-red-500/15",
    avatarColor: "text-red-300",
  },
];

function Testimonials() {
  return (
    <section className="bg-[#0d0f1e] border-y border-white/[0.07] px-[5%] py-24">
      <div className="text-center">
        <SectionTag>Testimonials</SectionTag>
        <SectionTitle className="max-w-lg mx-auto">Agencies love OrbitOps</SectionTitle>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-14">
        {TESTIMONIALS.map((t) => (
          <div key={t.name} className="bg-[#131629] border border-white/[0.07] rounded-2xl p-7">
            <div className="text-yellow-400 tracking-widest mb-4">★★★★★</div>
            <p className="text-sm text-[#8B89A8] leading-relaxed mb-6 italic">"{t.quote}"</p>
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full ${t.avatarBg} ${t.avatarColor} flex items-center justify-center text-xs font-semibold`}>
                {t.initials}
              </div>
              <div>
                <div className="text-sm font-medium text-white">{t.name}</div>
                <div className="text-xs text-[#8B89A8]">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
