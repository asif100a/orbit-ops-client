import { UserType } from "@/types/index.types";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./_base/baseApi";

type GetUserResponse = {
  success: boolean;
  message: string;
  data: UserType
};

const BASE_POINT = "/user";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query<GetUserResponse, any>({
      query: () => ({
        url: `${BASE_POINT}/my-profile`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetMyProfileQuery
} = userApi;
