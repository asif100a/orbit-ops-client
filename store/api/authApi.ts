import {
  FORGOT_PASS_TOKEN_KEY,
  RESET_PASS_TOKEN_KEY,
  VERIFY_TOKEN_KEY,
} from "@/constants/auth.constants";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./_base/baseApi";
import { OTPType } from "@/types/redux.types";

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
    login: builder.mutation<
      RegisterResponse,
      { email: string; password: string }
    >({
      query: (data) => ({
        url: `${BASE_POINT}/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.auth, tagTypes.user],
    }),
    verifyOTP: builder.mutation<any, { otp: string }>({
      query: (data) => ({
        url: `${BASE_POINT}/verify-otp`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.auth, tagTypes.user],
      onQueryStarted: async (arg, api) => {
        const { data } = await api.queryFulfilled;
        sessionStorage.removeItem(VERIFY_TOKEN_KEY);
      },
    }),
    forgotPassword: builder.mutation<any, { email: string }>({
      query: (data) => ({
        url: `${BASE_POINT}/forgot-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.auth, tagTypes.user],
      onQueryStarted: async (arg, api) => {
        const { data } = await api.queryFulfilled;
        sessionStorage.setItem(FORGOT_PASS_TOKEN_KEY, data?.data?.verifyToken);
      },
    }),
    verifyForgotOTP: builder.mutation<any, { otp: string }>({
      query: (data) => ({
        url: `${BASE_POINT}/verify-forgot-password-otp`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.auth, tagTypes.user],
      onQueryStarted: async (arg, api) => {
        const { data } = await api.queryFulfilled;
        sessionStorage.removeItem(FORGOT_PASS_TOKEN_KEY);
        sessionStorage.setItem(RESET_PASS_TOKEN_KEY, data?.data?.resetPasswordToken);
      },
    }),
    resetPassword: builder.mutation<any, { newPassword: string }>({
      query: (data) => ({
        url: `${BASE_POINT}/reset-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.auth, tagTypes.user],
      onQueryStarted: async (arg, api) => {
        const { data } = await api.queryFulfilled;
        sessionStorage.removeItem(RESET_PASS_TOKEN_KEY);
      },
    }),
    resendOTP: builder.mutation<
      any,
      { email: string; otpType: OTPType }
    >({
      query: (data) => ({
        url: `${BASE_POINT}/resend-otp`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.auth, tagTypes.user],
      onQueryStarted: async (arg, api) => {
        const { data } = await api.queryFulfilled;
        if (arg.otpType === "forgot-password") {
          sessionStorage.setItem(
            FORGOT_PASS_TOKEN_KEY,
            data?.data?.verifyToken,
          );
        }else{
          sessionStorage.setItem(
            VERIFY_TOKEN_KEY,
            data?.data?.verifyToken,
          );
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${BASE_POINT}/logout`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.auth, tagTypes.user],
      onQueryStarted: async (arg, api) => {
        const { data } = await api.queryFulfilled;
        sessionStorage.removeItem(VERIFY_TOKEN_KEY);
        sessionStorage.removeItem(FORGOT_PASS_TOKEN_KEY);
        sessionStorage.removeItem(RESET_PASS_TOKEN_KEY);
      },
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
