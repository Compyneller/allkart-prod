import api from "@/lib/axios-instance";
import { ProductVariant } from "@repo/types";
import { useQuery } from "@tanstack/react-query";

export const fetchVariants = (
  id: number
): {
  data: ProductVariant[];
  isLoading: boolean;
  error: any;
} => {
  const fetchVariants = async () => {
    const { data } = await api.get("/api/v1/dashboard/variants/" + id);
    return data?.data;
  };
  const { data, error, isLoading } = useQuery({
    queryKey: ["variants", id],
    queryFn: fetchVariants,
    staleTime: 1000 * 60,
  });

  return { data, isLoading, error };
};
