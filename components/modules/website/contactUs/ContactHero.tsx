import { SectionTag } from "../home/helpers";

export default function ContactHero() {
  return (
    <section className="px-[5%] pt-20 pb-14 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-[radial-gradient(ellipse,rgba(78,205,196,0.10)_0%,transparent_70%)] pointer-events-none" />
      <div className="relative z-10">
        <SectionTag>Get in Touch</SectionTag>
        <h1 className="text-5xl md:text-6xl lg:text-[4rem] font-extrabold tracking-tight leading-[1.1] mb-5">
          <span className="bg-gradient-to-br from-white via-[#c8c4ff] to-teal-400 bg-clip-text text-transparent">
            We&apos;d love to hear
          </span>
          <br />from you.
        </h1>
        <p className="text-lg text-[#8B89A8] max-w-[520px] font-light leading-relaxed">
          Whether you&apos;re evaluating OrbitOps, need help getting started, or have a question for the team — we&apos;re here and we reply fast.
        </p>
      </div>
    </section>
  );
}