import api from "@/lib/axios-instance";
import { ProductVariant } from "@repo/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import Decrement from "./decrement";

const Quantity = ({
  count,
  cardData,
}: {
  count: number;
  cardData: ProductVariant;
}) => {

  const queryClient = useQueryClient();
  const handleAddToCart = async () => {
    const productId = cardData?.Product?.id;
    const variantId = cardData?.id;
    const { data } = await api.post("/api/v1/cart", {
      productId,
      variantId,
    });

    return data;
  };

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
    mutate();
  };
  return (
    <div className="bg-primary flex rounded-lg  text-xs font-semibold items-center ">
      <Decrement productId={cardData?.Product?.id!} variantId={cardData?.id!} />

      {count}
      <Button
        size={"icon-sm"}
        disabled={isPending || count === cardData?.stock}
        onClick={handleIncreaseQuantity}>
        <Plus />
      </Button>
    </div>
  );
};

export default Quantity;
