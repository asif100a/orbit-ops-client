export default function CTA() {
  return (
    <div className="mx-[5%] my-16">
      <div className="relative rounded-[20px] bg-gradient-to-br from-violet-500/15 to-teal-500/[0.08] border border-violet-500/25 px-[5%] py-20 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse,rgba(108,99,255,0.15)_0%,transparent_70%)] pointer-events-none" />
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 relative z-10">
          Ready to put your agency in orbit?
        </h2>
        <p className="text-[#8B89A8] mb-10 relative z-10">
          Join 340+ agencies already running smarter with OrbitOps. No credit card required.
        </p>
        <div className="flex flex-wrap gap-3.5 justify-center relative z-10">
          <button className="px-8 py-3.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-medium transition-all shadow-[0_0_32px_rgba(108,99,255,0.35)]">
            Start Free Trial — 14 Days
          </button>
          <button className="px-8 py-3.5 bg-transparent border border-white/[0.07] hover:border-white/25 text-white rounded-xl font-medium transition-all">
            Book a Demo
          </button>
        </div>
        <p className="mt-6 text-xs text-[#8B89A8] relative z-10">
          Setup in under 5 minutes · Cancel anytime · SOC 2 compliant
        </p>
      </div>
    </div>
  );
}
