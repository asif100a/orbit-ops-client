"use client";

import { useState } from "react";
import {
	CalendarDays,
	Check,
	CheckCircle2,
	Circle,
	Clock3,
	Flag,
	ListFilter,
	MoreHorizontal,
	Plus,
	Search,
	SlidersHorizontal,
	Target,
} from "lucide-react";

type Task = {
	id: number;
	title: string;
	project: string;
	priority: "High" | "Medium" | "Low";
	due: string;
	group: "Today" | "Tomorrow" | "This week";
	completed: boolean;
	estimate: string;
	assignee: string;
};

const INITIAL_TASKS: Task[] = [
	{ id: 1, title: "Implement authentication flow", project: "OrbitOps Platform", priority: "High", due: "Today, 4:00 PM", group: "Today", completed: false, estimate: "4h", assignee: "AS" },
	{ id: 2, title: "Review landing page designs", project: "Acme Website Redesign", priority: "Medium", due: "Today, 6:00 PM", group: "Today", completed: false, estimate: "1h", assignee: "AS" },
	{ id: 3, title: "Update API documentation", project: "OrbitOps Platform", priority: "Low", due: "Tomorrow", group: "Tomorrow", completed: false, estimate: "2h", assignee: "AS" },
	{ id: 4, title: "Prepare mobile onboarding notes", project: "Mobile Banking App", priority: "Medium", due: "Sep 7", group: "This week", completed: false, estimate: "2h", assignee: "AS" },
	{ id: 5, title: "Deploy staging environment", project: "Mobile Banking App", priority: "High", due: "Sep 6", group: "This week", completed: true, estimate: "3h", assignee: "AS" },
	{ id: 6, title: "Share campaign content outline", project: "Brand Campaign", priority: "Low", due: "Sep 8", group: "This week", completed: false, estimate: "45m", assignee: "AS" },
];

const PRIORITY_STYLES = {
	High: "border-red-400/15 bg-red-400/10 text-red-300",
	Medium: "border-amber-400/15 bg-amber-400/10 text-amber-300",
	Low: "border-teal-400/15 bg-teal-400/10 text-teal-300",
};

