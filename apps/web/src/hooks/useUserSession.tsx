"use client";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { UserType } from "@repo/types";

export const useUserSession = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    let isMounted = true;

    const getUserSession = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: sessionError } = await authClient.getSession();

        if (!isMounted) return;

        if (sessionError) {
          setError(
            new Error(sessionError.message || "Failed to fetch session")
          );
          setUser(null);
        } else {
          setUser(data?.user as UserType);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error("Unknown error"));
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    getUserSession();

    return () => {
      isMounted = false;
    };
  }, []);

  return { user, loading, error };
};
