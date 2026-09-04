"use client";

import { useState } from "react";
import {
	Bell,
	ChevronDown,
	FileText,
	Hash,
	Info,
	MessageCircle,
	MoreHorizontal,
	Paperclip,
	Plus,
	Pin,
	Search,
	Send,
	Smile,
	Users,
} from "lucide-react";

const CHANNELS = [
	{ name: "general", description: "Company-wide updates", unread: 2 },
	{ name: "design-team", description: "Design critiques and ideas", unread: 5 },
	{ name: "engineering", description: "Build, ship, repeat", unread: 0 },
	{ name: "acme-website", description: "Acme project room", unread: 3 },
];

const DIRECT_MESSAGES = [
	{ name: "Sarah Morgan", initials: "SM", color: "from-rose-400 to-orange-300", preview: "The hero direction is ready", online: true },
	{ name: "John Davis", initials: "JD", color: "from-sky-400 to-blue-500", preview: "Staging is looking good", online: true },
	{ name: "Michael Kim", initials: "MK", color: "from-amber-400 to-red-400", preview: "I shared the latest files", online: false },
];

const INITIAL_MESSAGES = [
	{ name: "Sarah Morgan", initials: "SM", color: "from-rose-400 to-orange-300", time: "9:18 AM", text: "Morning everyone. I have added the latest responsive explorations to the project files. The new navigation direction feels much calmer.", own: false },
	{ name: "Michael Kim", initials: "MK", color: "from-amber-400 to-red-400", time: "9:26 AM", text: "Nice. I am checking the component states against the updated spacing tokens now.", own: false },
	{ name: "You", initials: "AS", color: "from-violet-500 to-teal-400", time: "9:34 AM", text: "The mobile layout is shaping up well. I will finish the authentication handoff and add notes for the review this afternoon.", own: true },
	{ name: "Sarah Morgan", initials: "SM", color: "from-rose-400 to-orange-300", time: "9:42 AM", text: "Perfect. Let us use this thread for final feedback before the client review.", own: false },
];

