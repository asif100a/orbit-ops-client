const CONTACT_OPTIONS = [
  {
    icon: "💬",
    title: "Live Chat Support",
    desc: "Chat with our support team directly inside the app. Average response time under 4 minutes during business hours.",
    link: "Open live chat →",
  },
  {
    icon: "📅",
    title: "Book a Demo",
    desc: "Get a personalized walkthrough of OrbitOps with one of our agency specialists. 30 minutes, no pressure.",
    link: "Schedule a session →",
  },
  {
    icon: "📚",
    title: "Help Center",
    desc: "Browse 200+ guides, tutorials, and how-to videos. Most answers are already documented and searchable.",
    link: "Visit documentation →",
  },
];

export default function ContactOptions() {
  return (
    <div className="bg-[#0d0f1e] px-[5%] pb-14 grid grid-cols-1 md:grid-cols-3 gap-4">
      {CONTACT_OPTIONS.map((o) => (
        <div
          key={o.title}
          className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-6 hover:border-violet-500/30 hover:-translate-y-1 transition-all duration-300 cursor-default"
        >
          <div className="w-11 h-11 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-xl mb-3.5">
            {o.icon}
          </div>
          <div className="font-semibold text-white text-[0.9rem] mb-1.5">{o.title}</div>
          <p className="text-[0.78rem] text-[#8B89A8] leading-relaxed mb-3">{o.desc}</p>
          <span className="text-[0.78rem] text-violet-400 hover:underline cursor-pointer">{o.link}</span>
        </div>
      ))}
    </div>
  );
}