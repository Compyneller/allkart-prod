import api from "@/lib/axios-instance";
import { StoreTypes } from "@repo/types";
import { useQuery } from "@tanstack/react-query";

export const fetchStoreDetails = (id: number): {
    data: StoreTypes;
    isLoading: boolean;
    error: any;
} => {
    const fetchData = async () => {
        const { data } = await api.get("/api/v1/store-detail/" + id);
        return data?.data;
    };
    const { data, error, isLoading } = useQuery({
        queryKey: ["store-detail", id],
        queryFn: fetchData,
        staleTime: 1000 * 60,
    });

    return { data, isLoading, error };
};
