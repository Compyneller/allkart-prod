import api from "@/lib/axios-instance";
import { CartProductType } from "@repo/types";
import { useQuery } from "@tanstack/react-query";

export const fetchWishlist = (): {
    data: CartProductType[];
    isLoading: boolean;
    error: any;
} => {
    const fetchWishlistData = async () => {
        const { data } = await api.get("/api/v1/wishlist");

        return data?.data;
    };
    const { data, error, isLoading } = useQuery({
        queryKey: ["wishlist"],
        queryFn: fetchWishlistData,
        staleTime: 1000 * 60,
    });

    return { data, isLoading, error };
};
