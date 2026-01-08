import { handleAddToCart } from "@/lib/cart-utils";
import { ProductVariant } from "@repo/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

const AddToCart = ({
  stock,
  productId,
  variantId,
  data,
  size = "default",
}: {
  stock: number;
  productId: number;
  variantId: string;
  data: ProductVariant;
  size?: "default" | "sm" | "lg";
}) => {





  const queryClient = useQueryClient();


  // const handleAddtoCartAnimation = () => {
  //   const addToCartButtons = document.querySelectorAll<HTMLElement>(".add-to-cart-button");
  //   const addToCartIcon = document.querySelector<HTMLElement>(".add-to-cart-icon");


  //   addToCartButtons.forEach((button) => {
  //     button.addEventListener("click", (e) => {
  //       // --- Flying Image Logic ---
  //       const productContainer = button.closest<HTMLElement>(".prod-card");
  //       const originalImg = productContainer?.querySelector<HTMLImageElement>(".prod-image");

  //       if (!originalImg || !addToCartIcon) return;

  //       const imgRect = originalImg.getBoundingClientRect();
  //       const cartRect = addToCartIcon.getBoundingClientRect();
  //       const clone = originalImg.cloneNode() as HTMLImageElement;

  //       Object.assign(clone.style, {
  //         position: "fixed",
  //         top: `${imgRect.top}px`,
  //         left: `${imgRect.left}px`,
  //         width: `${imgRect.width}px`,
  //         height: `${imgRect.height}px`,
  //         zIndex: "2",
  //         pointerEvents: "none",
  //       });

  //       document.body.appendChild(clone);

  //       const destX = cartRect.left + cartRect.width / 2 - imgRect.width / 2;
  //       const destY = cartRect.top + cartRect.height / 2 - imgRect.height / 2;

  //       const flyAnim = clone.animate(
  //         [
  //           { transform: "translate(0, 0) scale(1)", opacity: 1 },
  //           {
  //             transform: `translate(${destX - imgRect.left}px, ${destY - imgRect.top}px) scale(0.1)`,
  //             opacity: 0,
  //           },
  //         ],
  //         {
  //           duration: 800,
  //           easing: "ease-in-out",
  //           fill: "forwards",
  //         }
  //       );

  //       flyAnim.onfinish = () => clone.remove();
  //     });
  //   });
  // };

  const { mutate, isPending } = useMutation({
    mutationFn: handleAddToCart,
    onSuccess: (responseData) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      // handleAddtoCartAnimation();
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
      onClick={() => mutate({
        stock,
        productId,
        variantId,
        data,
      })}
    >
      {isPending ? <Spinner /> : <ShoppingBag />} Add to cart
    </Button>
  );
};

export default AddToCart;
