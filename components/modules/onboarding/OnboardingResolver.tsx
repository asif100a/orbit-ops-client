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

export function OnboardingResolver() {
  const router = useRouter();
  const { isAuthenticated, loading: isAuthLoading } = useAuth();
  const {
    data: companyResponse,
    error: companyError,
    isLoading: isCompanyLoading,
    isFetching: isCompanyFetching,
  } = useGetMyCompanyQuery(undefined, {
    skip: isAuthLoading || !isAuthenticated,
  });

  useEffect(() => {
    if (isAuthLoading) {
      return;
    }

    if (!isAuthenticated) {
      router.replace("/sign-in");
      return;
    }

    if (isCompanyLoading || isCompanyFetching) {
      return;
    }

    if (isCompanyMissingError(companyError)) {
      router.replace("/create-company");
      return;
    }

    router.replace(getCompanyRoute(getCompanyFromResponse(companyResponse)));
  }, [
    companyError,
    companyResponse,
    isAuthLoading,
    isAuthenticated,
    isCompanyFetching,
    isCompanyLoading,
    router,
  ]);

  return <RouteLoading />;
}
