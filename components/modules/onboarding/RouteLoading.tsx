import { Loader2 } from "lucide-react";

export function RouteLoading({ label = "Preparing your workspace" }) {
  return (
    <div className="flex min-h-[calc(100vh-220px)] items-center justify-center">
      <div className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-[#0d0d18]/90 px-4 py-3 text-sm text-[#AAA7C8]">
        <Loader2 className="h-4 w-4 animate-spin text-violet-300" />
        {label}
      </div>
    </div>
  );
}
