import { ACCESS_TOKEN_KEY } from "@/constants/auth.constants";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import type { RootState } from "../store";
import type { AuthState } from "@/types/redux.types";

const initialState: AuthState = {
  user: null,
  token: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;

      state.user = user;
      state.token = token;

      // Set token to cookie for middleware accessibility
      Cookies.set(ACCESS_TOKEN_KEY, token, { path: "/" });
    },

    logout: (state) => {
      Cookies.remove(ACCESS_TOKEN_KEY, { path: "/" });
      // signOut();

      state.user = null;
      state.token = null;
    }
  }
});

// Selectors
export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