export default function MyTasksPage() {
	const [tasks, setTasks] = useState(INITIAL_TASKS);
	const [view, setView] = useState("All tasks");
	const [query, setQuery] = useState("");
	const pendingCount = tasks.filter((task) => !task.completed).length;
	const filteredTasks = tasks.filter((task) => {
		const matchesView = view === "All tasks" || (view === "Open" && !task.completed) || (view === "Completed" && task.completed);
		const matchesSearch = `${task.title} ${task.project}`.toLowerCase().includes(query.toLowerCase());
		return matchesView && matchesSearch;
	});
	const toggleTask = (id: number) => setTasks((current) => current.map((task) => task.id === id ? { ...task, completed: !task.completed } : task));

	return (
		<div className="space-y-7">
			<section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
				<div>
					<p className="mb-2 text-sm text-[#8B89A8]">Your personal work queue</p>
					<h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">My Tasks</h1>
					<p className="mt-2 text-sm text-[#8B89A8]">Stay close to the next actions that keep your projects moving.</p>
				</div>
				<button className="flex h-10 items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 text-sm font-medium text-white shadow-[0_0_24px_rgba(108,99,255,0.2)] transition hover:bg-violet-500"><Plus className="h-4 w-4" />Add task</button>
			</section>

			<section className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
				{[
					["Open tasks", String(pendingCount), "Across 4 projects", Target],
					["Due today", "2", "Both need attention", Clock3],
					["Completed", String(tasks.filter((task) => task.completed).length), "This week", CheckCircle2],
					["Focus time", "12h", "Estimated remaining", CalendarDays],
				].map(([label, value, caption, Icon]) => { const StatIcon = Icon as typeof Target; return <div key={label as string} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 sm:p-5"><div className="flex items-center justify-between"><p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#686681]">{label as string}</p><StatIcon className="h-4 w-4 text-violet-400" /></div><p className="mt-3 font-mono text-2xl font-bold text-white">{value as string}</p><p className="mt-1 text-[10px] text-[#686681]">{caption as string}</p></div>; })}
			</section>

			<section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<div className="flex items-center gap-1 overflow-x-auto rounded-xl border border-white/[0.06] bg-white/[0.02] p-1">
					{["All tasks", "Open", "Completed"].map((item) => <button key={item} onClick={() => setView(item)} className={`shrink-0 rounded-lg px-4 py-2 text-xs font-medium transition ${view === item ? "bg-violet-500/15 text-violet-300" : "text-[#686681] hover:text-white"}`}>{item}</button>)}
				</div>
				<div className="flex gap-2"><div className="relative flex-1 sm:w-56 sm:flex-none"><Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#686681]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search tasks" className="h-10 w-full rounded-xl border border-white/[0.07] bg-white/[0.025] pl-9 pr-3 text-xs text-white outline-none placeholder:text-[#55536B] focus:border-violet-500/50" /></div><button aria-label="Filter and sort tasks" className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-[#686681] hover:bg-white/[0.05] hover:text-white"><SlidersHorizontal className="h-4 w-4" /></button></div>
			</section>

			<div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_270px]">
				<section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025]">
					<div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4"><div><h2 className="text-sm font-semibold text-white">Task queue</h2><p className="mt-1 text-xs text-[#686681]">{filteredTasks.length} tasks in your current view</p></div><button className="flex items-center gap-1.5 text-xs font-medium text-violet-400 hover:text-violet-300"><ListFilter className="h-3.5 w-3.5" />Sort</button></div>
					{["Today", "Tomorrow", "This week"].map((group) => { const groupTasks = filteredTasks.filter((task) => task.group === group); if (!groupTasks.length) return null; return <div key={group}><div className="flex items-center gap-3 border-b border-white/[0.05] bg-white/[0.015] px-5 py-3"><span className={`h-1.5 w-1.5 rounded-full ${group === "Today" ? "bg-red-400" : group === "Tomorrow" ? "bg-amber-300" : "bg-violet-400"}`} /><h3 className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8B89A8]">{group}</h3><span className="text-[10px] text-[#55536B]">{groupTasks.length}</span></div>{groupTasks.map((task) => <div key={task.id} className="group flex items-center gap-3 border-b border-white/[0.05] px-5 py-4 transition last:border-0 hover:bg-white/[0.025]"><button onClick={() => toggleTask(task.id)} className="shrink-0 text-[#55536B] transition hover:text-violet-400" aria-label={task.completed ? `Reopen ${task.title}` : `Complete ${task.title}`}>{task.completed ? <CheckCircle2 className="h-5 w-5 text-teal-400" /> : <Circle className="h-5 w-5" />}</button><div className="min-w-0 flex-1"><p className={`text-sm font-medium ${task.completed ? "text-[#55536B] line-through" : "text-[#D9D7EA]"}`}>{task.title}</p><div className="mt-1 flex flex-wrap items-center gap-2 text-[10px] text-[#686681]"><span className="truncate">{task.project}</span><span className="h-1 w-1 rounded-full bg-[#444257]" /><span className="flex items-center gap-1"><CalendarDays className="h-3 w-3" />{task.due}</span></div></div><span className={`hidden rounded-md border px-2 py-1 text-[10px] font-medium sm:block ${PRIORITY_STYLES[task.priority]}`}><Flag className="mr-1 inline h-3 w-3" />{task.priority}</span><span className="hidden w-8 text-right font-mono text-[10px] text-[#686681] md:block">{task.estimate}</span><button aria-label={`More options for ${task.title}`} className="rounded-lg p-1.5 text-[#55536B] opacity-0 transition hover:bg-white/[0.05] hover:text-white group-hover:opacity-100"><MoreHorizontal className="h-4 w-4" /></button></div>)}</div>; })}
					{!filteredTasks.length ? <div className="px-6 py-16 text-center"><Search className="mx-auto h-6 w-6 text-[#55536B]" /><p className="mt-3 text-sm font-medium text-[#D9D7EA]">No tasks found</p><p className="mt-1 text-xs text-[#686681]">Try changing your view or search term.</p></div> : null}
				</section>

				<aside className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5"><div className="flex items-center justify-between"><div><h2 className="text-sm font-semibold text-white">Focus today</h2><p className="mt-1 text-[11px] text-[#686681]">A small plan for momentum</p></div><Target className="h-4 w-4 text-teal-400" /></div><div className="mt-6 rounded-xl border border-violet-400/15 bg-violet-400/[0.06] p-4"><p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-violet-300">Priority focus</p><p className="mt-2 text-sm font-semibold text-white">Authentication flow</p><p className="mt-1 text-[11px] leading-5 text-[#8B89A8]">Finish the core flow before the staging review this afternoon.</p><div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.08]"><div className="h-full w-[68%] rounded-full bg-violet-400" /></div><p className="mt-2 text-[10px] text-[#686681]">68% of estimated work complete</p></div><div className="mt-6 space-y-4"><div className="flex items-center justify-between text-xs"><span className="text-[#8B89A8]">High priority</span><span className="font-mono text-white">2 tasks</span></div><div className="flex items-center justify-between text-xs"><span className="text-[#8B89A8]">Estimated today</span><span className="font-mono text-white">5h</span></div><div className="flex items-center justify-between text-xs"><span className="text-[#8B89A8]">Completed this week</span><span className="font-mono text-teal-300">8 tasks</span></div></div><button className="mt-7 flex items-center gap-2 text-[11px] font-medium text-violet-400 hover:text-violet-300"><Check className="h-3.5 w-3.5" /> Review completed work</button></aside>
			</div>
			<div className="flex items-center gap-2 text-[10px] text-[#55536B]"><Target className="h-3.5 w-3.5" /> Your task list is up to date <span className="h-1 w-1 rounded-full bg-teal-400" /> Last synced just now</div>
		</div>
	);
}