export default function MessagesPage() {
	const [selectedChannel, setSelectedChannel] = useState("design-team");
	const [query, setQuery] = useState("");
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState(INITIAL_MESSAGES);
	const filteredChannels = CHANNELS.filter((channel) => channel.name.includes(query.toLowerCase()));
	const sendMessage = () => {
		if (!message.trim()) return;
		setMessages((current) => [...current, { name: "You", initials: "AS", color: "from-violet-500 to-teal-400", time: "Now", text: message.trim(), own: true }]);
		setMessage("");
	};

	return (
		<div className="space-y-6">
			<section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="mb-2 text-sm text-[#8B89A8]">Your team conversations</p><h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Messages</h1><p className="mt-2 text-sm text-[#8B89A8]">Channels for the work, ideas, and decisions behind every project.</p></div><button className="flex h-10 items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 text-sm font-medium text-white shadow-[0_0_24px_rgba(108,99,255,0.2)] transition hover:bg-violet-500"><Plus className="h-4 w-4" />Create channel</button></section>

			<section className="grid min-h-[650px] overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d0d18]/90 lg:grid-cols-[245px_minmax(0,1fr)_230px]">
				<aside className="border-b border-white/[0.06] lg:border-b-0 lg:border-r"><div className="border-b border-white/[0.06] p-4"><div className="flex items-center justify-between"><div className="flex items-center gap-2"><MessageCircle className="h-4 w-4 text-violet-400" /><h2 className="text-sm font-semibold text-white">Channels</h2></div><button aria-label="Add channel" className="rounded-lg p-1.5 text-[#686681] hover:bg-white/[0.05] hover:text-white"><Plus className="h-4 w-4" /></button></div><div className="relative mt-4"><Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#686681]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a channel" className="h-9 w-full rounded-lg border border-white/[0.07] bg-white/[0.035] pl-9 pr-3 text-xs text-white outline-none placeholder:text-[#55536B] focus:border-violet-500/50" /></div></div><div className="p-3"><div className="mb-2 flex items-center justify-between px-2"><p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5F5D78]">Workspace</p><ChevronDown className="h-3.5 w-3.5 text-[#55536B]" /></div>{filteredChannels.map((channel) => <button key={channel.name} onClick={() => setSelectedChannel(channel.name)} className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2.5 text-left transition ${selectedChannel === channel.name ? "bg-violet-500/10 text-white shadow-[inset_2px_0_0_#6C63FF]" : "text-[#8B89A8] hover:bg-white/[0.035] hover:text-white"}`}><Hash className="h-4 w-4 text-[#686681]" /><span className="min-w-0 flex-1 truncate text-xs">{channel.name}</span>{channel.unread ? <span className="rounded-full bg-violet-500/15 px-1.5 py-0.5 text-[9px] font-bold text-violet-300">{channel.unread}</span> : null}</button>)}<div className="mb-2 mt-7 flex items-center justify-between px-2"><p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5F5D78]">Direct messages</p><Plus className="h-3.5 w-3.5 text-[#55536B]" /></div>{DIRECT_MESSAGES.map((person) => <button key={person.name} className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2.5 text-left text-[#8B89A8] transition hover:bg-white/[0.035] hover:text-white"><span className={`relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${person.color} text-[8px] font-bold text-white`}>{person.initials}{person.online ? <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full border border-[#12121e] bg-teal-400" /> : null}</span><span className="min-w-0"><span className="block truncate text-xs">{person.name}</span><span className="mt-0.5 block truncate text-[9px] text-[#55536B]">{person.preview}</span></span></button>)}</div></aside>

				<main className="flex min-w-0 flex-col"><header className="flex min-h-[73px] items-center justify-between border-b border-white/[0.06] px-4 sm:px-5"><div className="flex min-w-0 items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10"><Hash className="h-4 w-4 text-violet-400" /></div><div className="min-w-0"><h2 className="truncate text-sm font-semibold text-white">{selectedChannel}</h2><p className="mt-0.5 truncate text-[10px] text-[#686681]">{CHANNELS.find((channel) => channel.name === selectedChannel)?.description}</p></div></div><div className="flex items-center gap-1"><button aria-label="Channel members" className="rounded-lg p-2 text-[#686681] hover:bg-white/[0.05] hover:text-white"><Users className="h-4 w-4" /></button><button aria-label="Channel notifications" className="rounded-lg p-2 text-[#686681] hover:bg-white/[0.05] hover:text-white"><Bell className="h-4 w-4" /></button><button aria-label="Channel information" className="rounded-lg p-2 text-[#686681] hover:bg-white/[0.05] hover:text-white"><Info className="h-4 w-4" /></button></div></header><div className="flex-1 space-y-6 overflow-y-auto px-4 py-5 sm:px-6"><div className="flex items-center gap-3"><div className="h-px flex-1 bg-white/[0.06]" /><span className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#55536B]">Today</span><div className="h-px flex-1 bg-white/[0.06]" /></div>{messages.map((item, index) => <article key={`${item.name}-${item.time}-${index}`} className={`flex gap-3 ${item.own ? "flex-row-reverse" : ""}`}><div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${item.color} text-[9px] font-bold text-white`}>{item.initials}</div><div className={`max-w-[78%] ${item.own ? "text-right" : ""}`}><div className={`mb-1 flex items-baseline gap-2 ${item.own ? "flex-row-reverse" : ""}`}><span className="text-xs font-semibold text-[#D9D7EA]">{item.name}</span><span className="text-[10px] text-[#55536B]">{item.time}</span></div><div className={`rounded-2xl px-4 py-3 text-xs leading-5 ${item.own ? "rounded-tr-sm bg-violet-500/15 text-[#D9D7EA]" : "rounded-tl-sm border border-white/[0.06] bg-white/[0.035] text-[#AAA7C8]"}`}>{item.text}</div></div></article>)}</div><div className="border-t border-white/[0.06] p-4 sm:p-5"><div className="rounded-xl border border-white/[0.08] bg-white/[0.025] focus-within:border-violet-500/40"><textarea value={message} onChange={(event) => setMessage(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); sendMessage(); } }} rows={2} placeholder={`Message #${selectedChannel}`} className="w-full resize-none bg-transparent px-4 pt-3 text-xs leading-5 text-white outline-none placeholder:text-[#55536B]" /><div className="flex items-center justify-between px-3 pb-2"><div className="flex items-center gap-1"><button aria-label="Attach file" className="rounded-lg p-1.5 text-[#686681] hover:bg-white/[0.05] hover:text-white"><Paperclip className="h-4 w-4" /></button><button aria-label="Add emoji" className="rounded-lg p-1.5 text-[#686681] hover:bg-white/[0.05] hover:text-white"><Smile className="h-4 w-4" /></button></div><button onClick={sendMessage} aria-label="Send message" className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-white transition hover:bg-violet-500"><Send className="h-3.5 w-3.5" /></button></div></div></div></main>

				<aside className="hidden border-l border-white/[0.06] p-5 lg:block"><div className="flex items-center justify-between"><div><h2 className="text-xs font-semibold text-white">Channel details</h2><p className="mt-1 text-[10px] text-[#686681]">About this conversation</p></div><button aria-label="More channel options" className="rounded-lg p-1.5 text-[#686681] hover:bg-white/[0.05] hover:text-white"><MoreHorizontal className="h-4 w-4" /></button></div><div className="mt-6 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10"><Hash className="h-5 w-5 text-violet-400" /></div><h3 className="mt-4 text-sm font-semibold text-white">{selectedChannel}</h3><p className="mt-2 text-xs leading-5 text-[#8B89A8]">A shared space for design critiques, project updates, and decisions.</p><div className="mt-6 flex items-center gap-2 text-[10px] text-[#686681]"><Users className="h-3.5 w-3.5" /> 8 members</div><div className="mt-7 border-t border-white/[0.06] pt-5"><p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#5F5D78]">Pinned</p><div className="mt-3 rounded-lg bg-white/[0.025] p-3"><div className="flex gap-2"><Pin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-300" /><p className="text-[10px] leading-4 text-[#AAA7C8]">Client review is scheduled for Friday at 2:00 PM.</p></div></div></div><div className="mt-6 border-t border-white/[0.06] pt-5"><p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#5F5D78]">Shared files</p><div className="mt-3 flex items-center gap-2 rounded-lg bg-white/[0.025] p-2"><FileText className="h-4 w-4 text-teal-400" /><div><p className="text-[10px] font-medium text-[#D9D7EA]">review-notes.pdf</p><p className="text-[9px] text-[#686681]">Added today</p></div></div></div></aside>
			</section>
			<div className="flex items-center gap-2 text-[10px] text-[#55536B]"><MessageCircle className="h-3.5 w-3.5" /> 4 channels <span className="h-1 w-1 rounded-full bg-teal-400" /> 3 teammates online <span className="h-1 w-1 rounded-full bg-teal-400" /> Workspace synced</div>
		</div>
	);
}
