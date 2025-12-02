import api from "@/lib/axios-instance";
import { ProductType } from "@repo/types";
import { useQuery } from "@tanstack/react-query";

export const productsData = (): {
  data: ProductType[];
  isLoading: boolean;
  error: any;
} => {
  const fetchProducts = async () => {
    const { data } = await api.get("/api/v1/dashboard/products");
    return data?.data;
  };
  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60,
  });

  return { data, isLoading, error };
};
