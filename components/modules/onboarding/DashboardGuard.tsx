"use client";

import { useAuth } from "@/context/AuthProvider";
import { useGetMyCompanyQuery } from "@/store/api/companyApi";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { RouteLoading } from "./RouteLoading";
import {
  getCompanyFromResponse,
  getCompanyRoute,
  isCompanyMissingError,
} from "./onboarding.utils";

export function DashboardGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, loading: isAuthLoading } = useAuth();
  const {
    data: companyResponse,
    error: companyError,
    isLoading: isCompanyLoading,
    isFetching: isCompanyFetching,
  } = useGetMyCompanyQuery(undefined, {
    skip: isAuthLoading || !isAuthenticated,
  });

  const isChecking = isAuthLoading || isCompanyLoading || isCompanyFetching;
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

    if (isCompanyMissingError(companyError)) {
      router.replace("/create-company");
      return;
    }

    if (targetRoute !== "/user" && pathname !== targetRoute) {
      router.replace(targetRoute);
    }
  }, [
    companyError,
    isAuthLoading,
    isAuthenticated,
    isChecking,
    pathname,
    router,
    targetRoute,
  ]);

  if (isChecking || !isAuthenticated || targetRoute !== "/user") {
    return <RouteLoading />;
  }

  return <>{children}</>;
}
