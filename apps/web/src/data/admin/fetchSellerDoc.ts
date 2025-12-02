import api from "@/lib/axios-instance";
import { sellerDocumentsType } from "@repo/types";
import { useQuery } from "@tanstack/react-query";

export const fetchSellerDoc = (): {
  data: sellerDocumentsType[];
  isLoading: boolean;
  error: any;
} => {
  const fetchSellerDocData = async () => {
    const { data } = await api.get(`/api/v1/dashboard/admin/seller-documents`);
    return data?.data;
  };
  const { data, error, isLoading } = useQuery({
    queryKey: ["seller-doc"],
    queryFn: fetchSellerDocData,
    staleTime: 1000 * 60,
  });

  return { data, isLoading, error };
};
