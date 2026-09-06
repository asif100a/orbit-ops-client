"use client";

import { useEffect, useState } from "react";
import {
	CalendarDays,
	ChevronDown,
	Clock3,
	Coffee,
	FolderKanban,
	MoreHorizontal,
	Pause,
	Play,
	Plus,
	Search,
	TimerReset,
	TrendingUp,
} from "lucide-react";

const WEEK = [
	{ day: "Mon", hours: 7.5 },
	{ day: "Tue", hours: 8.2 },
	{ day: "Wed", hours: 6.8 },
	{ day: "Thu", hours: 8.5 },
	{ day: "Fri", hours: 5.4 },
	{ day: "Sat", hours: 0 },
	{ day: "Sun", hours: 0 },
];

const ENTRIES = [
	{ project: "Acme Website Redesign", task: "Responsive layout polish", date: "Today", time: "2h 40m", color: "bg-violet-400" },
	{ project: "OrbitOps Platform", task: "Implement authentication flow", date: "Today", time: "1h 55m", color: "bg-teal-400" },
	{ project: "Mobile Banking App", task: "Review onboarding states", date: "Yesterday", time: "3h 20m", color: "bg-sky-400" },
	{ project: "Brand Campaign", task: "Content outline review", date: "Sep 2", time: "1h 10m", color: "bg-amber-300" },
];

function formatDuration(totalSeconds: number) {
	const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, "0");
	const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, "0");
	const seconds = (totalSeconds % 60).toString().padStart(2, "0");
	return `${hours}:${minutes}:${seconds}`;
}

