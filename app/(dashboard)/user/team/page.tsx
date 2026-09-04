"use client";

import { useState } from "react";
import {
	ArrowUpRight,
	BriefcaseBusiness,
	CalendarDays,
	Check,
	ChevronRight,
	Clock3,
	Mail,
	MessageCircle,
	MoreHorizontal,
	Search,
	UserPlus,
	Users,
} from "lucide-react";

type Member = {
	name: string;
	initials: string;
	role: string;
	team: string;
	status: "Available" | "In a meeting" | "Focus time" | "Away";
	projects: string;
	capacity: number;
	color: string;
	next: string;
};

const MEMBERS: Member[] = [
	{ name: "Asif Sheikh", initials: "AS", role: "Product Designer", team: "Product", status: "Available", projects: "4 projects", capacity: 72, color: "from-violet-500 to-teal-400", next: "Available until 2:00 PM" },
	{ name: "Sarah Morgan", initials: "SM", role: "Senior Designer", team: "Product", status: "In a meeting", projects: "3 projects", capacity: 88, color: "from-rose-400 to-orange-300", next: "Free at 11:30 AM" },
	{ name: "John Davis", initials: "JD", role: "Backend Engineer", team: "Engineering", status: "Available", projects: "3 projects", capacity: 64, color: "from-sky-400 to-blue-500", next: "Available until 4:00 PM" },
	{ name: "Michael Kim", initials: "MK", role: "Frontend Engineer", team: "Engineering", status: "Focus time", projects: "2 projects", capacity: 76, color: "from-amber-400 to-red-400", next: "Focus time until 1:00 PM" },
	{ name: "Rachel Lee", initials: "RL", role: "Content Strategist", team: "Marketing", status: "Available", projects: "2 projects", capacity: 48, color: "from-teal-400 to-cyan-300", next: "Available all afternoon" },
	{ name: "David Chen", initials: "DC", role: "Project Manager", team: "Operations", status: "Away", projects: "5 projects", capacity: 92, color: "from-fuchsia-400 to-violet-500", next: "Back at 12:30 PM" },
];

const STATUS_STYLES = {
	Available: "bg-teal-400/10 text-teal-300",
	"In a meeting": "bg-amber-400/10 text-amber-300",
	"Focus time": "bg-violet-400/10 text-violet-300",
	Away: "bg-white/[0.06] text-[#8B89A8]",
};

