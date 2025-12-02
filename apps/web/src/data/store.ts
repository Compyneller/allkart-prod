import api from "@/lib/axios-instance";
import { StoreTypes } from "@repo/types";
import { useQuery } from "@tanstack/react-query";

export const storeData = (): {
  data: StoreTypes[];
  isLoading: boolean;
  error: any;
} => {
  const fetchStore = async () => {
    const { data } = await api.get("/api/v1/dashboard/store");
    return data?.data;
  };
  const { data, error, isLoading } = useQuery({
    queryKey: ["store"],
    queryFn: fetchStore,
    staleTime: 1000 * 60,
  });

  return { data, isLoading, error };
};
