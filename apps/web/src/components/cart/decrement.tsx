import React from 'react'
import { Button } from '../ui/button'
import { Minus } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios-instance';
import { toast } from 'sonner';

const Decrement = ({ productId, variantId }: { productId: number, variantId: string }) => {
    const queryClient = useQueryClient();
    const handleAddToCart = async () => {

        const { data } = await api.post("/api/v1/decrement-cart", {
            productId,
            variantId,
        });

        return data;
    };

    const { mutate, isPending } = useMutation({
        mutationFn: handleAddToCart,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
            toast.success("Product removed from cart");
        },
        onError: (error) => {
            toast.error(error?.message || "An error occurred.");
        },
    });

    const handleDecrementCart = async () => {
        mutate();
    };
    return (
        <Button disabled={isPending} size={"icon-sm"} onClick={handleDecrementCart} >
            <Minus />
        </Button>
    )
}

export default Decrement