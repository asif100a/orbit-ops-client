import { VERIFY_TOKEN_KEY } from "@/constants/auth.constants";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./_base/baseApi";

const BASE_POINT = "/auth";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: string;
  companyId?: string | null;
  departmentId?: string | null;
  teamId?: string | null;
}

export interface RegisterResponse {
  success?: boolean;
  message?: string;
  data?: any;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterPayload>({
      query: (data) => ({
        url: `${BASE_POINT}/register`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.auth, tagTypes.user],
      onQueryStarted: async (arg, api) => {
        const { data } = await api.queryFulfilled;
        sessionStorage.setItem(VERIFY_TOKEN_KEY, data?.data?.verifyToken);
      },
    }),
    login: builder.mutation<RegisterResponse, {email: string; password: string}>({
      query: (data) => ({
        url: `${BASE_POINT}/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.auth, tagTypes.user],
      onQueryStarted: async (arg, api) => {
        const { data } = await api.queryFulfilled;
        sessionStorage.setItem(VERIFY_TOKEN_KEY, data?.data?.verifyToken);
      },
    }),
    verifyOTP: builder.mutation<any, {otp: string}>({
      query: (data) => ({
        url: `${BASE_POINT}/verify-otp`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.auth, tagTypes.user],
      onQueryStarted: async (arg, api) => {
        const { data } = await api.queryFulfilled;
        sessionStorage.setItem(VERIFY_TOKEN_KEY, data?.data?.verifyToken);
      },
    }),
    forgotPassword: builder.mutation<any, {email: string}>({
      query: (data) => ({
        url: `${BASE_POINT}/forgot-password`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: [tagTypes.auth, tagTypes.user]
    }),
    verifyForgotOTP: builder.mutation<any, {otp: string}>({
      query: (data) => ({
        url: `${BASE_POINT}/verify-forgot-password-otp`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: [tagTypes.auth, tagTypes.user]
    }),
    resetPassword: builder.mutation<any, {newPassword: string}>({
      query: (data) => ({
        url: `${BASE_POINT}/reset-password`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: [tagTypes.auth, tagTypes.user]
    }),
    resendOTP: builder.mutation<any, {email: string; otpType: "register" | "forgot-password"}>({
      query: (data) => ({
        url: `${BASE_POINT}/reset-password`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: [tagTypes.auth, tagTypes.user]
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${BASE_POINT}/logout`,
        method: 'POST'
      }),
      invalidatesTags: [tagTypes.auth, tagTypes.user]
    }),
  }),
  overrideExisting: true,
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useVerifyOTPMutation,
  useForgotPasswordMutation,
  useVerifyForgotOTPMutation,
  useResetPasswordMutation,
  useResendOTPMutation,
  useLogoutMutation,
} = authApi;
