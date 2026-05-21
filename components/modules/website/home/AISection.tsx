import { SectionTag, SectionTitle } from "./helpers";

const AI_FEATURES = [
  { icon: "✍️", title: "AI Task Generator", desc: "Describe a feature in plain English. AI generates a full task breakdown with subtasks, priorities, and time estimates." },
  { icon: "📊", title: "Sprint Intelligence", desc: "Automatic sprint summaries, velocity predictions, and risk flags — generated from real commit and task data." },
  { icon: "📧", title: "Client Update Drafts", desc: "One click turns your sprint data into a polished client progress email. Editable before sending." },
  { icon: "🧠", title: "Burnout Detection", desc: "AI monitors workload patterns and flags team members showing signs of overload before it becomes a problem." },
];
const AI_TASKS = [
  "Set up OAuth 2.0 provider config · 3pts",
  "Build login UI components · 2pts",
  "Implement JWT token handling · 5pts",
  "Add session persistence · 3pts",
  "Write auth middleware · 3pts",
  "QA testing & edge cases · 2pts",
];

export default function AISection() {
  return (
    <section className="px-[5%] py-24 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 right-[-10%] -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(ellipse,rgba(78,205,196,0.08)_0%,transparent_70%)] pointer-events-none" />
 
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Left */}
        <div>
          <SectionTag>AI-Powered</SectionTag>
          <SectionTitle className="mb-4">Your agency's unfair advantage</SectionTitle>
          <p className="text-[#8B89A8] leading-relaxed mb-2">
            OrbitOps AI doesn't just report — it thinks. Generate sprint summaries, predict project delays, detect team burnout, and draft professional client updates automatically.
          </p>
          <ul className="mt-8 divide-y divide-white/[0.07]">
            {AI_FEATURES.map((f) => (
              <li key={f.title} className="flex items-start gap-3.5 py-3.5">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center flex-shrink-0 text-[15px]">
                  {f.icon}
                </div>
                <div>
                  <div className="font-semibold text-white text-[0.9rem] mb-1">{f.title}</div>
                  <div className="text-[0.82rem] text-[#8B89A8]">{f.desc}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
 
        {/* Right — AI Demo Widget */}
        <div className="bg-[#131629] border border-white/[0.07] rounded-2xl overflow-hidden">
          <div className="flex items-center gap-2.5 bg-[#0d0f1e] border-b border-white/[0.07] px-5 py-3.5">
            <span className="font-semibold text-white text-[0.85rem]">AI Task Generator</span>
            <span className="px-3 py-0.5 rounded-full bg-teal-500/12 text-teal-400 text-[0.72rem] border border-teal-500/20">
              ● Live
            </span>
          </div>
          <div className="p-5">
            {/* User message */}
            <div className="mb-4">
              <div className="ml-[30%] bg-violet-500/10 border border-violet-500/15 rounded-[10px_10px_2px_10px] px-4 py-3 text-sm text-white">
                "Create frontend tasks for the authentication module with Google OAuth."
              </div>
            </div>
            {/* Bot message */}
            <div className="mr-[10%] bg-[#0d0f1e] border border-white/[0.07] rounded-[10px_10px_10px_2px] px-4 py-3 text-sm text-[#8B89A8]">
              <div className="text-white text-xs font-medium mb-2">Generated 6 tasks · Est. 18 story points</div>
              <div className="divide-y divide-white/[0.07]">
                {AI_TASKS.map((t) => (
                  <div key={t} className="flex items-center gap-2 py-2 text-[0.8rem]">
                    <div className="w-3.5 h-3.5 rounded flex-shrink-0 bg-violet-500 flex items-center justify-center text-white text-[9px]">✓</div>
                    {t}
                  </div>
                ))}
              </div>
            </div>
            {/* Actions */}
            <div className="flex gap-2 mt-3.5">
              <button className="flex-1 py-2 bg-violet-600 hover:bg-violet-500 text-white text-xs rounded-lg border-none cursor-pointer transition-colors">
                Add to Sprint →
              </button>
              <button className="px-3.5 py-2 border border-white/[0.07] bg-transparent text-[#8B89A8] text-xs rounded-lg cursor-pointer hover:text-white transition-colors">
                Regenerate
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}