export default function TimeTrackingPage() {
	const [isRunning, setIsRunning] = useState(false);
	const [elapsedSeconds, setElapsedSeconds] = useState(0);

	useEffect(() => {
		if (!isRunning) return;
		const interval = window.setInterval(() => setElapsedSeconds((current) => current + 1), 1000);
		return () => window.clearInterval(interval);
	}, [isRunning]);

	return (
		<div className="space-y-7">
			<section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
				<div>
					<p className="mb-2 text-sm text-[#8B89A8]">Make time visible</p>
					<h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Time Tracking</h1>
					<p className="mt-2 text-sm text-[#8B89A8]">Capture focused work and understand where your week is going.</p>
				</div>
				<button className="flex h-10 items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 text-sm font-medium text-white shadow-[0_0_24px_rgba(108,99,255,0.2)] transition hover:bg-violet-500"><Plus className="h-4 w-4" />Manual entry</button>
			</section>

			<section className="grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)]">
				<div className={`relative overflow-hidden rounded-2xl border p-6 ${isRunning ? "border-teal-400/25 bg-teal-400/[0.045]" : "border-white/[0.07] bg-white/[0.025]"}`}>
					<div className="pointer-events-none absolute -right-14 -top-16 h-44 w-44 rounded-full bg-violet-500/[0.08] blur-3xl" />
					<div className="relative flex items-start justify-between gap-4"><div><div className="flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${isRunning ? "animate-pulse bg-teal-400" : "bg-[#55536B]"}`} /><p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8B89A8]">{isRunning ? "Timer running" : "Ready to track"}</p></div><h2 className="mt-4 text-lg font-semibold text-white">Implement authentication flow</h2><p className="mt-1 text-xs text-[#686681]">OrbitOps Platform</p></div><button aria-label="Timer options" className="rounded-lg p-2 text-[#686681] hover:bg-white/[0.05] hover:text-white"><MoreHorizontal className="h-4 w-4" /></button></div>
					<div className="relative mt-8 flex flex-col items-center justify-between gap-6 sm:flex-row"><div className="font-mono text-5xl font-bold tracking-tight text-white sm:text-6xl">{formatDuration(elapsedSeconds)}</div><div className="flex w-full gap-2 sm:w-auto"><button onClick={() => setIsRunning((current) => !current)} className={`flex h-11 flex-1 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition sm:flex-none ${isRunning ? "border border-white/[0.1] bg-white/[0.06] text-[#D9D7EA] hover:bg-white/[0.1]" : "bg-teal-500 text-[#071411] hover:bg-teal-400"}`}>{isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}{isRunning ? "Pause" : "Start timer"}</button><button onClick={() => { setIsRunning(false); setElapsedSeconds(0); }} aria-label="Reset timer" className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.025] text-[#686681] hover:bg-white/[0.07] hover:text-white"><TimerReset className="h-4 w-4" /></button></div></div>
					<div className="relative mt-8 flex items-center gap-2 border-t border-white/[0.06] pt-4 text-[10px] text-[#686681]"><Clock3 className="h-3.5 w-3.5 text-violet-400" />Timer entries are saved to your daily log when stopped</div>
				</div>

				<div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5"><div className="flex items-start justify-between"><div><h2 className="text-sm font-semibold text-white">This week</h2><p className="mt-1 text-[11px] text-[#686681]">Sep 1 – Sep 7, 2026</p></div><button aria-label="Choose week" className="rounded-lg p-2 text-[#686681] hover:bg-white/[0.05] hover:text-white"><CalendarDays className="h-4 w-4" /></button></div><div className="mt-6 flex items-end justify-between gap-2"><div><p className="font-mono text-3xl font-bold text-white">36.4h</p><p className="mt-1 flex items-center gap-1 text-[10px] text-teal-300"><TrendingUp className="h-3 w-3" /> 8% from last week</p></div><span className="text-[10px] text-[#686681]">of 40h goal</span></div><div className="mt-5 flex h-28 items-end justify-between gap-2 border-b border-white/[0.06] pb-0">{WEEK.map((entry) => <div key={entry.day} className="flex h-full flex-1 flex-col items-center justify-end gap-2"><div className="w-full max-w-7 rounded-t-md bg-gradient-to-t from-violet-600 to-teal-400 transition-opacity hover:opacity-80" style={{ height: `${Math.max(entry.hours / 8.5 * 82, entry.hours ? 8 : 2)}%`, opacity: entry.hours ? 1 : 0.2 }} /><span className="mb-[-18px] text-[9px] text-[#686681]">{entry.day}</span></div>)}</div><div className="mt-8 flex items-center justify-between text-[10px] text-[#686681]"><span>Daily average</span><span className="font-mono text-[#D9D7EA]">7.3h</span></div></div>
			</section>

			<section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_270px]">
				<div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025]"><div className="flex flex-col justify-between gap-3 border-b border-white/[0.06] px-5 py-4 sm:flex-row sm:items-center"><div><h2 className="text-sm font-semibold text-white">Recent entries</h2><p className="mt-1 text-xs text-[#686681]">Your latest tracked time</p></div><div className="flex gap-2"><div className="relative"><Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#686681]" /><input placeholder="Search entries" className="h-9 w-44 rounded-lg border border-white/[0.07] bg-white/[0.025] pl-9 pr-3 text-xs text-white outline-none placeholder:text-[#55536B] focus:border-violet-500/50" /></div><button aria-label="Filter entries" className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.07] text-[#686681] hover:bg-white/[0.05] hover:text-white"><ChevronDown className="h-4 w-4" /></button></div></div><div className="divide-y divide-white/[0.05]">{ENTRIES.map((entry) => <div key={`${entry.project}-${entry.task}`} className="group flex items-center gap-3 px-5 py-4 transition hover:bg-white/[0.025]"><span className={`h-2 w-2 shrink-0 rounded-full ${entry.color}`} /><div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold text-[#D9D7EA]">{entry.task}</p><p className="mt-1 truncate text-[10px] text-[#686681]">{entry.project}</p></div><span className="hidden text-[10px] text-[#686681] sm:block">{entry.date}</span><span className="w-12 text-right font-mono text-xs text-white">{entry.time}</span><button aria-label={`More options for ${entry.task}`} className="rounded-lg p-1.5 text-[#55536B] opacity-0 hover:bg-white/[0.05] hover:text-white group-hover:opacity-100"><MoreHorizontal className="h-4 w-4" /></button></div>)}</div><div className="border-t border-white/[0.06] px-5 py-3"><button className="text-[11px] font-medium text-violet-400 hover:text-violet-300">View all entries <span aria-hidden="true">→</span></button></div></div>

				<aside className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5"><div className="flex items-center justify-between"><div><h2 className="text-sm font-semibold text-white">Time breakdown</h2><p className="mt-1 text-[11px] text-[#686681]">By project this week</p></div><FolderKanban className="h-4 w-4 text-violet-400" /></div><div className="mt-6 space-y-5">{[["Acme Website", "14.2h", "39%", "bg-violet-400"], ["OrbitOps Platform", "11.8h", "32%", "bg-teal-400"], ["Mobile Banking", "7.4h", "20%", "bg-sky-400"], ["Brand Campaign", "3h", "9%", "bg-amber-300"]].map(([name, hours, percentage, color]) => <div key={name}><div className="flex items-center justify-between text-[10px]"><span className="text-[#AAA7C8]">{name}</span><span className="font-mono text-[#686681]">{hours}</span></div><div className="mt-2 h-1.5 rounded-full bg-white/[0.06]"><div className={`h-full rounded-full ${color}`} style={{ width: percentage }} /></div></div>)}</div><div className="mt-7 flex items-center gap-2 border-t border-white/[0.06] pt-4 text-[10px] text-[#686681]"><Coffee className="h-3.5 w-3.5 text-amber-300" /> Breaks tracked: 42 min</div></aside>
			</section>
			<div className="flex items-center gap-2 text-[10px] text-[#55536B]"><Clock3 className="h-3.5 w-3.5" /> Timesheets are up to date <span className="h-1 w-1 rounded-full bg-teal-400" /> Last synced just now</div>
		</div>
	);
}
