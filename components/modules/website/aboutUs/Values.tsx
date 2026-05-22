import { SectionTag } from "../home/helpers";

const VALUES = [
  { num: "01", title: "Radical Transparency", desc: "No dark patterns, no surprise billing, no lock-in. Every decision we make is explainable to any customer." },
  { num: "02", title: "Agencies First", desc: "We only build features that solve real agency problems — validated through deep customer research, not guesswork." },
  { num: "03", title: "Ship Fast, Refine Often", desc: "We'd rather get 80% right and iterate in the open than spend months on a perfect feature nobody uses." },
  { num: "04", title: "AI With Purpose", desc: "Every AI feature must save real time. We don't ship AI gimmicks — only capabilities with measurable impact." },
];

export default function Values() {
  return (
    <section className="bg-[#0d0f1e] border-y border-white/[0.07] px-[5%] py-16">
      <SectionTag>Core Values</SectionTag>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
        What drives every decision we make
      </h2>
      <p className="text-sm text-[#8B89A8] mb-10 max-w-lg">
        These aren&apos;t just wall posters. They&apos;re the principles behind every feature, every hire, and every product decision.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {VALUES.map((v) => (
          <div
            key={v.num}
            className="bg-[#131629] border border-white/[0.07] rounded-2xl p-6 hover:border-violet-500/30 hover:-translate-y-1 transition-all duration-300 cursor-default"
          >
            <div className="text-[2rem] font-extrabold bg-gradient-to-br from-violet-400 to-teal-400 bg-clip-text text-transparent mb-2.5 leading-none">
              {v.num}
            </div>
            <div className="font-semibold text-white text-[0.9rem] mb-2">{v.title}</div>
            <div className="text-[0.78rem] text-[#8B89A8] leading-relaxed">{v.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}