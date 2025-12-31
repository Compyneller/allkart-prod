import api from "@/lib/axios-instance";
import { StoreTypes } from "@repo/types";
import { useQuery } from "@tanstack/react-query";

export const fetchStores = ({ latitude, longitude }: { latitude: number; longitude: number }): {
    data: StoreTypes[];
    isLoading: boolean;
    error: any;
} => {
    const fetchStoreData = async () => {
        const { data } = await api.get(`/api/v1/get-stores?latitude=${latitude}&longitude=${longitude}`);
        return data?.data;
    };
    const { data, error, isLoading } = useQuery({
        queryKey: ["nearby-stores", latitude, longitude],
        // enabled: !!latitude && !!longitude,
        retry: 1,
        queryFn: fetchStoreData,
        staleTime: Infinity,
        enabled: !!latitude && !!longitude,

    });

    return { data, isLoading, error };
};
