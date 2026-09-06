"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  Bell,
  ChevronDown,
  Hash,
  Info,
  MessageCircle,
  Paperclip,
  Plus,
  Search,
  Send,
  Smile,
  Users,
} from "lucide-react";

const CHANNELS = ["general", "design-team", "engineering", "acme-website"];
const CHANNEL_MEMBERS = {
  general: ["Sarah Morgan", "John Davis", "Asif Sheikh"],
  "design-team": ["Sarah Morgan", "Asif Sheikh", "Rachel Lee", "Michael Kim"],
  engineering: ["John Davis", "Michael Kim", "Asif Sheikh"],
  "acme-website": ["Sarah Morgan", "Asif Sheikh", "John Davis"],
};
const PEOPLE = [
  {
    name: "Sarah Morgan",
    initials: "SM",
    color: "from-rose-400 to-orange-300",
    preview: "The hero direction is ready",
  },
  {
    name: "John Davis",
    initials: "JD",
    color: "from-sky-400 to-blue-500",
    preview: "Staging is looking good",
  },
  {
    name: "Michael Kim",
    initials: "MK",
    color: "from-amber-400 to-red-400",
    preview: "I shared the latest files",
  },
  {
    name: "Rachel Lee",
    initials: "RL",
    color: "from-teal-400 to-cyan-300",
    preview: "The outline is ready",
  },
];
const STARTER_MESSAGES = [
  {
    name: "Sarah Morgan",
    initials: "SM",
    color: "from-rose-400 to-orange-300",
    time: "9:18 AM",
    text: "Morning everyone. I added the latest responsive explorations to the project files.",
    own: false,
  },
  {
    name: "Michael Kim",
    initials: "MK",
    color: "from-amber-400 to-red-400",
    time: "9:26 AM",
    text: "Nice. I am checking the component states against the updated spacing tokens now.",
    own: false,
  },
  {
    name: "You",
    initials: "AS",
    color: "from-violet-500 to-teal-400",
    time: "9:34 AM",
    text: "The mobile layout is shaping up well. I will finish the authentication handoff this afternoon.",
    own: true,
  },
];

