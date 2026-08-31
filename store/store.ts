import type { NoopStorage } from "@/types/redux.types";
import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { baseApi } from "./api/_base/baseApi";
import authReducer from "./features/authSlice";
import geoLocationReducer from "./features/geoLocationSlice";

const createNoopStorage = (): NoopStorage => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve();
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window === "undefined"
    ? createNoopStorage()
    : createWebStorage("local");

const persistedAuthReducer = persistReducer(
  {
    key: "orbitops:auth",
    storage,
  },
  authReducer
);

const persistedGeoLocationReducer = persistReducer(
  {
    key: "orbitops:geoLocation",
    storage,
  },
  geoLocationReducer
);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    geoLocation: persistedGeoLocationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
