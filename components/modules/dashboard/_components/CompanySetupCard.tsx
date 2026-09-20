"use client";

import { useGetMyCompanyQuery } from "@/store/api/companyApi";
import { isCompanyMissingError } from "@/components/modules/onboarding/onboarding.utils";
import { ArrowRight, Building2, CreditCard, Loader2 } from "lucide-react";
import Link from "next/link";

export function CompanySetupCard() {
  const {
    data: companyResponse,
    error,
    isLoading,
    isFetching,
  } = useGetMyCompanyQuery();

  if (isLoading || isFetching) {
    return (
      <section className="rounded-2xl border border-white/[0.07] bg-[#0d0d18]/80 p-4">
        <div className="flex items-center gap-3 text-sm text-[#8B89A8]">
          <Loader2 className="h-4 w-4 animate-spin text-violet-300" />
          Checking workspace status
        </div>
      </section>
    );
  }

  const company = companyResponse?.data ?? null;
  // console.log('company data: ', company)
  const hasNoCompany = isCompanyMissingError(error) || !company;

  if (hasNoCompany) {
    return (
      <section className="grid gap-4 rounded-2xl border border-violet-300/20 bg-violet-500/[0.07] p-5 sm:grid-cols-[1fr_auto] sm:items-center">
        <div className="flex gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">
              Create a company workspace
            </h2>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-[#AAA7C8]">
              Start a new company only if you own or manage the organization.
              Invited members can continue using their assigned workspace.
            </p>
          </div>
        </div>
        <Link
          href="/create-company"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 text-sm font-medium text-white transition hover:bg-violet-500"
        >
          Create company
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    );
  }

  if(!company.isVerified) {
    return (
      <section className="grid gap-4 rounded-2xl border border-violet-300/20 bg-violet-500/[0.07] p-5 sm:grid-cols-[1fr_auto] sm:items-center">
        <div className="flex gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">
              Verify your company workspace
            </h2>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-[#AAA7C8]">
              Your company workspace is created, but it needs to be verified before you can access owner-level features.
            </p>
          </div>
        </div>
        <Link
          href={`/verify-company?companyId=${company._id}`}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 text-sm font-medium text-white transition hover:bg-violet-500"
        >
          Verify company
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    );
  }

  if (company.status !== "active") {
    return (
      <section className="grid gap-4 rounded-2xl border border-teal-300/20 bg-teal-400/[0.06] p-5 sm:grid-cols-[1fr_auto] sm:items-center">
        <div className="flex gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-400/10 text-teal-300">
            <CreditCard className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">
              Activate {company.name}
            </h2>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-[#AAA7C8]">
              Your company exists, but the workspace needs an active
              subscription before owner-level features are available.
            </p>
          </div>
        </div>
        <Link
          href={`/billing/subscribe?companyId=${company._id}`}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-teal-500 px-4 text-sm font-medium text-[#061412] transition hover:bg-teal-400"
        >
          Subscribe
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    );
  }

  return null;
}
