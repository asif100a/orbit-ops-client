import { tagTypes } from "../tagTypes";
import { baseApi } from "./_base/baseApi";


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
  slug: string;
  registrationNumber: string;
  industryType: string;
  size: string;
  logo: string;
  website: string;
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
        url: `${BASE_POINT}/checkout`,
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
