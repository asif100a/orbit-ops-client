"use client";

import { useState } from "react";
import {
  Bell,
  Check,
  ChevronRight,
  CircleUserRound,
  Globe2,
  KeyRound,
  Mail,
  Monitor,
  Palette,
  Save,
  ShieldCheck,
  Smartphone,
  Trash2,
} from "lucide-react";

const SETTINGS_NAV = [
  { label: "Profile", description: "Your personal details", icon: CircleUserRound, active: true },
  { label: "Notifications", description: "Stay in the loop", icon: Bell },
  { label: "Security", description: "Password and sessions", icon: ShieldCheck },
  { label: "Preferences", description: "Tune your workspace", icon: Palette },
];

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={enabled}
      onClick={onChange}
      className={`relative h-6 w-11 shrink-0 rounded-full p-1 transition ${enabled ? "bg-violet-500" : "bg-white/[0.12]"}`}
    >
      <span className={`block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${enabled ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );
}

function Field({ label, value, type = "text" }: { label: string; value: string; type?: string }) {
  return (
    <label className="block space-y-2">
      <span className="text-[11px] font-medium text-[#AAA7C8]">{label}</span>
      <input
        type={type}
        defaultValue={value}
        className="h-10 w-full rounded-xl border border-white/[0.08] bg-[#0D0F1E] px-3 text-sm text-white outline-none transition placeholder:text-[#55536B] focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/10"
      />
    </label>
  );
}

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [taskReminders, setTaskReminders] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  function saveChanges() {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  }

  return (
    <div className="space-y-7 pb-8">
      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-sm text-[#8B89A8]">Make OrbitOps yours</p>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Settings</h1>
          <p className="mt-2 max-w-xl text-sm text-[#8B89A8]">Manage your profile, preferences, and how you stay connected to your work.</p>
        </div>
        <button onClick={saveChanges} className="flex h-10 items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 text-sm font-medium text-white shadow-[0_0_24px_rgba(108,99,255,0.2)] transition hover:bg-violet-500">
          {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          {saved ? "Changes saved" : "Save changes"}
        </button>
      </section>

      <div className="grid gap-5 lg:grid-cols-[230px_minmax(0,1fr)]">
        <aside className="h-fit rounded-2xl border border-white/[0.07] bg-white/[0.025] p-2">
          <div className="mb-2 px-3 pt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5F5D78]">Account</div>
          <nav className="space-y-1">
            {SETTINGS_NAV.map((item) => {
              const Icon = item.icon;
              return (
                <button key={item.label} type="button" className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${item.active ? "bg-violet-500/10 text-white shadow-[inset_2px_0_0_#6C63FF]" : "text-[#8B89A8] hover:bg-white/[0.035] hover:text-white"}`}>
                  <Icon className={`h-[17px] w-[17px] ${item.active ? "text-violet-400" : "text-[#686681] group-hover:text-[#AAA7C8]"}`} />
                  <span className="min-w-0 flex-1"><span className="block text-xs font-medium">{item.label}</span><span className="mt-0.5 block truncate text-[10px] text-[#686681]">{item.description}</span></span>
                  {item.active && <ChevronRight className="h-3.5 w-3.5 text-violet-400" />}
                </button>
              );
            })}
          </nav>
          <div className="mt-4 border-t border-white/[0.06] px-3 py-4">
            <div className="flex items-center gap-2 text-[10px] text-[#686681]"><span className="h-1.5 w-1.5 rounded-full bg-teal-400" />Your account is up to date</div>
          </div>
        </aside>

        <main className="min-w-0 space-y-5">
          <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025]">
            <div className="flex flex-col gap-4 border-b border-white/[0.06] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div><h2 className="text-sm font-semibold text-white">Personal information</h2><p className="mt-1 text-xs text-[#686681]">This is how your name and profile appear across the workspace.</p></div>
              <span className="flex items-center gap-1.5 text-[10px] text-teal-300"><Check className="h-3.5 w-3.5" /> Profile complete</span>
            </div>
            <div className="space-y-6 p-5 sm:p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-teal-400 text-lg font-bold text-white shadow-[0_8px_28px_rgba(108,99,255,0.2)]">AS</div>
                <div><p className="text-sm font-semibold text-white">Profile photo</p><p className="mt-1 text-xs text-[#686681]">JPG, GIF or PNG. 2MB max.</p><button type="button" className="mt-2 text-[11px] font-medium text-violet-400 hover:text-violet-300">Change avatar</button></div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2"><Field label="Full name" value="Asif Sheikh" /><Field label="Display name" value="Asif" /><Field label="Email address" value="asif@orbitops.io" type="email" /><Field label="Role" value="Administrator" /></div>
              <div className="grid gap-4 sm:grid-cols-2"><label className="block space-y-2"><span className="text-[11px] font-medium text-[#AAA7C8]">Timezone</span><select defaultValue="Karachi" className="h-10 w-full appearance-none rounded-xl border border-white/[0.08] bg-[#0D0F1E] px-3 text-sm text-white outline-none focus:border-violet-500/60"><option>Karachi (GMT+5)</option><option>London (GMT+1)</option><option>New York (GMT-4)</option></select></label><label className="block space-y-2"><span className="text-[11px] font-medium text-[#AAA7C8]">Job title</span><input defaultValue="Product designer" className="h-10 w-full rounded-xl border border-white/[0.08] bg-[#0D0F1E] px-3 text-sm text-white outline-none focus:border-violet-500/60" /></label></div>
            </div>
          </section>

          <section className="rounded-2xl border border-white/[0.07] bg-white/[0.025]">
            <div className="border-b border-white/[0.06] px-5 py-5 sm:px-6"><h2 className="text-sm font-semibold text-white">Notifications</h2><p className="mt-1 text-xs text-[#686681]">Choose what deserves your attention.</p></div>
            <div className="divide-y divide-white/[0.05]">
              {[{ icon: Mail, label: "Email updates", text: "Product news, tips, and workspace announcements", value: emailUpdates, set: () => setEmailUpdates(!emailUpdates) }, { icon: Bell, label: "Task reminders", text: "Get notified before tasks and deadlines are due", value: taskReminders, set: () => setTaskReminders(!taskReminders) }, { icon: Globe2, label: "Weekly digest", text: "A Monday overview of your team and project activity", value: weeklyDigest, set: () => setWeeklyDigest(!weeklyDigest) }].map((item) => { const Icon = item.icon; return <div key={item.label} className="flex items-center gap-3 px-5 py-4 sm:px-6"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-[#8B89A8]"><Icon className="h-4 w-4" /></div><div className="min-w-0 flex-1"><p className="text-xs font-medium text-[#D9D7EA]">{item.label}</p><p className="mt-1 text-[10px] text-[#686681]">{item.text}</p></div><Toggle enabled={item.value} onChange={item.set} /></div>; })}
            </div>
          </section>

          <section className="rounded-2xl border border-white/[0.07] bg-white/[0.025]">
            <div className="border-b border-white/[0.06] px-5 py-5 sm:px-6"><h2 className="text-sm font-semibold text-white">Security & sessions</h2><p className="mt-1 text-xs text-[#686681]">Keep your account protected and review where you are signed in.</p></div>
            <div className="divide-y divide-white/[0.05]">
              <div className="flex items-center gap-3 px-5 py-4 sm:px-6"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400"><KeyRound className="h-4 w-4" /></div><div className="flex-1"><p className="text-xs font-medium text-[#D9D7EA]">Password</p><p className="mt-1 text-[10px] text-[#686681]">Last changed 18 days ago</p></div><button type="button" className="rounded-lg border border-white/[0.08] px-3 py-2 text-[10px] font-medium text-[#AAA7C8] transition hover:bg-white/[0.05] hover:text-white">Update password</button></div>
              <div className="flex items-center gap-3 px-5 py-4 sm:px-6"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-400/10 text-teal-300"><Smartphone className="h-4 w-4" /></div><div className="flex-1"><p className="text-xs font-medium text-[#D9D7EA]">Two-factor authentication</p><p className="mt-1 text-[10px] text-[#686681]">Add an extra layer of account security</p></div><span className="mr-2 text-[10px] text-[#686681]">Not enabled</span><button type="button" className="rounded-lg bg-teal-400/10 px-3 py-2 text-[10px] font-medium text-teal-300 transition hover:bg-teal-400/20">Enable</button></div>
              <div className="px-5 py-4 sm:px-6"><p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#686681]">Active sessions</p><div className="flex items-center gap-3"><Monitor className="h-4 w-4 text-violet-400" /><div className="flex-1"><p className="text-xs text-[#D9D7EA]">Linux · Chrome</p><p className="mt-1 text-[10px] text-teal-300">Current session · Karachi, Pakistan</p></div><button type="button" className="text-[10px] font-medium text-[#8B89A8] hover:text-white">Sign out</button></div></div>
            </div>
          </section>

          <section className="flex flex-col gap-4 rounded-2xl border border-red-400/15 bg-red-400/[0.025] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"><div><h2 className="text-sm font-semibold text-red-200">Delete account</h2><p className="mt-1 max-w-lg text-xs leading-5 text-[#8B89A8]">Permanently remove your account and all of its workspace data. This action cannot be undone.</p></div><button type="button" className="flex h-9 shrink-0 items-center justify-center gap-2 rounded-lg border border-red-400/20 px-3 text-[11px] font-medium text-red-300 transition hover:bg-red-400/10"><Trash2 className="h-3.5 w-3.5" /> Delete account</button></section>
        </main>
      </div>
    </div>
  );
}
