import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-6 py-20">
      <div className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 shadow-2xl shadow-violet-950/20 backdrop-blur-xl">
        <div className="grid gap-10 p-8 md:grid-cols-[1.1fr_0.9fr] md:p-12 lg:p-16">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-violet-300">
              404 error
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              This page has drifted off course.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
              The page you’re looking for doesn’t exist, may have moved, or the link you followed is outdated.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400"
              >
                Go back home
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
              >
                Contact support
              </Link>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-linear-to-br from-violet-500/20 via-slate-900 to-slate-800 p-6">
            <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-500/20 text-violet-300">
                  <span className="text-lg font-semibold">?</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Lost in OrbitOps?</p>
                  <p className="text-sm text-slate-400">Try one of the routes below.</p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Link href="/about-us" className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:bg-white/10">
                  <span>About us</span>
                  <span className="text-violet-300">→</span>
                </Link>
                <Link href="/blog" className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:bg-white/10">
                  <span>Blog</span>
                  <span className="text-violet-300">→</span>
                </Link>
                <Link href="/sign-in" className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:bg-white/10">
                  <span>Sign in</span>
                  <span className="text-violet-300">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
