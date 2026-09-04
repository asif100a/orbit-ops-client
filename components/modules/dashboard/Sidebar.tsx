"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  CheckSquare,
  ChevronDown,
  Clock3,
  FileText,
  FolderKanban,
  Inbox,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
  Wallet,
} from "lucide-react";

const navigation = [
  {
    label: "Workspace",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "Inbox",
        href: "/inbox",
        icon: Inbox,
        badge: 4,
      },
      {
        label: "Messages",
        href: "/messages",
        icon: MessageSquare,
      },
    ],
  },
  {
    label: "Work",
    items: [
      {
        label: "Projects",
        href: "/projects",
        icon: FolderKanban,
      },
      {
        label: "My Tasks",
        href: "/tasks",
        icon: CheckSquare,
      },
      {
        label: "Calendar",
        href: "/calendar",
        icon: CalendarDays,
      },
      {
        label: "Time Tracking",
        href: "/time",
        icon: Clock3,
      },
    ],
  },
  {
    label: "Organization",
    items: [
      {
        label: "Team",
        href: "/team",
        icon: Users,
      },
      {
        label: "Clients",
        href: "/clients",
        icon: BriefcaseBusiness,
      },
      {
        label: "Files",
        href: "/files",
        icon: FileText,
      },
    ],
  },
  {
    label: "Business",
    items: [
      {
        label: "Finance",
        href: "/finance",
        icon: Wallet,
      },
      {
        label: "Reports",
        href: "/reports",
        icon: BarChart3,
      },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-[260px] border-r border-white/[0.06] bg-[#0A0A14] lg:flex lg:flex-col">
      {/* Logo */}
      <div className="flex h-[72px] items-center border-b border-white/[0.06] px-5">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 font-bold text-white shadow-[0_0_24px_rgba(108,99,255,0.35)]">
            O
          </div>

          <div>
            <div className="text-[17px] font-bold tracking-tight">
              OrbitOps
            </div>

            <div className="text-[10px] text-[#8B89A8]">
              COMMAND CENTER
            </div>
          </div>
        </Link>
      </div>

      {/* Workspace selector */}
      <div className="px-3 pt-4">
        <button className="flex w-full items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] px-3 py-2.5 text-left transition hover:border-white/[0.12] hover:bg-white/[0.04]">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-teal-400 text-xs font-bold">
            SO
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">
              Standard One
            </p>

            <p className="truncate text-[11px] text-[#8B89A8]">
              Agency Workspace
            </p>
          </div>

          <ChevronDown className="h-4 w-4 text-[#8B89A8]" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-6">
        <div className="space-y-7">
          {navigation.map((section) => (
            <div key={section.label}>
              <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5F5D78]">
                {section.label}
              </p>

              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;

                  const isActive =
                    pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`
                        group flex items-center gap-3 rounded-xl px-3 py-2.5
                        text-sm transition-all
                        ${
                          isActive
                            ? "bg-violet-500/10 text-white shadow-[inset_2px_0_0_#6C63FF]"
                            : "text-[#8B89A8] hover:bg-white/[0.035] hover:text-white"
                        }
                      `}
                    >
                      <Icon
                        className={`
                          h-[17px] w-[17px]
                          ${
                            isActive
                              ? "text-violet-400"
                              : "text-[#686681] group-hover:text-[#aaa7c8]"
                          }
                        `}
                      />

                      <span className="flex-1">
                        {item.label}
                      </span>

                      {"badge" in item && item.badge ? (
                        <span className="rounded-full bg-violet-500/15 px-2 py-0.5 text-[10px] font-medium text-violet-300">
                          {item.badge}
                        </span>
                      ) : null}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>

      {/* Bottom section */}
      <div className="border-t border-white/[0.06] p-3">
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#8B89A8] transition hover:bg-white/[0.035] hover:text-white"
        >
          <Settings className="h-[17px] w-[17px]" />
          Settings
        </Link>

        <div className="mt-2 flex items-center gap-3 rounded-xl bg-white/[0.025] p-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-teal-400 text-xs font-bold">
            AS
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium">
              Asif Sheikh
            </p>

            <p className="truncate text-[11px] text-[#8B89A8]">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}