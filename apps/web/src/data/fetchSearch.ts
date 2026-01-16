import api from "@/lib/axios-instance";
import { ProductType } from "@repo/types";
import { useQuery } from "@tanstack/react-query";

export const fetchSearchResult = ({ q, latitude, longitude, page = 1 }: { q: string, latitude: number, longitude: number, page?: number }): {
    data: ProductType[];
    isLoading: boolean;
    error: any;
} => {
    const fetchData = async () => {
        const { data } = await api.get("/api/v1/search", {
            params: {
                q,
                latitude,
                longitude,
                page
            },
        });
        return data?.data;
    };
    const { data, error, isLoading } = useQuery({
        queryKey: ["search", q],
        queryFn: fetchData,
        staleTime: 1000 * 60,
    });

    return { data, isLoading, error };
};
