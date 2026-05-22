import { SectionTag } from "../home/helpers";

const TIMELINE = [
  {
    year: "Q1 2021",
    title: "The idea is born",
    desc: "Rayan and Layla, both exhausted by juggling ClickUp, Slack, Harvest, and Xero at their respective agencies, decide to build something better.",
    accent: false,
  },
  {
    year: "Q3 2021",
    title: "First prototype & beta users",
    desc: "MVP launches to 12 agency friends. 9 of them switch within 30 days. Product-market fit confirmed immediately.",
    accent: false,
  },
  {
    year: "Q2 2022",
    title: "$4.2M seed round closed",
    desc: "Led by Horizon Ventures with participation from Notion co-founder Ivan Zhao's angel fund. Team grows to 8.",
    accent: false,
  },
  {
    year: "Q4 2022",
    title: "100 agencies milestone",
    desc: "OrbitOps crosses 100 agency customers and $500K ARR. AI features begin rolling out to beta users.",
    accent: false,
  },
  {
    year: "2024",
    title: "Public beta launches",
    desc: "Full platform open to everyone. 340+ agencies onboarded, 12k+ active projects managed every month. Series A in progress.",
    accent: true,
  },
];

export default function Timeline() {
  return (
    <section className="bg-[#0d0f1e] border-y border-white/[0.07] px-[5%] py-16">
      <SectionTag>Journey</SectionTag>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-10">
        How we got here
      </h2>

      <div className="relative pl-8">
        {/* Vertical line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500 via-teal-400 to-transparent" />

        <div className="flex flex-col gap-8">
          {TIMELINE.map((item) => (
            <div key={item.year} className="relative pl-6">
              {/* Dot */}
              <div
                className={`absolute left-[-36px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-[#0d0f1e] ${
                  item.accent ? "bg-teal-400" : "bg-violet-500"
                }`}
              />
              <div className="text-[0.7rem] tracking-widest uppercase text-violet-400 mb-1">
                {item.year}
              </div>
              <div className="font-semibold text-white text-[0.95rem] mb-1">
                {item.title}
              </div>
              <div className="text-[0.82rem] text-[#8B89A8] leading-relaxed max-w-2xl">
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
