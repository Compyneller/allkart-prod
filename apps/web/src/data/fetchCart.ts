import { authClient } from "@/lib/auth-client";
import api from "@/lib/axios-instance";
import { handleAddToCart } from "@/lib/cart-utils";
import { CartProductType } from "@repo/types";
import { useQuery } from "@tanstack/react-query";

export const fetchCart = (): {
  data: CartProductType[];
  isLoading: boolean;
  error: any;
} => {


  const fetchCartData = async () => {
    const { data: userData } = await authClient.getSession();
    if (userData) {
      const { data } = await api.get("/api/v1/cart");
      return data?.data;
    } else {
      return []
    }

  };
  const { data, error, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCartData,
    staleTime: 1000 * 60,
    retry: 0
  });

  return { data, isLoading, error };
};
