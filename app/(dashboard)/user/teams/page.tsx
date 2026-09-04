"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  Clock3,
  MessageCircle,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  Users,
  Video,
} from "lucide-react";

type Team = {
  name: string;
  description: string;
  members: number;
  activeProjects: number;
  progress: number;
  color: string;
  icon: string;
  lead: string;
};

type Member = {
  name: string;
  initials: string;
  role: string;
  status: "Available" | "In a meeting" | "Focus time" | "Away";
  color: string;
};

const TEAMS: Team[] = [
  { name: "Product Design", description: "Shape the product experience from idea to launch.", members: 4, activeProjects: 4, progress: 72, color: "from-violet-500 to-indigo-400", icon: "PD", lead: "Sarah Morgan" },
  { name: "Engineering", description: "Build reliable systems and ship meaningful improvements.", members: 3, activeProjects: 3, progress: 64, color: "from-teal-400 to-cyan-300", icon: "EN", lead: "John Davis" },
  { name: "Marketing", description: "Turn good work into clear stories people remember.", members: 3, activeProjects: 2, progress: 48, color: "from-amber-400 to-orange-400", icon: "MK", lead: "Rachel Lee" },
  { name: "Operations", description: "Keep the projects, people, and process moving smoothly.", members: 2, activeProjects: 5, progress: 81, color: "from-sky-400 to-blue-500", icon: "OP", lead: "David Chen" },
];

const MEMBERS: Record<string, Member[]> = {
  "Product Design": [
    { name: "Sarah Morgan", initials: "SM", role: "Team admin · Senior Designer", status: "In a meeting", color: "from-rose-400 to-orange-300" },
    { name: "Asif Sheikh", initials: "AS", role: "Product Designer", status: "Available", color: "from-violet-500 to-teal-400" },
    { name: "Rachel Lee", initials: "RL", role: "Content Strategist", status: "Available", color: "from-teal-400 to-cyan-300" },
    { name: "Michael Kim", initials: "MK", role: "Frontend Engineer", status: "Focus time", color: "from-amber-400 to-red-400" },
  ],
  Engineering: [
    { name: "John Davis", initials: "JD", role: "Team admin · Backend Engineer", status: "Available", color: "from-sky-400 to-blue-500" },
    { name: "Michael Kim", initials: "MK", role: "Frontend Engineer", status: "Focus time", color: "from-amber-400 to-red-400" },
    { name: "Asif Sheikh", initials: "AS", role: "Product Designer", status: "Available", color: "from-violet-500 to-teal-400" },
  ],
  Marketing: [
    { name: "Rachel Lee", initials: "RL", role: "Team admin · Content Strategist", status: "Available", color: "from-teal-400 to-cyan-300" },
    { name: "Sarah Morgan", initials: "SM", role: "Senior Designer", status: "In a meeting", color: "from-rose-400 to-orange-300" },
    { name: "Asif Sheikh", initials: "AS", role: "Product Designer", status: "Available", color: "from-violet-500 to-teal-400" },
  ],
  Operations: [
    { name: "David Chen", initials: "DC", role: "Team admin · Project Manager", status: "Away", color: "from-fuchsia-400 to-violet-500" },
    { name: "Asif Sheikh", initials: "AS", role: "Product Designer", status: "Available", color: "from-violet-500 to-teal-400" },
  ],
};

const STATUS_STYLES = {
  Available: "bg-teal-400/10 text-teal-300",
  "In a meeting": "bg-amber-400/10 text-amber-300",
  "Focus time": "bg-violet-400/10 text-violet-300",
  Away: "bg-white/[0.06] text-[#8B89A8]",
};

