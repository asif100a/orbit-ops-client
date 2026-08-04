import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "@/store/tagTypes";
import type { RootState } from "@/store/store";
import { getBackendBaseUrl } from "@/config/env.config";
import { setUser } from "@/store/features/authSlice";
import {
  CHANG_PASS_TOKEN_KEY,
  FORGOT_PASS_TOKEN_KEY,
  OTP_TOKEN_KEY,
} from "@/lib/constants/auth.constants";
import { logout } from "@/store/features/authSlice";

type BaseQueryArg = Parameters<typeof baseQuery>[0];
type BaseQueryResult = Awaited<ReturnType<typeof baseQuery>>;
type ExtraOptions = Record<string, unknown>;

const baseQuery = fetchBaseQuery({
  baseUrl: getBackendBaseUrl(), // Base Url
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const otpToken = sessionStorage.getItem(OTP_TOKEN_KEY);
    const forgotPassToken = sessionStorage.getItem(FORGOT_PASS_TOKEN_KEY);
    const changePassToken = sessionStorage.getItem(CHANG_PASS_TOKEN_KEY);

    const token = (getState() as RootState).auth.token;
    // Main token
    if (token) {
      headers.set("Authorization", token);
    }
    // OTP token
    if (otpToken) {
      headers.set("Authorization", otpToken);
    }
    // Forgot pass token
    if (forgotPassToken) {
      headers.set("Authorization", forgotPassToken);
    }
    // Change pass token
    if (changePassToken) {
      headers.set("token", changePassToken);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  BaseQueryArg,
  unknown,
  FetchBaseQueryError,
  ExtraOptions
> = async (args, api, extraOptions) => {
  let result: BaseQueryResult = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const res = (await baseQuery(
      { url: "/auth/refresh-token", method: "POST", body: {} },
      api,
      extraOptions,
    )) as { data: { accessToken?: string } };

    if (res?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUser({
          user,
          token: res.data.accessToken,
        }),
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: tagTypesList,
  endpoints: () => ({}),
});