export default function TeamPage() {
	const [filter, setFilter] = useState("Everyone");
	const [query, setQuery] = useState("");
	const visibleMembers = MEMBERS.filter((member) => {
		const matchesFilter = filter === "Everyone" || member.status === filter;
		return matchesFilter && `${member.name} ${member.role} ${member.team}`.toLowerCase().includes(query.toLowerCase());
	});
	const availableCount = MEMBERS.filter((member) => member.status === "Available").length;

	return (
		<div className="space-y-7">
			<section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
				<div>
					<p className="mb-2 text-sm text-[#8B89A8]">12 people across your workspace</p>
					<h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Team</h1>
					<p className="mt-2 text-sm text-[#8B89A8]">Find the right person, see who is available, and keep work moving together.</p>
				</div>
				<button className="flex h-10 items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 text-sm font-medium text-white shadow-[0_0_24px_rgba(108,99,255,0.2)] transition hover:bg-violet-500"><UserPlus className="h-4 w-4" />Invite member</button>
			</section>

			<section className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
				{[["Team members", "12", "Across 4 teams", Users], ["Available now", String(availableCount), "Ready to collaborate", Check], ["Active projects", "8", "With team coverage", BriefcaseBusiness], ["Avg. capacity", "73%", "Healthy workload", Clock3]].map(([label, value, caption, Icon]) => { const StatIcon = Icon as typeof Users; return <div key={label as string} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 sm:p-5"><div className="flex items-center justify-between"><p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#686681]">{label as string}</p><StatIcon className="h-4 w-4 text-violet-400" /></div><p className="mt-3 font-mono text-2xl font-bold text-white">{value as string}</p><p className="mt-1 text-[10px] text-[#686681]">{caption as string}</p></div>; })}
			</section>

			<section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-1 overflow-x-auto rounded-xl border border-white/[0.06] bg-white/[0.02] p-1">{["Everyone", "Available", "In a meeting", "Focus time"].map((item) => <button key={item} onClick={() => setFilter(item)} className={`shrink-0 rounded-lg px-3 py-2 text-xs font-medium transition ${filter === item ? "bg-violet-500/15 text-violet-300" : "text-[#686681] hover:text-white"}`}>{item}</button>)}</div><div className="relative sm:w-60"><Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#686681]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search people" className="h-10 w-full rounded-xl border border-white/[0.07] bg-white/[0.025] pl-9 pr-3 text-xs text-white outline-none placeholder:text-[#55536B] focus:border-violet-500/50" /></div></section>

			<div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_280px]"><section className="grid gap-4 md:grid-cols-2">{visibleMembers.map((member) => <article key={member.name} className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition hover:border-violet-500/25 hover:bg-white/[0.04]"><div className="flex items-start justify-between"><div className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${member.color} text-xs font-bold text-white`}>{member.initials}</div><div className="flex items-center gap-1"><button aria-label={`Message ${member.name}`} className="rounded-lg p-1.5 text-[#55536B] hover:bg-white/[0.05] hover:text-white"><MessageCircle className="h-4 w-4" /></button><button aria-label={`More options for ${member.name}`} className="rounded-lg p-1.5 text-[#55536B] hover:bg-white/[0.05] hover:text-white"><MoreHorizontal className="h-4 w-4" /></button></div></div><div className="mt-4"><div className="flex flex-wrap items-center gap-2"><h2 className="text-sm font-semibold text-white">{member.name}</h2><span className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-medium ${STATUS_STYLES[member.status]}`}><span className="h-1.5 w-1.5 rounded-full bg-current" />{member.status}</span></div><p className="mt-1 text-xs text-[#8B89A8]">{member.role}</p><p className="mt-1 text-[10px] text-[#686681]">{member.team} · {member.projects}</p></div><div className="mt-5 flex items-center justify-between text-[10px]"><span className="text-[#686681]">Workload</span><span className="font-mono text-[#AAA7C8]">{member.capacity}%</span></div><div className="mt-2 h-1.5 rounded-full bg-white/[0.06]"><div className={`h-full rounded-full ${member.capacity > 85 ? "bg-amber-300" : "bg-gradient-to-r from-violet-500 to-teal-400"}`} style={{ width: `${member.capacity}%` }} /></div><div className="mt-4 flex items-center gap-2 text-[10px] text-[#686681]"><Clock3 className="h-3.5 w-3.5" />{member.next}</div><div className="mt-4 flex gap-2 border-t border-white/[0.06] pt-3"><button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-white/[0.035] py-2 text-[10px] font-medium text-[#AAA7C8] hover:bg-white/[0.07] hover:text-white"><Mail className="h-3 w-3" />Contact</button><button aria-label={`Open ${member.name}'s profile`} className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.035] text-[#686681] hover:bg-white/[0.07] hover:text-white"><ChevronRight className="h-4 w-4" /></button></div></article>)}{!visibleMembers.length ? <div className="col-span-full rounded-2xl border border-dashed border-white/[0.1] px-6 py-16 text-center"><Search className="mx-auto h-6 w-6 text-[#55536B]" /><p className="mt-3 text-sm font-medium text-[#D9D7EA]">No teammates found</p><p className="mt-1 text-xs text-[#686681]">Try a different name or availability filter.</p></div> : null}</section>

			<aside className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5"><div className="flex items-center justify-between"><div><h2 className="text-sm font-semibold text-white">Team pulse</h2><p className="mt-1 text-[11px] text-[#686681]">What needs attention</p></div><Users className="h-4 w-4 text-violet-400" /></div><div className="mt-6 rounded-xl border border-teal-400/15 bg-teal-400/[0.05] p-4"><p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-teal-300">Online now</p><p className="mt-2 font-mono text-3xl font-bold text-white">{availableCount}<span className="ml-1 text-sm font-normal text-[#686681]">people</span></p><p className="mt-1 text-[10px] text-[#8B89A8]">Ready for a quick conversation</p></div><div className="mt-6 space-y-4"><div className="flex items-center justify-between"><span className="text-xs text-[#8B89A8]">Product</span><span className="text-[10px] text-[#686681]">4 members</span></div><div className="flex items-center justify-between"><span className="text-xs text-[#8B89A8]">Engineering</span><span className="text-[10px] text-[#686681]">3 members</span></div><div className="flex items-center justify-between"><span className="text-xs text-[#8B89A8]">Marketing</span><span className="text-[10px] text-[#686681]">3 members</span></div></div><div className="mt-6 border-t border-white/[0.06] pt-5"><p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#5F5D78]">Next team event</p><div className="mt-3 flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-400/10 text-violet-300"><CalendarDays className="h-4 w-4" /></div><div><p className="text-xs font-medium text-[#D9D7EA]">Weekly design sync</p><p className="mt-0.5 text-[10px] text-[#686681]">Today · 10:00 AM</p></div></div></div><button className="mt-6 flex items-center gap-1 text-[11px] font-medium text-violet-400 hover:text-violet-300">Open team calendar <ArrowUpRight className="h-3 w-3" /></button></aside></div>
			<div className="flex items-center gap-2 text-[10px] text-[#55536B]"><Users className="h-3.5 w-3.5" /> Directory synced with your workspace <span className="h-1 w-1 rounded-full bg-teal-400" /> Updated just now</div>
		</div>
	);
}
