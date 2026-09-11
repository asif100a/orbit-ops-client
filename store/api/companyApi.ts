import { tagTypes } from "../tagTypes";
import { baseApi } from "./_base/baseApi";


interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

interface OrganizationSettings {
  workingDays: string[]; // e.g. "Monday" | "Tuesday" ...
  workingHoursStart: string; // "HH:mm"
  workingHoursEnd: string;   // "HH:mm"
  defaultCurrency: string;   // e.g. "USD"
  allowSelfRegistration: boolean;
}

interface UserRef {
  _id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN" | string;
}

export const companyIndustryOptions = [
  "Technology / Software",
  "IT Services",
  "Finance & Banking",
  "Healthcare & Medical",
  "Education & E-Learning",
  "Manufacturing",
  "Retail & E-Commerce",
  "Real Estate",
  "Construction",
  "Hospitality & Tourism",
  "Food & Beverage",
  "Media & Entertainment",
  "Telecommunications",
  "Transportation & Logistics",
  "Energy & Utilities",
  "Agriculture",
  "Legal Services",
  "Marketing & Advertising",
  "Consulting",
  "Non-Profit / NGO",
  "Government",
  "Insurance",
  "Automotive",
  "Fashion & Apparel",
  "Pharmaceuticals",
  "Aerospace & Defense",
  "Human Resources / Staffing",
  "Sports & Fitness",
  "Other",
] as const;

export type CompanyIndustryType =
  (typeof companyIndustryOptions)[number];

export interface Company {
  address: Address;
  settings: OrganizationSettings;
  status: CompanyStatus;
  isDeleted: boolean;
  _id: string;
  id?: string;
  name: string;
  slug: string;
  registrationNumber: string;
  industryType: CompanyIndustryType;
  size: string;
  logo?: string;
  website?: string;
  email: string;
  phoneNumber: string;
  timezone: string; // e.g. "America/Los_Angeles"
  owner: UserRef;
  admins: UserRef[];
  plan: "FREE" | "PRO" | "ENTERPRISE" | string;
  isActive: boolean;
  isVerified: boolean;
  verifiedAt: string | null;
  onboardingCompleted: boolean;
  createdAt: string; // ISO 8601 date
  updatedAt: string; // ISO 8601 date
}


export type CompanyStatus = "pending_subscription" | "active" | "suspended";

export interface CompanyResponse {
  success?: boolean;
  message?: string;
  data?: Company | null;
}

export interface CreateCompanyPayload {
  name: string;
  slug: string;
  registrationNumber: string;
  industryType: CompanyIndustryType;
  size: string;
  logo?: string;
  website?: string;
  email: string;
  phoneNumber: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  timezone: string;
  plan: string;
  settings: {
    workingDays: string[];
    workingHoursStart: string;
    workingHoursEnd: string;
    defaultCurrency: string;
    allowSelfRegistration: boolean;
  };
}

export interface CreateCheckoutPayload {
  plan: string;
}

export interface VerifyCompanyOtpPayload {
  otp: string;
  companyId: string;
}

export interface CheckoutResponse {
  success?: boolean;
  message?: string;
  data?: {
    checkoutUrl?: string;
    url?: string;
  };
}

const BASE_POINT = "/company";

export const companyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyCompany: builder.query<CompanyResponse, void>({
      query: () => ({
        url: `${BASE_POINT}/my-company`,
        method: "GET",
      }),
      providesTags: [tagTypes.company, tagTypes.subscription],
    }),
    getAllCompany: builder.query<CompanyResponse, void>({
      query: () => ({
        url: `${BASE_POINT}`,
        method: "GET",
      }),
      providesTags: [tagTypes.company],
    }),
    getSingleCompany: builder.query<CompanyResponse, string>({
      query: (companyId) => ({
        url: `${BASE_POINT}/${companyId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.company],
    }),
    createCompany: builder.mutation<CompanyResponse, CreateCompanyPayload>({
      query: (data) => ({
        url: BASE_POINT,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.company],
    }),
    verifyCompanyOtp: builder.mutation<CompanyResponse, VerifyCompanyOtpPayload>({
      query: (data) => ({
        url: `${BASE_POINT}/verify-otp`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.company],
    }),
    createCheckoutSession: builder.mutation<
      CheckoutResponse,
      CreateCheckoutPayload
    >({
      query: (data) => ({
        url: `${BASE_POINT}/checkout`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.subscription],
    }),
    updateCompany: builder.mutation<CompanyResponse, Partial<Company> & { id: string }>({
      query: ({ id, ...data }) => ({
        url: `${BASE_POINT}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tagTypes.company],
    }),
    deleteCompany: builder.mutation<CompanyResponse, string>({
      query: (companyId) => ({
        url: `${BASE_POINT}/${companyId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.company],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetMyCompanyQuery,
  useGetAllCompanyQuery,
  useGetSingleCompanyQuery,
  useCreateCompanyMutation,
  useVerifyCompanyOtpMutation,
  useCreateCheckoutSessionMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} = companyApi;
