"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Settings } from "lucide-react";
import { ADMIN_NAVIGATION, USER_NAVIGATION } from "@/app/assets/dashboard.data";
import Logo from "../Logo";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import { useLogoutMutation } from "@/store/api/authApi";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/utils";
import { useAppSelector } from "@/store/hooks";
import { selectDashboardMode } from "@/store/features/authSlice";

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter()
  const dashboardMode = useAppSelector(selectDashboardMode);
  const [logout, { isLoading }] = useLogoutMutation();
  const navigation = dashboardMode === "admin" ? ADMIN_NAVIGATION : USER_NAVIGATION;

  const handleLogout = async () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Do you want to logout?",
        text: "You will be logged out if confirm.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, logout!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const response = await logout({}).unwrap();
          console.log('Logout response: ', response);
          if (response.success) {
            swalWithBootstrapButtons.fire({
              title: "Logged out!",
              text: "You have successfully logged out.",
              icon: "success",
            });
            router.replace('/sign-in')
          }
        } else if (result.dismiss === Swal.DismissReason.cancel)
          /* Read more about handling dismissals below */
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "You have canceled logout",
            icon: "error",
          });
      }).catch((error) => {
        console.error('Logout error: ', error);
        const {message} = getErrorMessage(error);
        toast.error(message || 'Failed to logout');
      })
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-[260px] border-r border-white/[0.06] bg-[#0A0A14] lg:flex lg:flex-col">
      {/* Logo */}
      <div className="flex h-[72px] items-center border-b border-white/[0.06] px-5">
        <Link href="/user" className="flex items-center gap-3">
          <Logo />
        </Link>
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
                  const badge =
                    "badge" in item &&
                    (typeof item.badge === "string" ||
                      typeof item.badge === "number")
                      ? item.badge
                      : null;

                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/user" &&
                      pathname.startsWith(`${item.href}/`));

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

                      <span className="flex-1">{item.label}</span>

                      {badge !== null ? (
                        <span className="rounded-full bg-violet-500/15 px-2 py-0.5 text-[10px] font-medium text-violet-300">
                          {badge}
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
          href={dashboardMode === "admin" ? "/admin/settings" : "/user/settings"}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#8B89A8] transition hover:bg-white/[0.035] hover:text-white"
        >
          <Settings className="h-[17px] w-[17px]" />
          Settings
        </Link>

        <Button
          onClick={handleLogout}
          disabled={isLoading}
          className="flex items-center justify-start gap-3 w-full rounded-xl px-3 py-5 text-sm bg-red-500/10 text-white shadow-[inset_2px_0_0_#fee6e9] cursor-pointer"
        >
          <LogOut className="h-[17px] w-[17px]" />
          Log out
        </Button>
      </div>
    </aside>
  );
}
