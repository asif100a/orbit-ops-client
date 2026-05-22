const INFO_ITEMS = [
  { icon: "✉️", label: "General Enquiries", value: "hello@orbitops.io", sub: "Partnerships, press, general questions" },
  { icon: "🛠️", label: "Technical Support", value: "support@orbitops.io", sub: "Bugs, account issues, data questions" },
  { icon: "💼", label: "Sales & Enterprise", value: "sales@orbitops.io", sub: "Custom plans, volume pricing, onboarding" },
  { icon: "📰", label: "Press & Media", value: "press@orbitops.io", sub: "Interviews, coverage, media kit" },
];

export default function ContactInfoPanel() {
  return (
    <div className="bg-[#0d0f1e] border border-white/[0.07] rounded-2xl p-8">
      <h3 className="font-bold text-white text-[1.1rem] mb-1.5">Contact Information</h3>
      <p className="text-[0.85rem] text-[#8B89A8] leading-relaxed mb-7">
        Reach out through any of these channels and a real human will get back to you — typically within one business day.
      </p>
 
      {/* Info items */}
      <div className="flex flex-col gap-5">
        {INFO_ITEMS.map((item) => (
          <div key={item.label} className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-base flex-shrink-0">
              {item.icon}
            </div>
            <div>
              <div className="text-[0.68rem] uppercase tracking-widest text-[#8B89A8] mb-0.5">{item.label}</div>
              <div className="text-[0.875rem] text-white">{item.value}</div>
              <div className="text-[0.72rem] text-[#8B89A8]">{item.sub}</div>
            </div>
          </div>
        ))}
      </div>
 
      {/* Divider */}
      <div className="h-px bg-white/[0.07] my-6" />
 
      {/* Office */}
      <div className="bg-[#131629] border border-white/[0.07] rounded-xl p-5">
        {/* Map placeholder */}
        <div className="h-28 rounded-lg bg-gradient-to-br from-violet-500/[0.08] to-teal-500/[0.05] border border-white/[0.07] flex items-center justify-center text-3xl mb-4">
          🗺️
        </div>
        <div className="font-semibold text-white text-[0.85rem] mb-0.5">OrbitOps HQ</div>
        <div className="text-[0.75rem] text-[#8B89A8]">42 Mission Street, San Francisco, CA 94105</div>
        <div className="text-[0.72rem] text-violet-400 hover:underline cursor-pointer mt-1">
          Open in Google Maps →
        </div>
      </div>
    </div>
  );
}