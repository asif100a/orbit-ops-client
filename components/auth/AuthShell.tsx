import type { ReactNode } from "react"

type AuthShellProps = {
  title: string
  description: string
  aside?: ReactNode
  children: ReactNode
}

export default function AuthShell({
  title,
  description,
  aside,
  children,
}: AuthShellProps) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-2 md:px-0 lg:flex-row lg:items-center">
      <div className="space-y-8 lg:max-w-xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/5 px-4 py-2 text-sm text-white/80">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-linear-to-br from-violet-500 to-teal-400 text-sm">
            ⬡
          </span>
          OrbitOps
        </div>

        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-violet-300/80">
            Secure access
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          <p className="text-sm leading-7 text-[#8B89A8]">{description}</p>
        </div>

        {aside ? <div className="grid gap-4 sm:grid-cols-2">{aside}</div> : null}
      </div>

      <div className="w-full max-w-xl rounded-[2rem] border border-white/8 bg-[#131629]/95 p-8 shadow-[0_48px_120px_rgba(0,0,0,0.35)]">
        {children}
      </div>
    </div>
  )
}
