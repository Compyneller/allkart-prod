"use client";
import api from "@/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";

export const fetchUsers = () => {
  const fetchUsersData = async () => {
    const { data } = await api.get(`/api/v1/dashboard/admin/users`);
    return data;
  };
  const { data, error, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsersData,
    staleTime: 1000 * 60,
  });

  return { data, isLoading, error };
};