export default function TeamsPage() {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [query, setQuery] = useState("");
  const teams = TEAMS.filter((team) => `${team.name} ${team.description}`.toLowerCase().includes(query.toLowerCase()));
  const selectedMembers = selectedTeam ? MEMBERS[selectedTeam.name] : [];

  return (
    <div className="space-y-7">
      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-sm text-[#8B89A8]">{selectedTeam ? "Team workspace" : "Your assigned groups"}</p>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{selectedTeam ? selectedTeam.name : "Teams"}</h1>
          <p className="mt-2 text-sm text-[#8B89A8]">{selectedTeam ? selectedTeam.description : "Work with the people assigned to your projects and shared goals."}</p>
        </div>
        <button className="flex h-10 items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 text-sm font-medium text-white shadow-[0_0_24px_rgba(108,99,255,0.2)] transition hover:bg-violet-500"><Plus className="h-4 w-4" />Request a team</button>
      </section>

      {selectedTeam ? (
        <>
          <button onClick={() => setSelectedTeam(null)} className="flex items-center gap-2 text-xs font-medium text-violet-400 transition hover:text-violet-300"><ArrowLeft className="h-3.5 w-3.5" />All assigned teams</button>
          <section className="grid gap-4 sm:grid-cols-3"><div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5"><p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#686681]">Team members</p><p className="mt-3 font-mono text-2xl font-bold text-white">{selectedTeam.members}</p><p className="mt-1 text-[10px] text-[#686681]">People assigned</p></div><div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5"><p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#686681]">Active projects</p><p className="mt-3 font-mono text-2xl font-bold text-white">{selectedTeam.activeProjects}</p><p className="mt-1 text-[10px] text-[#686681]">Shared delivery</p></div><div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5"><p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#686681]">Team progress</p><p className="mt-3 font-mono text-2xl font-bold text-white">{selectedTeam.progress}%</p><div className="mt-2 h-1.5 rounded-full bg-white/[0.06]"><div className={`h-full rounded-full bg-gradient-to-r ${selectedTeam.color}`} style={{ width: `${selectedTeam.progress}%` }} /></div></div></section>
          <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025]"><div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4"><div><h2 className="text-sm font-semibold text-white">Team members</h2><p className="mt-1 text-xs text-[#686681]">People assigned to {selectedTeam.name}</p></div><div className="flex items-center gap-2 text-[10px] text-[#686681]"><Users className="h-3.5 w-3.5" />{selectedMembers.length} members</div></div><div className="divide-y divide-white/[0.05]">{selectedMembers.map((member) => <div key={member.name} className="flex flex-col gap-4 px-5 py-4 transition hover:bg-white/[0.025] sm:flex-row sm:items-center"><div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${member.color} text-[10px] font-bold text-white`}>{member.initials}</div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="text-sm font-semibold text-[#D9D7EA]">{member.name}</h3><span className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-medium ${STATUS_STYLES[member.status]}`}><span className="h-1.5 w-1.5 rounded-full bg-current" />{member.status}</span></div><p className="mt-1 text-[11px] text-[#686681]">{member.role}</p></div><div className="flex items-center gap-1"><Link href={`/user/message?person=${encodeURIComponent(member.name)}`} aria-label={`Message ${member.name}`} className="flex h-9 w-9 items-center justify-center rounded-lg text-violet-400 transition hover:bg-violet-400/10"><MessageCircle className="h-4 w-4" /></Link><button aria-label={`Call ${member.name}`} className="flex h-9 w-9 items-center justify-center rounded-lg text-[#686681] transition hover:bg-white/[0.06] hover:text-white"><Phone className="h-4 w-4" /></button><button aria-label={`Video call ${member.name}`} className="flex h-9 w-9 items-center justify-center rounded-lg text-[#686681] transition hover:bg-white/[0.06] hover:text-white"><Video className="h-4 w-4" /></button><button aria-label={`More options for ${member.name}`} className="flex h-9 w-9 items-center justify-center rounded-lg text-[#55536B] transition hover:bg-white/[0.06] hover:text-white"><MoreHorizontal className="h-4 w-4" /></button></div></div>)}</div></section>
          <section className="grid gap-5 lg:grid-cols-[1fr_300px]"><div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5"><div className="flex items-center justify-between"><div><h2 className="text-sm font-semibold text-white">Team admin</h2><p className="mt-1 text-xs text-[#686681]">Your point person for this team</p></div><ShieldCheck className="h-4 w-4 text-teal-400" /></div><div className="mt-5 flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-orange-300 text-[10px] font-bold text-white">{selectedMembers[0]?.initials}</div><div className="min-w-0 flex-1"><p className="text-sm font-semibold text-[#D9D7EA]">{selectedTeam.lead}</p><p className="mt-1 text-[10px] text-[#686681]">Team administrator</p></div><Link href={`/user/message?person=${encodeURIComponent(selectedTeam.lead)}`} className="flex items-center gap-1.5 rounded-lg bg-violet-500/10 px-3 py-2 text-[10px] font-medium text-violet-300 hover:bg-violet-500/20"><MessageCircle className="h-3.5 w-3.5" />Message admin</Link></div></div><div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5"><div className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-violet-400" /><h2 className="text-sm font-semibold text-white">Next team event</h2></div><p className="mt-4 text-xs font-medium text-[#D9D7EA]">Weekly team sync</p><p className="mt-1 flex items-center gap-1.5 text-[10px] text-[#686681]"><Clock3 className="h-3 w-3" />Today · 10:00 AM</p></div></section>
        </>
      ) : (
        <>
          <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-2 text-xs text-[#8B89A8]"><Users className="h-4 w-4 text-violet-400" /><span>{TEAMS.length} assigned teams</span><span className="h-1 w-1 rounded-full bg-teal-400" /><span>12 total members</span></div><div className="relative sm:w-60"><Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#686681]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search teams" className="h-10 w-full rounded-xl border border-white/[0.07] bg-white/[0.025] pl-9 pr-3 text-xs text-white outline-none placeholder:text-[#55536B] focus:border-violet-500/50" /></div></section>
          <section className="grid gap-4 md:grid-cols-2">{teams.map((team) => <button key={team.name} onClick={() => setSelectedTeam(team)} className="group overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] text-left transition hover:border-violet-500/30 hover:bg-white/[0.04]"><div className={`h-1 bg-gradient-to-r ${team.color}`} /><div className="p-5"><div className="flex items-start justify-between"><div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${team.color} text-xs font-bold text-white`}>{team.icon}</div><ArrowUpRight className="h-4 w-4 text-[#55536B] transition group-hover:text-violet-400" /></div><h2 className="mt-5 text-base font-semibold text-white">{team.name}</h2><p className="mt-2 min-h-10 text-xs leading-5 text-[#8B89A8]">{team.description}</p><div className="mt-6 flex items-center gap-4 text-[10px] text-[#686681]"><span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" />{team.members} members</span><span className="flex items-center gap-1.5"><BriefcaseBusiness className="h-3.5 w-3.5" />{team.activeProjects} projects</span></div><div className="mt-5 flex items-center justify-between text-[10px]"><span className="text-[#686681]">Team progress</span><span className="font-mono text-[#AAA7C8]">{team.progress}%</span></div><div className="mt-2 h-1.5 rounded-full bg-white/[0.06]"><div className={`h-full rounded-full bg-gradient-to-r ${team.color}`} style={{ width: `${team.progress}%` }} /></div><div className="mt-5 flex items-center gap-2 border-t border-white/[0.06] pt-4 text-[10px] text-[#686681]"><ShieldCheck className="h-3.5 w-3.5 text-teal-400" />Admin: {team.lead}</div></div></button>)}{!teams.length ? <div className="col-span-full rounded-2xl border border-dashed border-white/[0.1] px-6 py-16 text-center"><Search className="mx-auto h-6 w-6 text-[#55536B]" /><p className="mt-3 text-sm font-medium text-[#D9D7EA]">No teams found</p><p className="mt-1 text-xs text-[#686681]">Try a different search term.</p></div> : null}</section>
        </>
      )}
      <div className="flex items-center gap-2 text-[10px] text-[#55536B]"><Users className="h-3.5 w-3.5" /> Assigned teams synced with your workspace <span className="h-1 w-1 rounded-full bg-teal-400" /> Updated just now</div>
    </div>
  );
}
