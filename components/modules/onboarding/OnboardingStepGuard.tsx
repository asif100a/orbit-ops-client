"use client";

import { useAuth } from "@/context/AuthProvider";
import { useGetMyCompanyQuery } from "@/store/api/companyApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { RouteLoading } from "./RouteLoading";
import {
  getCompanyFromResponse,
  getCompanyRoute,
  isCompanyMissingError,
} from "./onboarding.utils";

type OnboardingStep = "create-company" | "subscribe";

export function OnboardingStepGuard({
  step,
  children,
}: {
  step: OnboardingStep;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, loading: isAuthLoading } = useAuth();
  const {
    data: companyResponse,
    error: companyError,
    isLoading: isCompanyLoading,
    isFetching: isCompanyFetching,
  } = useGetMyCompanyQuery(undefined, {
    skip: isAuthLoading || !isAuthenticated,
    refetchOnMountOrArgChange: true,
  });

  const isChecking = isAuthLoading || isCompanyLoading || isCompanyFetching;
  const hasNoCompany = isCompanyMissingError(companyError);
  const company = getCompanyFromResponse(companyResponse);
  const targetRoute = getCompanyRoute(company);

  useEffect(() => {
    if (isAuthLoading) {
      return;
    }

    if (!isAuthenticated) {
      router.replace("/sign-in");
      return;
    }

    if (isChecking) {
      return;
    }

    if (step === "create-company" && company) {
      router.replace(targetRoute);
      return;
    }

    if (step === "subscribe") {
      if (hasNoCompany || !company) {
        router.replace("/create-company");
        return;
      }

      if (company.status === "active") {
        router.replace("/user");
      }
    }
  }, [
    company,
    hasNoCompany,
    isAuthLoading,
    isAuthenticated,
    isChecking,
    router,
    step,
    targetRoute,
  ]);

  if (isChecking || !isAuthenticated) {
    return <RouteLoading />;
  }

  if (step === "create-company") {
    return company ? <RouteLoading /> : <>{children}</>;
  }

  if (!company || company.status === "active") {
    return <RouteLoading />;
  }

  return <>{children}</>;
}
