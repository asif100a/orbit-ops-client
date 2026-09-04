"use client";

import { useState } from "react";
import {
	Archive,
	ArrowLeft,
	Bell,
	Check,
	ChevronDown,
	Clock3,
	FileText,
	Hash,
	Inbox as InboxIcon,
	Info,
	MessageCircle,
	MoreHorizontal,
	Paperclip,
	Plus,
	Search,
	Send,
	Smile,
	Star,
	Tag,
	Users,
} from "lucide-react";

type Conversation = {
	id: number;
	name: string;
	initials: string;
	color: string;
	preview: string;
	time: string;
	unread?: number;
	channel: string;
	online?: boolean;
};

const CONVERSATIONS: Conversation[] = [
	{
		id: 1,
		name: "Acme Website Redesign",
		initials: "AW",
		color: "from-violet-500 to-indigo-400",
		preview: "Sarah: The new hero direction is ready for review.",
		time: "9:42 AM",
		unread: 3,
		channel: "Project channel",
		online: true,
	},
	{
		id: 2,
		name: "Sarah Morgan",
		initials: "SM",
		color: "from-rose-400 to-orange-300",
		preview: "Can you take a look at the latest wireframes?",
		time: "8:18 AM",
		unread: 1,
		channel: "Direct message",
		online: true,
	},
	{
		id: 3,
		name: "Design Team",
		initials: "DT",
		color: "from-teal-400 to-cyan-300",
		preview: "Michael shared 4 files in the project folder.",
		time: "Yesterday",
		channel: "Team channel",
	},
	{
		id: 4,
		name: "OrbitOps Platform",
		initials: "OP",
		color: "from-amber-400 to-red-400",
		preview: "John: The staging deployment is looking good.",
		time: "Yesterday",
		channel: "Project channel",
	},
	{
		id: 5,
		name: "John Davis",
		initials: "JD",
		color: "from-sky-400 to-blue-500",
		preview: "Thanks, I will update the API documentation.",
		time: "Sep 2",
		channel: "Direct message",
		online: true,
	},
];

const MESSAGES = [
	{
		name: "Sarah Morgan",
		initials: "SM",
		color: "from-rose-400 to-orange-300",
		time: "9:18 AM",
		text: "Morning Asif. The new hero direction is ready for review. I pushed the latest exploration to the project files.",
	},
	{
		name: "You",
		initials: "AS",
		color: "from-violet-500 to-teal-400",
		time: "9:27 AM",
		text: "This is looking strong. The clearer headline gives the page much more breathing room. I am checking the responsive states now.",
		own: true,
	},
	{
		name: "Sarah Morgan",
		initials: "SM",
		color: "from-rose-400 to-orange-300",
		time: "9:42 AM",
		text: "Perfect. I also added the mobile navigation notes. Let me know if anything feels off when you test it on the smaller breakpoint.",
	},
];

