import { PaymentType, SubscriptionType } from "@/types/index.types";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./_base/baseApi";

type CreatePaymentPayload = {
  subscriptionType: SubscriptionType;
};

type CreatePaymentResponse = {
  success: boolean;
  message: string;
  data: {
    url: string;
  };
};

type GetPaymentResponse = {
  success: boolean;
  message: string;
  data: PaymentType
};

const BASE_POINT = "/payment";

export const companyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPayment: builder.mutation<CreatePaymentResponse, CreatePaymentPayload>({
      query: (data) => ({
        url: `${BASE_POINT}/create-checkout-session`,
        method: "POST",
        body: data,
      }),
    }),
    getPayment: builder.query<GetPaymentResponse, {session_id: string}>({
      query: ({session_id}) => ({
        url: `${BASE_POINT}/session-status/${session_id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.company, tagTypes.subscription],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreatePaymentMutation,
  useGetPaymentQuery
} = companyApi;
