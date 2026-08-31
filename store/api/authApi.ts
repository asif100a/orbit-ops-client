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
        sessionStorage.setItem(
          VERIFY_TOKEN_KEY,
          data?.data?.verifyToken
        )
      },
    }),
  }),
  overrideExisting: true,
});

export const { useRegisterMutation } = authApi;
