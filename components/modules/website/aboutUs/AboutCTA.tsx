import { SectionTag } from "../home/helpers";

export default function AboutCTA() {
  return (
    <div className="mx-[5%] my-16">
      <div className="relative rounded-[20px] bg-gradient-to-br from-violet-500/15 to-teal-500/[0.08] border border-violet-500/25 px-[5%] py-16 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse,rgba(108,99,255,0.15)_0%,transparent_70%)] pointer-events-none" />
        <SectionTag>Join Us</SectionTag>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3 relative z-10">
          Shape the future of agency operations
        </h2>
        <p className="text-[#8B89A8] text-sm mb-8 relative z-10">
          We&apos;re a remote-first team that moves fast, ships often, and cares deeply about the agencies we serve. Come build with us.
        </p>
        <div className="flex flex-wrap gap-3 justify-center relative z-10">
          <button className="px-8 py-3.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-medium transition-all shadow-[0_0_28px_rgba(108,99,255,0.3)]">
            View Open Roles
          </button>
          <button className="px-8 py-3.5 bg-transparent border border-white/[0.07] hover:border-white/25 text-white rounded-xl font-medium transition-all">
            Read Our Blog
          </button>
        </div>
      </div>
    </div>
  );
}