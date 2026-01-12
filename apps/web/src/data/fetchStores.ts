import api from "@/lib/axios-instance";
import { ProductType, StoreTypes } from "@repo/types";
import { useQuery } from "@tanstack/react-query";


export interface StoreWithAddress extends Omit<StoreTypes, 'address'> {
    address: string;
    lat: number;
    long: number;
    distance: number;
}
export const fetchStores = ({ latitude, longitude }: { latitude?: number; longitude?: number }): {
    data: {
        stores: StoreWithAddress[];
        products: ProductType[];
    };
    isLoading: boolean;
    error: any;
} => {
    const fetchStoreData = async () => {
        const { data } = await api.get(`/api/v1/get-stores?latitude=${latitude}&longitude=${longitude}`);

        return data;
    };
    const { data, error, isLoading } = useQuery({
        queryKey: ["nearby-stores", latitude, longitude],
        retry: 1,
        queryFn: fetchStoreData,
        staleTime: 1000 * 60 * 5,
        enabled: !!latitude && !!longitude, // Only fetch when both coordinates are available
    });

    return { data, isLoading, error };
};
