import type { ReactNode } from "react"

export default function AuthLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <main className="min-h-[calc(100vh-68px)] bg-[#070810] text-[#F0EEF8]">
      <div className="mx-auto min-h-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        {children}
      </div>
    </main>
  )
}
