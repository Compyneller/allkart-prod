import api from "@/lib/axios-instance";
import { ProductType } from "@repo/types";
import { useQuery } from "@tanstack/react-query";

export const fetchAllProductByStoreId = (id: number): {
    data: ProductType[];
    isLoading: boolean;
    error: any;
} => {
    const fetchData = async () => {
        const { data } = await api.get("/api/v1/store-products/" + id);
        return data?.data;
    };
    const { data, error, isLoading } = useQuery({
        queryKey: ["products", id],
        queryFn: fetchData,
        staleTime: 1000 * 60,
    });

    return { data, isLoading, error };
};
