"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, Check, Menu, Search, Shield, UserRound } from "lucide-react";
import { useGetMyCompanyQuery } from "@/store/api/companyApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectDashboardMode,
  selectUser,
  setDashboardMode,
} from "@/store/features/authSlice";

export function DashboardHeader() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const dashboardMode = useAppSelector(selectDashboardMode);
  const { data: companyResponse } = useGetMyCompanyQuery();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const company = companyResponse?.data ?? null;
  const canAccessAdmin = company?.isActive === true && company.status === "active";
  const userName = typeof user?.name === "string" ? user.name : "OrbitOps user";
  const userEmail = typeof user?.email === "string" ? user.email : "No email available";
  const userRole = typeof user?.role === "string" ? user.role : "USER";
  const initials = userName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!profileRef.current?.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const handleModeChange = () => {
    if (!canAccessAdmin) return;

    const nextMode = dashboardMode === "admin" ? "user" : "admin";
    dispatch(setDashboardMode(nextMode));
    setIsProfileOpen(false);
    router.push(nextMode === "admin" ? "/admin" : "/user");
  };

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
          {/* Search mobile */}
          <button className="rounded-xl p-2.5 text-[#8B89A8] transition hover:bg-white/[0.05] hover:text-white md:hidden">
            <Search className="h-[22px] w-[22px]" />
          </button>

          {/* Notifications */}
          <button className="relative rounded-xl p-2.5 text-[#8B89A8] transition hover:bg-white/[0.05] hover:text-white">
            <Bell className="h-6 w-6" />

            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(108,99,255,0.8)]" />
          </button>

          {/* Avatar */}
          <div ref={profileRef} className="relative ml-1">
            <button
              onClick={() => setIsProfileOpen((open) => !open)}
              aria-expanded={isProfileOpen}
              aria-label="Open profile menu"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-teal-400 text-xs font-bold ring-2 ring-white/[0.06]"
            >
              {initials || "U"}
            </button>

            {isProfileOpen ? (
              <div className="absolute right-0 top-12 z-50 w-72 rounded-2xl border border-white/[0.1] bg-[#11111f] p-3 shadow-2xl shadow-black/40">
                <div className="border-b border-white/[0.08] px-2 pb-3">
                  <p className="truncate text-sm font-semibold text-white">{userName}</p>
                  <p className="mt-1 truncate text-xs text-[#8B89A8]">{userEmail}</p>
                  <span className="mt-2 inline-flex rounded-full bg-violet-500/15 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-violet-300">
                    {userRole}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleModeChange}
                  disabled={!canAccessAdmin}
                  className="mt-2 flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left text-sm text-[#C7C4DF] transition hover:bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-45"
                >
                  {dashboardMode === "admin" ? (
                    <UserRound className="h-4 w-4 text-teal-300" />
                  ) : (
                    <Shield className="h-4 w-4 text-violet-300" />
                  )}
                  <span className="flex-1">
                    {dashboardMode === "admin" ? "Switch to user mode" : "Switch to Admin mode"}
                    <span className="mt-0.5 block text-[11px] text-[#686681]">
                      {canAccessAdmin ? company?.name : "Available after company activation"}
                    </span>
                  </span>
                  {dashboardMode === "admin" ? <Check className="h-4 w-4 text-teal-300" /> : null}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}