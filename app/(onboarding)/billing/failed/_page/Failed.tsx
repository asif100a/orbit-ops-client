import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react'
import Link from 'next/link'

export default function Failed() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-160px)] max-w-2xl items-center justify-center">
      <div className="w-full rounded-2xl border border-rose-400/15 bg-[#0d0d18]/90 p-6 text-center shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:p-8">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-400/10 text-rose-300">
          <AlertTriangle className="h-7 w-7" />
        </div>
        <p className="mt-6 text-sm text-[#8B89A8]">Payment unsuccessful</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
          We could not activate your workspace
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#8B89A8]">
          Your payment was not completed, so your company is still awaiting activation.
          You have not been charged for an unsuccessful checkout.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/billing/subscribe"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 text-sm font-medium text-white transition hover:bg-violet-500"
          >
            <RefreshCw className="h-4 w-4" />
            Try payment again
          </Link>
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-white/[0.09] px-4 text-sm font-medium text-[#D9D7EA] transition hover:bg-white/[0.04]"
          >
            <ArrowLeft className="h-4 w-4" />
            Return home
          </Link>
        </div>
        <p className="mt-6 text-xs text-[#686681]">
          Need help? Contact your workspace administrator or try a different payment method.
        </p>
      </div>
    </section>
  )
}
