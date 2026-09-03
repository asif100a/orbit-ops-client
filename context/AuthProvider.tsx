"use client";

import { useCheckAuthQuery } from "@/store/api/authApi";
import React, { createContext, useContext, useEffect } from "react";

type AuthContextValue = {
  isAuthenticated: boolean;
  loading: boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    data: response,
    isLoading,
    isFetching,
    isError,
    error,
  } = useCheckAuthQuery();

  const value: AuthContextValue = {
    isAuthenticated: response?.success === true && !isError,
    loading: isLoading || isFetching,
  };

  useEffect(() => {
    if (isError) {
      console.error("Error in auth check: ", error);
    }
  }, [isError, error]);

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
