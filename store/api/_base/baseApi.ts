import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "@/store/tagTypes";
import type { RootState } from "@/store/store";
import { backendUrl } from "@/constants/env.config";
import { setUser, logout } from "@/store/features/authSlice";
import {
  RESET_PASS_TOKEN_KEY,
  FORGOT_PASS_TOKEN_KEY,
  VERIFY_TOKEN_KEY,
} from "@/constants/auth.constants";

type BaseQueryArg = Parameters<typeof baseQuery>[0];
type BaseQueryResult = Awaited<ReturnType<typeof baseQuery>>;
type ExtraOptions = Record<string, unknown>;

const baseQuery = fetchBaseQuery({
  baseUrl: backendUrl || "http://localhost:8080/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    if (typeof window !== "undefined") {
      const verifyToken = sessionStorage.getItem(VERIFY_TOKEN_KEY);
      const forgotPassToken = sessionStorage.getItem(FORGOT_PASS_TOKEN_KEY);
      const resetPassToken = sessionStorage.getItem(RESET_PASS_TOKEN_KEY);
      console.log("resetPassToken: ", resetPassToken)

      if (verifyToken) {
        headers.set("Authorization", `Bearer ${verifyToken}`);
      }
      if (forgotPassToken) {
        headers.set("Authorization", `Bearer ${forgotPassToken}`);
      }
      if (resetPassToken) {
        headers.set("Authorization", `Bearer ${resetPassToken}`);
      }
    }

    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
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
      { url: "/auth/refresh", method: "POST", body: {} },
      api,
      extraOptions
    )) as { data?: { accessToken?: string } };

    if (res?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUser({
          user,
          token: res.data.accessToken,
        })
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
