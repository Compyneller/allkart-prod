import api from "@/lib/axios-instance";
import { StoreAddressTypes } from "@repo/types";
import { useQuery } from "@tanstack/react-query";

export const fetchUserAddress = (): {
  data: {
    success: boolean;
    data: StoreAddressTypes[];
  };
  isLoading: boolean;
  error: any;
} => {
  const fetchAddress = async () => {
    const { data } = await api.get("/api/V1/address");
    return data;
  };
  const { data, error, isLoading } = useQuery({
    queryKey: ["user-address"],
    queryFn: fetchAddress,
    staleTime: 100 * 30,
  });

  return { data, isLoading, error };
};
