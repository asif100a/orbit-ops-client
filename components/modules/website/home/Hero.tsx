const STATS = [
  { num: "12k+", label: "Active Projects" },
  { num: "340+", label: "Agencies Onboarded" },
  { num: "99.9%", label: "Uptime SLA" },
  { num: "4.9★", label: "Customer Rating" },
];

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-[5%] pt-[120px] pb-20 relative overflow-hidden">
      {/* Glows */}
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse,rgba(108,99,255,0.18)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-[60%] left-[20%] w-[300px] h-[300px] bg-[radial-gradient(ellipse,rgba(78,205,196,0.10)_0%,transparent_70%)] pointer-events-none" />
 
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/35 bg-violet-500/10 text-xs text-violet-300 mb-8 animate-fade-up">
        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
        Now in Public Beta — Join 2,400+ agencies
      </div>
 
      {/* Headline */}
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] max-w-[850px] mb-6 bg-gradient-to-br from-white via-[#c8c4ff] to-teal-400 bg-clip-text text-transparent">
        The Command Center<br />Your Agency Deserves
      </h1>
 
      {/* Subtitle */}
      <p className="text-lg text-[#8B89A8] max-w-[580px] font-light leading-relaxed mb-11">
        OrbitOps unifies projects, teams, clients, and finances into one intelligent platform. Built for agencies that move fast and scale faster.
      </p>
 
      {/* Actions */}
      <div className="flex flex-wrap gap-3.5 justify-center mb-16">
        <button className="px-8 py-3.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-base font-medium shadow-[0_0_32px_rgba(108,99,255,0.35)] hover:shadow-[0_0_48px_rgba(108,99,255,0.5)] hover:-translate-y-0.5 transition-all">
          Start Free — No Card Required
        </button>
        <button className="px-8 py-3.5 bg-transparent border border-white/[0.07] hover:border-white/25 hover:bg-white/[0.04] text-white rounded-xl text-base font-medium transition-all">
          Watch Demo ▶
        </button>
      </div>
 
      {/* Stats */}
      <div className="flex flex-wrap gap-12 justify-center">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-[1.8rem] font-bold text-white font-mono">{s.num}</div>
            <div className="text-xs text-[#8B89A8] mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}