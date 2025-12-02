import api from "@/lib/axios-instance";
import { ProductResponseType, ProductType, ProductVariant } from "@repo/types";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "store/hook";
import { setProductDetail } from "store/slices/productDetailSlice";

export const productDetailData = (
  id: number,
  variantId: string
): {
  data: ProductResponseType;
  isLoading: boolean;
  error: any;
} => {
  const dispatch = useAppDispatch();
  const fetchProductDetail = async (id: number, variantId: string) => {
    const { data } = await api.get(
      `/api/v1/dashboard/product/${id}/${variantId}`
    );
    dispatch(setProductDetail(data?.data));
    return data?.data;
  };
  const { data, error, isLoading } = useQuery({
    queryKey: ["product", id, variantId],
    queryFn: () => fetchProductDetail(id, variantId),
    staleTime: 1000 * 60,
  });

  return { data, isLoading, error };
};
