import Link from "next/link";

export default function Home() {
  return (
    <section className="mx-auto flex min-h-[60vh] w-full max-w-7xl flex-col justify-center gap-8 px-4 py-16 sm:px-6">
      <div className="max-w-3xl space-y-4">
        <p className="text-sm font-medium text-muted-foreground">Orbit Ops</p>
        <h1 className="text-4xl font-semibold tracking-normal text-foreground md:text-6xl">
          Manage operational work from one focused command center.
        </h1>
        <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
          Sign in to continue, or create an account to start organizing teams,
          workflows, and day-to-day execution.
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/sign-in"
          className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
        >
          Sign in
        </Link>
        <Link
          href="/sign-up"
          className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-background px-3 text-sm font-medium transition-colors hover:bg-muted"
        >
          Create account
        </Link>
      </div>
    </section>
  );
}
