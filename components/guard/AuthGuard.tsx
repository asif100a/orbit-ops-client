'use client'

import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function AuthGuard({children}: {
    children: React.ReactNode
}) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      router.push("/sign-in");
    }
  }, [isAuthenticated, loading]);

  if (loading) {
    <div>
      <h1>Loading content...</h1>
    </div>;
  }

  return <div>{children}</div>;
}
