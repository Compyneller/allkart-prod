import api from "@/lib/axios-instance";
import { CategoryType } from "@repo/types";
import { useQuery } from "@tanstack/react-query";

export const fetchAllProducts = (): {
  data: CategoryType[];
  isLoading: boolean;
  error: any;
} => {
  const fetchAllProductsData = async () => {
    const { data } = await api.get("/api/v1/all-products");
    return data?.data;
  };
  const { data, error, isLoading } = useQuery({
    queryKey: ["all-products"],
    queryFn: fetchAllProductsData,
    staleTime: 1000 * 60,
  });

  return { data, isLoading, error };
};
