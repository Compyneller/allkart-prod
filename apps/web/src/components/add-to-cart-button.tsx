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
  stock: number;
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

  const handleAddtoCartAnimation = () => {
    const addToCartButtons = document.querySelectorAll<HTMLElement>(".add-to-cart-button");
    const addToCartIcon = document.querySelector<HTMLElement>(".add-to-cart-icon");


    addToCartButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        // --- Flying Image Logic ---
        const productContainer = button.closest<HTMLElement>(".prod-card");
        const originalImg = productContainer?.querySelector<HTMLImageElement>(".prod-image");

        if (!originalImg || !addToCartIcon) return;

        const imgRect = originalImg.getBoundingClientRect();
        const cartRect = addToCartIcon.getBoundingClientRect();
        const clone = originalImg.cloneNode() as HTMLImageElement;

        Object.assign(clone.style, {
          position: "fixed",
          top: `${imgRect.top}px`,
          left: `${imgRect.left}px`,
          width: `${imgRect.width}px`,
          height: `${imgRect.height}px`,
          zIndex: "2",
          pointerEvents: "none",
        });

        document.body.appendChild(clone);

        const destX = cartRect.left + cartRect.width / 2 - imgRect.width / 2;
        const destY = cartRect.top + cartRect.height / 2 - imgRect.height / 2;

        const flyAnim = clone.animate(
          [
            { transform: "translate(0, 0) scale(1)", opacity: 1 },
            {
              transform: `translate(${destX - imgRect.left}px, ${destY - imgRect.top}px) scale(0.1)`,
              opacity: 0,
            },
          ],
          {
            duration: 800,
            easing: "ease-in-out",
            fill: "forwards",
          }
        );

        flyAnim.onfinish = () => clone.remove();
      });
    });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: handleAddToCart,
    onSuccess: (responseData) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      handleAddtoCartAnimation();
      toast.success(responseData?.message || "Product Added to Cart");
    },
    onError: (error) => {
      toast.error(error?.message || "An error occurred.");
    },
  });

  return (
    <Button
      className="add-to-cart-button"
      size={size}
      disabled={isPending || stock < 1}
      onClick={() => mutate()}
    >
      {isPending ? <Spinner /> : <ShoppingBag />} Add to cart
    </Button>
  );
};

export default AddToCart;
