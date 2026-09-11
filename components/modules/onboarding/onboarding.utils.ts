import type { Company, CompanyResponse } from "@/store/api/companyApi";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export function getCompanyFromResponse(
  response: CompanyResponse | undefined,
): Company | null {
  return response?.data ?? null;
}

export function isCompanyMissingError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    (error as FetchBaseQueryError).status === 404
  );
}

export function getCompanyRoute(company: Company | null) {
  if (!company) {
    return "/create-company";
  }

  if (company.status !== "active") {
    return "/billing/subscribe";
  }

  return "/user";
}
