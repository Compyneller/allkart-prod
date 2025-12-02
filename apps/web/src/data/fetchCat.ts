import api from "@/lib/axios-instance";
import { CategoryType } from "@repo/types";
import { useQuery } from "@tanstack/react-query";

export const fetchCategory = (): {
  data: CategoryType[];
  isLoading: boolean;
  error: any;
} => {
  const fetchCatData = async () => {
    const { data } = await api.get("/api/v1/category");
    return data?.data;
  };
  const { data, error, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: fetchCatData,
    staleTime: 1000 * 60,
  });

  return { data, isLoading, error };
};
