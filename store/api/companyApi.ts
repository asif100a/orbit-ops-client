import { tagTypes } from "../tagTypes";
import { baseApi } from "./_base/baseApi";

const BASE_POINT = "/companies";

export type CompanyStatus = "pending_subscription" | "active" | "suspended";

export interface Company {
  id: string;
  name: string;
  slug?: string;
  website?: string | null;
  size?: string | null;
  country?: string | null;
  ownerId?: string;
  status: CompanyStatus;
  subscriptionId?: string | null;
}

export interface CompanyResponse {
  success?: boolean;
  message?: string;
  data?: Company | null;
}

export interface CreateCompanyPayload {
  name: string;
  website?: string;
  size: string;
  country: string;
}

export interface CreateCheckoutPayload {
  plan: string;
}

export interface CheckoutResponse {
  success?: boolean;
  message?: string;
  data?: {
    checkoutUrl?: string;
    url?: string;
  };
}

export const companyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyCompany: builder.query<CompanyResponse, void>({
      query: () => ({
        url: `${BASE_POINT}/me`,
        method: "GET",
      }),
      providesTags: [tagTypes.company, tagTypes.subscription],
    }),
    createCompany: builder.mutation<CompanyResponse, CreateCompanyPayload>({
      query: (data) => ({
        url: BASE_POINT,
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
        url: "/subscriptions/checkout",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.subscription],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetMyCompanyQuery,
  useCreateCompanyMutation,
  useCreateCheckoutSessionMutation,
} = companyApi;