export default function MessagesPage() {
  const router = useRouter();
  const person = useSearchParams().get("person");
  const contact = PEOPLE.find((item) => item.name === person);
  const [channel, setChannel] = useState("design-team");
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState(STARTER_MESSAGES);
  const [expandedChannels, setExpandedChannels] = useState<string[]>([
    "design-team",
  ]);
  const filteredChannels = CHANNELS.filter((item) =>
    item.includes(query.toLowerCase()),
  );
  const title = contact?.name ?? `#${channel}`;
  const toggleChannel = (item: string) => {
    setChannel(item);
    setExpandedChannels((current) =>
      current.includes(item)
        ? current.filter((name) => name !== item)
        : [...current, item],
    );
  };
  const sendMessage = () => {
    if (!draft.trim()) return;
    setMessages((current) => [
      ...current,
      {
        name: "You",
        initials: "AS",
        color: "from-violet-500 to-teal-400",
        time: "Now",
        text: draft.trim(),
        own: true,
      },
    ]);
    setDraft("");
  };

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-sm text-[#8B89A8]">Your team conversations</p>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Messages
          </h1>
          <p className="mt-2 text-sm text-[#8B89A8]">
            Channels for the work, ideas, and decisions behind every project.
          </p>
        </div>
        <button className="flex h-10 items-center gap-2 rounded-xl bg-violet-600 px-4 text-sm font-medium text-white hover:bg-violet-500">
          <Plus className="h-4 w-4" />
          Create channel
        </button>
      </section>
      <section
        className="grid min-h-[650px] w-full overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d0d18]/90"
        style={{ gridTemplateColumns: "245px minmax(0, 1fr)" }}
      >
        <aside className="min-w-0 border-r border-white/[0.06]">
          <div className="border-b border-white/[0.06] p-4">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-violet-400" />
              <h2 className="text-sm font-semibold text-white">Channels</h2>
            </div>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#686681]" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Find a channel"
                className="h-9 w-full rounded-lg border border-white/[0.07] bg-white/[0.035] pl-9 text-xs text-white outline-none placeholder:text-[#55536B]"
              />
            </div>
          </div>
          <nav className="p-3">
            <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5F5D78]">
              Workspace
            </p>
            {filteredChannels.map((item) => {
              const isExpanded = expandedChannels.includes(item);

              return (
                <div key={item}>
                  <button
                    onClick={() => {
                      toggleChannel(item);
                      router.replace("/user/message");
                    }}
                    aria-expanded={isExpanded}
                    className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2.5 text-left text-xs ${channel === item && !contact ? "bg-violet-500/10 text-white" : "text-[#8B89A8] hover:bg-white/[0.035]"}`}
                  >
                    <Hash className="h-4 w-4 shrink-0 text-[#686681]" />
                    <span className="min-w-0 flex-1 truncate">{item}</span>
                    <ChevronDown className={`h-3.5 w-3.5 text-[#55536B] transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                  </button>
                  {isExpanded ? (
                    <div className="mb-1 ml-5 border-l border-white/[0.06] pl-2">
                      {CHANNEL_MEMBERS[item as keyof typeof CHANNEL_MEMBERS].map((member) => {
                        const person = PEOPLE.find((item) => item.name === member);
                        return (
                          <Link
                            key={member}
                            href={`/user/message?person=${encodeURIComponent(member)}`}
                            className="flex items-center gap-2 rounded-md px-2 py-1.5 text-[10px] text-[#686681] hover:bg-white/[0.035] hover:text-[#D9D7EA]"
                          >
                            <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${person?.color ?? "from-violet-500 to-teal-400"} text-[7px] font-bold text-white`}>
                              {person?.initials ?? member.slice(0, 2).toUpperCase()}
                            </span>
                            <span className="min-w-0 truncate">{member}</span>
                          </Link>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              );
            })}
            <p className="mb-2 mt-7 px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5F5D78]">
              Direct messages
            </p>
            {PEOPLE.map((item) => (
              <Link
                key={item.name}
                href={`/user/message?person=${encodeURIComponent(item.name)}`}
                className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2.5 ${contact?.name === item.name ? "bg-violet-500/10 text-white" : "text-[#8B89A8] hover:bg-white/[0.035]"}`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${item.color} text-[8px] font-bold text-white`}
                >
                  {item.initials}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-xs">{item.name}</span>
                  <span className="block truncate text-[9px] text-[#55536B]">
                    {item.preview}
                  </span>
                </span>
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex min-w-0 flex-col overflow-hidden">
          <header className="flex min-h-[73px] items-center justify-between border-b border-white/[0.06] px-4 sm:px-5">
            <div className="flex min-w-0 items-center gap-3">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-xl ${contact ? `bg-gradient-to-br ${contact.color}` : "bg-violet-500/10"}`}
              >
                {contact ? (
                  <span className="text-[9px] font-bold text-white">
                    {contact.initials}
                  </span>
                ) : (
                  <Hash className="h-4 w-4 text-violet-400" />
                )}
              </div>
              <div className="min-w-0">
                <h2 className="truncate text-sm font-semibold text-white">
                  {title}
                </h2>
                <p className="text-[10px] text-[#686681]">
                  {contact
                    ? "Direct message"
                    : "Design critiques and project updates"}
                </p>
              </div>
            </div>
            <div className="flex gap-1">
              <button
                aria-label="Members"
                className="rounded-lg p-2 text-[#686681] hover:bg-white/[0.05] hover:text-white"
              >
                <Users className="h-4 w-4" />
              </button>
              <button
                aria-label="Notifications"
                className="rounded-lg p-2 text-[#686681] hover:bg-white/[0.05] hover:text-white"
              >
                <Bell className="h-4 w-4" />
              </button>
              <button
                aria-label="Information"
                className="rounded-lg p-2 text-[#686681] hover:bg-white/[0.05] hover:text-white"
              >
                <Info className="h-4 w-4" />
              </button>
            </div>
          </header>
          <div className="flex-1 space-y-6 overflow-y-auto px-4 py-5 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-white/[0.06]" />
              <span className="text-[10px] uppercase tracking-[0.12em] text-[#55536B]">
                Today
              </span>
              <div className="h-px flex-1 bg-white/[0.06]" />
            </div>
            {messages.map((item, index) => (
              <article
                key={`${item.name}-${item.time}-${index}`}
                className={`flex gap-3 ${item.own ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${item.color} text-[9px] font-bold text-white`}
                >
                  {item.initials}
                </div>
                <div className={`max-w-[78%] ${item.own ? "text-right" : ""}`}>
                  <p className="mb-1 text-xs font-semibold text-[#D9D7EA]">
                    {item.name}{" "}
                    <span className="ml-2 text-[10px] font-normal text-[#55536B]">
                      {item.time}
                    </span>
                  </p>
                  <div
                    className={`rounded-2xl px-4 py-3 text-xs leading-5 ${item.own ? "rounded-tr-sm bg-violet-500/15 text-[#D9D7EA]" : "rounded-tl-sm border border-white/[0.06] bg-white/[0.035] text-[#AAA7C8]"}`}
                  >
                    {item.text}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="border-t border-white/[0.06] p-4">
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] focus-within:border-violet-500/40">
              <textarea
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    sendMessage();
                  }
                }}
                rows={2}
                placeholder={`Message ${title}`}
                className="w-full resize-none bg-transparent px-4 pt-3 text-xs text-white outline-none placeholder:text-[#55536B]"
              />
              <div className="flex items-center justify-between px-3 pb-2">
                <div className="flex gap-1">
                  <button
                    aria-label="Attach file"
                    className="rounded-lg p-1.5 text-[#686681] hover:text-white"
                  >
                    <Paperclip className="h-4 w-4" />
                  </button>
                  <button
                    aria-label="Add emoji"
                    className="rounded-lg p-1.5 text-[#686681] hover:text-white"
                  >
                    <Smile className="h-4 w-4" />
                  </button>
                </div>
                <button
                  onClick={sendMessage}
                  aria-label="Send message"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-white hover:bg-violet-500"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </section>
      <div className="flex items-center gap-2 text-[10px] text-[#55536B]">
        <MessageCircle className="h-3.5 w-3.5" /> 4 channels{" "}
        <span className="h-1 w-1 rounded-full bg-teal-400" /> Workspace synced
      </div>
    </div>
  );
}
