import { SectionTag } from "../home/helpers";

const TEAM = [
  {
    emoji: "👨‍💻",
    name: "Rayan Malik",
    role: "Co-Founder & CEO",
    bio: "Ex-agency PM. Built and sold two SaaS products before OrbitOps. Obsessed with ops efficiency.",
    avatarBg: "from-violet-500/15 to-teal-500/[0.08]",
    socials: ["𝕏", "in"],
  },
  {
    emoji: "👩‍🎨",
    name: "Layla Hassan",
    role: "Co-Founder & CPO",
    bio: "Designed products at Figma and Linear. Brings world-class UX thinking to agency workflows.",
    avatarBg: "from-teal-500/15 to-violet-500/[0.08]",
    socials: ["𝕏", "in"],
  },
  {
    emoji: "👨‍🔬",
    name: "Dev Sharma",
    role: "Head of Engineering",
    bio: "10 years building scalable SaaS backends. Led engineering at two Y Combinator companies.",
    avatarBg: "from-red-500/[0.12] to-yellow-500/[0.06]",
    socials: ["🐙", "in"],
  },
  {
    emoji: "👩‍💼",
    name: "Sara Okonkwo",
    role: "Head of Growth",
    bio: "Former agency owner turned growth strategist. Built OrbitOps' community from 0 to 2,400 users.",
    avatarBg: "from-yellow-500/10 to-teal-500/10",
    socials: ["𝕏", "in"],
  },
];

export default function Team() {
  return (
    <section className="bg-[#0d0f1e] border-y border-white/[0.07] px-[5%] py-16">
      <SectionTag>The Team</SectionTag>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
        The people building OrbitOps
      </h2>
      <p className="text-sm text-[#8B89A8] mb-10">
        A lean team of operators, engineers, and designers who&apos;ve all worked
        inside agencies before.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {TEAM.map((m) => (
          <div
            key={m.name}
            className="bg-white/[0.04] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-violet-500/30 hover:-translate-y-1 transition-all duration-300 cursor-default"
          >
            {/* Avatar */}
            <div
              className={`h-40 flex items-center justify-center bg-gradient-to-br ${m.avatarBg} text-5xl`}
            >
              {m.emoji}
            </div>
            {/* Info */}
            <div className="p-4">
              <div className="font-bold text-white text-[0.9rem] mb-0.5">
                {m.name}
              </div>
              <div className="text-[0.75rem] text-teal-400 mb-2">{m.role}</div>
              <div className="text-[0.75rem] text-[#8B89A8] leading-relaxed">
                {m.bio}
              </div>
              <div className="flex gap-1.5 mt-2.5">
                {m.socials.map((s, i) => (
                  <button
                    key={i}
                    className="w-7 h-7 rounded-md border border-white/[0.07] bg-transparent text-[#8B89A8] hover:text-white hover:border-white/20 transition-all text-xs flex items-center justify-center cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
