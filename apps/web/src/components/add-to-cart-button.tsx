import React from "react";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "@/lib/axios-instance";
import { Spinner } from "./ui/spinner";
import { ShoppingBag } from "lucide-react";

const AddToCart = ({
  stock,
  productId,
  variantId,
  size = "default",
}: {
  stock: number
  productId: number;
  variantId: string;
  size?: "default" | "sm" | "lg";
}) => {
  const queryClient = useQueryClient();
  const handleAddToCart = async () => {
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

  return (
    <Button size={size} disabled={isPending || stock < 1} onClick={() => mutate()}>
      {isPending ? <Spinner /> : <ShoppingBag />} Add to cart
    </Button>
  );
};

export default AddToCart;
