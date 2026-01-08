import { handleDecrementCart } from '@/lib/cart-utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Minus } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../ui/button';

const Decrement = ({ productId, variantId }: { productId: number, variantId: string }) => {
    const queryClient = useQueryClient();



    const { mutate, isPending } = useMutation({
        mutationFn: handleDecrementCart,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
            toast.success("Product removed from cart");
        },
        onError: (error) => {
            toast.error(error?.message || "An error occurred.");
        },
    });

    const handleClick = async () => {
        mutate({ productId, variantId });
    };
    return (
        <Button disabled={isPending} size={"icon-sm"} onClick={handleClick} >
            <Minus />
        </Button>
    )
}

export default Decrement