const FOOTER_LINKS = {
  Product: ["Features", "Pricing", "Changelog", "Roadmap", "Status"],
  Resources: ["Documentation", "Blog", "Tutorials", "API Reference", "Community"],
  Company: ["About", "Careers", "Privacy Policy", "Terms of Service", "Contact"],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.07] px-[5%] pt-16 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-16">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 font-extrabold text-lg tracking-tight text-white mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-teal-400 flex items-center justify-center text-sm">
              ⬡
            </div>
            OrbitOps
          </div>
          <p className="text-sm text-[#8B89A8] leading-relaxed max-w-[280px]">
            The all-in-one agency management platform. Built for agencies that want to scale without the chaos.
          </p>
          <div className="flex gap-3 mt-5">
            {["𝕏", "in", "🐙"].map((s) => (
              <button
                key={s}
                className="w-8 h-8 rounded-lg border border-white/[0.07] bg-transparent text-[#8B89A8] hover:text-white hover:border-white/20 transition-all cursor-pointer text-sm flex items-center justify-center"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
 
        {/* Link columns */}
        {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
          <div key={heading}>
            <h5 className="font-semibold text-[0.875rem] text-white mb-5">{heading}</h5>
            <ul className="space-y-3">
              {links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-[0.85rem] text-[#8B89A8] hover:text-white transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
 
      <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/[0.07] gap-3">
        <p className="text-xs text-[#8B89A8]">© 2025 OrbitOps, Inc. All rights reserved.</p>
        <p className="text-xs text-[#8B89A8]">🔒 SOC 2 Type II · GDPR Ready · 99.9% Uptime</p>
      </div>
    </footer>
  );
}