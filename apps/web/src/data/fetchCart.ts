import api from "@/lib/axios-instance";
import { CartProductType } from "@repo/types";
import { useQuery } from "@tanstack/react-query";

export const fetchCart = (): {
  data: CartProductType[];
  isLoading: boolean;
  error: any;
} => {
  const fetchCartData = async () => {
    const { data } = await api.get("/api/v1/cart");

    return data?.data;
  };
  const { data, error, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCartData,
    staleTime: 1000 * 60,
  });

  return { data, isLoading, error };
};