function Avatar({ conversation, small = false }: { conversation: Pick<Conversation, "initials" | "color" | "online">; small?: boolean }) {
	return (
		<div className={`relative flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${conversation.color} font-bold text-white ${small ? "h-8 w-8 text-[9px]" : "h-10 w-10 text-[10px]"}`}>
			{conversation.initials}
			{conversation.online ? <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#12121e] bg-teal-400" /> : null}
		</div>
	);
}

export default function InboxPage() {
	const [selectedId, setSelectedId] = useState(1);
	const [activeTab, setActiveTab] = useState("All inbox");
	const [query, setQuery] = useState("");
	const selected = CONVERSATIONS.find((conversation) => conversation.id === selectedId) ?? CONVERSATIONS[0];
	const filteredConversations = CONVERSATIONS.filter((conversation) =>
		conversation.name.toLowerCase().includes(query.toLowerCase()),
	);

	return (
		<div className="space-y-6">
			<section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
				<div>
					<p className="mb-2 text-sm text-[#8B89A8]">Workspace communication</p>
					<h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Inbox</h1>
					<p className="mt-2 text-sm text-[#8B89A8]">Keep up with the conversations moving your work forward.</p>
				</div>
				<button className="flex h-10 items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 text-sm font-medium text-white shadow-[0_0_24px_rgba(108,99,255,0.2)] transition hover:bg-violet-500">
					<Plus className="h-4 w-4" />
					New message
				</button>
			</section>

			<section className="grid min-h-[650px] overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d0d18]/90 lg:grid-cols-[290px_minmax(0,1fr)_220px]">
				<aside className="border-b border-white/[0.06] lg:border-b-0 lg:border-r">
					<div className="border-b border-white/[0.06] p-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<InboxIcon className="h-4 w-4 text-violet-400" />
								<h2 className="text-sm font-semibold text-white">Messages</h2>
							</div>
							<button aria-label="Message options" className="rounded-lg p-1.5 text-[#686681] hover:bg-white/[0.05] hover:text-white"><MoreHorizontal className="h-4 w-4" /></button>
						</div>
						<div className="relative mt-4">
							<Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#686681]" />
							<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search messages" className="h-9 w-full rounded-lg border border-white/[0.07] bg-white/[0.035] pl-9 pr-3 text-xs text-white outline-none placeholder:text-[#55536B] focus:border-violet-500/50" />
						</div>
						<div className="mt-4 flex gap-1 rounded-lg bg-white/[0.025] p-1">
							{["All inbox", "Unread"].map((tab) => <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 rounded-md px-2 py-1.5 text-[10px] font-medium transition ${activeTab === tab ? "bg-violet-500/15 text-violet-300" : "text-[#686681] hover:text-white"}`}>{tab}</button>)}
						</div>
					</div>
					<div className="max-h-[480px] overflow-y-auto p-2">
						<p className="px-3 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5F5D78]">Recent</p>
						{filteredConversations.filter((conversation) => activeTab === "All inbox" || conversation.unread).map((conversation) => (
							<button key={conversation.id} onClick={() => setSelectedId(conversation.id)} className={`group flex w-full items-start gap-3 rounded-xl p-3 text-left transition ${selectedId === conversation.id ? "bg-violet-500/10 shadow-[inset_2px_0_0_#6C63FF]" : "hover:bg-white/[0.035]"}`}>
								<Avatar conversation={conversation} small />
								<span className="min-w-0 flex-1">
									<span className="flex items-center justify-between gap-2"><span className={`truncate text-xs font-semibold ${selectedId === conversation.id ? "text-white" : "text-[#D9D7EA]"}`}>{conversation.name}</span><span className="shrink-0 text-[9px] text-[#55536B]">{conversation.time}</span></span>
									<span className="mt-1 block truncate text-[11px] text-[#686681]">{conversation.preview}</span>
								</span>
								{conversation.unread ? <span className="mt-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-violet-500 px-1 text-[9px] font-bold text-white">{conversation.unread}</span> : null}
							</button>
						))}
					</div>
				</aside>

				<main className="flex min-w-0 flex-col">
					<header className="flex min-h-[73px] items-center justify-between gap-3 border-b border-white/[0.06] px-4 sm:px-5">
						<div className="flex min-w-0 items-center gap-3"><button aria-label="Back to conversations" className="rounded-lg p-1.5 text-[#686681] hover:bg-white/[0.05] hover:text-white lg:hidden"><ArrowLeft className="h-4 w-4" /></button><Avatar conversation={selected} /><div className="min-w-0"><h2 className="truncate text-sm font-semibold text-white">{selected.name}</h2><p className="mt-0.5 flex items-center gap-1.5 text-[10px] text-[#686681]"><span className="h-1.5 w-1.5 rounded-full bg-teal-400" />{selected.channel}</p></div></div>
						<div className="flex shrink-0 items-center gap-1"><button aria-label="Start video call" className="hidden rounded-lg p-2 text-[#686681] hover:bg-white/[0.05] hover:text-white sm:block"><MessageCircle className="h-4 w-4" /></button><button aria-label="Conversation notifications" className="rounded-lg p-2 text-[#686681] hover:bg-white/[0.05] hover:text-white"><Bell className="h-4 w-4" /></button><button aria-label="Conversation info" className="rounded-lg p-2 text-[#686681] hover:bg-white/[0.05] hover:text-white"><Info className="h-4 w-4" /></button></div>
					</header>

					<div className="flex-1 space-y-6 overflow-y-auto px-4 py-5 sm:px-6">
						<div className="flex items-center gap-3"><div className="h-px flex-1 bg-white/[0.06]" /><span className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#55536B]">Today</span><div className="h-px flex-1 bg-white/[0.06]" /></div>
						{MESSAGES.map((message) => <article key={`${message.name}-${message.time}`} className={`flex gap-3 ${message.own ? "flex-row-reverse" : ""}`}><div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${message.color} text-[9px] font-bold text-white`}>{message.initials}</div><div className={`max-w-[78%] ${message.own ? "items-end text-right" : ""}`}><div className={`mb-1 flex items-baseline gap-2 ${message.own ? "flex-row-reverse" : ""}`}><span className="text-xs font-semibold text-[#D9D7EA]">{message.name}</span><span className="text-[10px] text-[#55536B]">{message.time}</span></div><div className={`rounded-2xl px-4 py-3 text-xs leading-5 ${message.own ? "rounded-tr-sm bg-violet-500/15 text-[#D9D7EA]" : "rounded-tl-sm border border-white/[0.06] bg-white/[0.035] text-[#AAA7C8]"}`}>{message.text}</div></div></article>)}
						<div className="flex items-center gap-2 pl-11 text-[10px] text-[#55536B]"><Check className="h-3 w-3 text-teal-400" /> Read by Sarah at 9:43 AM</div>
					</div>

					<div className="border-t border-white/[0.06] p-4 sm:p-5"><div className="rounded-xl border border-white/[0.08] bg-white/[0.025] focus-within:border-violet-500/40"><textarea rows={2} placeholder={`Message ${selected.name}`} className="w-full resize-none bg-transparent px-4 pt-3 text-xs leading-5 text-white outline-none placeholder:text-[#55536B]" /><div className="flex items-center justify-between px-3 pb-2"><div className="flex items-center gap-1"><button aria-label="Attach file" className="rounded-lg p-1.5 text-[#686681] hover:bg-white/[0.05] hover:text-white"><Paperclip className="h-4 w-4" /></button><button aria-label="Add reaction" className="rounded-lg p-1.5 text-[#686681] hover:bg-white/[0.05] hover:text-white"><Smile className="h-4 w-4" /></button></div><button aria-label="Send message" className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-white transition hover:bg-violet-500"><Send className="h-3.5 w-3.5" /></button></div></div></div>
				</main>

				<aside className="hidden border-l border-white/[0.06] p-5 lg:block"><div className="flex items-center justify-between"><h2 className="text-xs font-semibold text-white">Details</h2><button aria-label="Close details" className="rounded-lg p-1.5 text-[#686681] hover:bg-white/[0.05] hover:text-white"><ChevronDown className="h-4 w-4" /></button></div><div className="mt-6 flex flex-col items-center text-center"><Avatar conversation={selected} /><h3 className="mt-3 text-sm font-semibold text-white">{selected.name}</h3><p className="mt-1 text-[10px] text-[#686681]">{selected.channel}</p></div><div className="mt-7 space-y-2"><button className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-xs text-[#AAA7C8] hover:bg-white/[0.035] hover:text-white"><Star className="h-3.5 w-3.5 text-amber-300" /> Add to saved</button><button className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-xs text-[#AAA7C8] hover:bg-white/[0.035] hover:text-white"><Bell className="h-3.5 w-3.5" /> Notifications</button><button className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-xs text-[#AAA7C8] hover:bg-white/[0.035] hover:text-white"><Archive className="h-3.5 w-3.5" /> Archive conversation</button></div><div className="mt-7 border-t border-white/[0.06] pt-5"><p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#5F5D78]">Shared files</p><div className="flex items-center gap-2 rounded-lg bg-white/[0.025] p-2"><FileText className="h-4 w-4 text-violet-400" /><div className="min-w-0"><p className="truncate text-[10px] font-medium text-[#D9D7EA]">hero-exploration.fig</p><p className="text-[9px] text-[#686681]">Updated today</p></div></div></div><div className="mt-7 flex flex-wrap gap-2"><span className="flex items-center gap-1 rounded-md bg-violet-500/10 px-2 py-1 text-[9px] text-violet-300"><Hash className="h-3 w-3" /> design</span><span className="flex items-center gap-1 rounded-md bg-teal-400/10 px-2 py-1 text-[9px] text-teal-300"><Tag className="h-3 w-3" /> priority</span></div></aside>
			</section>
			<div className="flex items-center gap-2 text-[10px] text-[#55536B]"><Clock3 className="h-3.5 w-3.5" /> Your inbox is synced with the OrbitOps workspace <span className="h-1 w-1 rounded-full bg-teal-400" /><Users className="h-3.5 w-3.5" /> 12 teammates online</div>
		</div>
	);
}
