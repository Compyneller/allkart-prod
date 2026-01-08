import { handleAddToCart } from "@/lib/cart-utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import Decrement from "./decrement";

const Quantity = ({
  count,
  productId,
  variantId,
  stock

}: {
  count: number;
  productId: number;
  variantId: string;
  stock: number;
}) => {
  const queryClient = useQueryClient();



  const { mutate, isPending } = useMutation({
    mutationFn: handleAddToCart,
    onSuccess: (responseData) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success(responseData?.message || "Product Added to Cart");
    },
    onError: (error) => {
      toast.error(error?.message || "An error occurred.");
    },
  });

  const handleIncreaseQuantity = async () => {
    mutate({ productId, variantId });
  };


  return (
    <div className="bg-primary flex rounded-lg  text-xs font-semibold items-center ">
      <Decrement productId={productId} variantId={variantId} />

      {count}
      <Button
        size={"icon-sm"}
        disabled={isPending || count === stock}
        onClick={handleIncreaseQuantity}>
        <Plus />
      </Button>
    </div>
  );
};

export default Quantity;
