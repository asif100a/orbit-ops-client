"use client";

import {
  Bell,
  Menu,
  Search,
  Plus,
} from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-40 h-[72px] border-b border-white/[0.06] bg-[#080812]/80 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Mobile menu */}
        <button
          className="rounded-lg p-2 text-[#8B89A8] hover:bg-white/[0.05] hover:text-white lg:hidden"
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Search */}
        <div className="hidden max-w-md flex-1 md:block">
          <button className="flex h-10 w-full max-w-[380px] items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] px-3.5 text-left text-sm text-[#686681] transition hover:border-white/[0.12] hover:bg-white/[0.04]">
            <Search className="h-4 w-4" />

            <span className="flex-1">
              Search anything...
            </span>

            <kbd className="rounded-md border border-white/[0.08] bg-white/[0.03] px-1.5 py-0.5 text-[10px]">
              ⌘ K
            </kbd>
          </button>
        </div>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-2">
          {/* Quick create */}
          <button className="hidden items-center gap-2 rounded-xl bg-violet-600 px-3.5 py-2.5 text-sm font-medium text-white shadow-[0_0_24px_rgba(108,99,255,0.2)] transition hover:bg-violet-500 sm:flex">
            <Plus className="h-4 w-4" />
            Create
          </button>

          {/* Search mobile */}
          <button className="rounded-xl p-2.5 text-[#8B89A8] transition hover:bg-white/[0.05] hover:text-white md:hidden">
            <Search className="h-5 w-5" />
          </button>

          {/* Notifications */}
          <button className="relative rounded-xl p-2.5 text-[#8B89A8] transition hover:bg-white/[0.05] hover:text-white">
            <Bell className="h-[18px] w-[18px]" />

            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(108,99,255,0.8)]" />
          </button>

          {/* Avatar */}
          <button className="ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-teal-400 text-xs font-bold ring-2 ring-white/[0.06]">
            AS
          </button>
        </div>
      </div>
    </header>
  );
}