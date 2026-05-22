import { SectionTag } from "../home/helpers";

const MISSION_STATS = [
  { num: "2021", label: "Founded" },
  { num: "340+", label: "Agencies" },
  { num: "24", label: "Team Members" },
  { num: "$4.2M", label: "Seed Raised" },
];

export default function AboutHero() {
  return (
    <section className="px-[5%] pt-20 pb-16 relative overflow-hidden">
      {/* Glows */}
      <div className="absolute top-0 right-[-5%] w-[600px] h-[500px] bg-[radial-gradient(ellipse,rgba(108,99,255,0.12)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[20%] w-[300px] h-[300px] bg-[radial-gradient(ellipse,rgba(78,205,196,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[800px] relative z-10">
        <SectionTag>Our Story</SectionTag>
        <h1 className="text-5xl md:text-6xl lg:text-[4rem] font-extrabold tracking-tight leading-[1.1] mb-5">
          <span className="bg-gradient-to-br from-white via-[#c8c4ff] to-teal-400 bg-clip-text text-transparent">
            We&apos;re building the ops layer
          </span>
          <br />
          your agency deserves.
        </h1>
        <p className="text-lg text-[#8B89A8] max-w-[580px] font-light leading-relaxed mb-9">
          OrbitOps was born from frustration. Too many tools, too many tabs, too
          many handoffs. We set out to build the platform we always wished
          existed — one that thinks like an agency, moves like a startup.
        </p>

        {/* Stats bar */}
        <div className="flex border border-white/[0.07] rounded-2xl overflow-hidden bg-[#0d0f1e] max-w-[700px]">
          {MISSION_STATS.map((s, i) => (
            <div
              key={s.label}
              className={`flex-1 px-7 py-6 ${i < MISSION_STATS.length - 1 ? "border-r border-white/[0.07]" : ""}`}
            >
              <div className="text-[2rem] font-bold text-white font-mono leading-none">
                {s.num}
              </div>
              <div className="text-xs text-[#8B89A8] mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
