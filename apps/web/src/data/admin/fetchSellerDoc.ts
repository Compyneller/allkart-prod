import api from "@/lib/axios-instance";
import { sellerDocumentsType } from "@repo/types";
import { useQuery } from "@tanstack/react-query";

export const fetchSellerDoc = (
  id: string
): {
  data: sellerDocumentsType & {
    createdAt: string;
    updatedAt: string;
  };
  isLoading: boolean;
  error: any;
} => {
  const fetchSellerDocData = async () => {
    const { data } = await api.get(
      `/api/v1/dashboard/admin/seller-documents/${id}`
    );
    return data?.data;
  };
  const { data, error, isLoading } = useQuery({
    queryKey: ["seller-doc", id],
    queryFn: fetchSellerDocData,
    staleTime: 1000 * 60,
  });

  return { data, isLoading, error };
};
