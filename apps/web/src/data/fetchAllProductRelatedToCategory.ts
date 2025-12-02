import api from "@/lib/axios-instance";
import { ProductType } from "@repo/types";
import { useQuery } from "@tanstack/react-query";

export const fetchAllProductRelatedToCategory = (
  id: string
): {
  data: ProductType[];
  isLoading: boolean;
  error: any;
} => {
  const fetchAllProductsData = async () => {
    const { data } = await api.get("/api/v1/products/" + id);
    return data?.data;
  };
  const { data, error, isLoading } = useQuery({
    queryKey: ["cat-products", id],
    queryFn: fetchAllProductsData,
    staleTime: 1000 * 60,
  });

  return { data, isLoading, error };
};
