"use client";
import AddToCart from "@/components/add-to-cart-button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { ProductVariant } from "@repo/types";
import { productDetailData } from "data/product-detail";
import Link from "next/link";
import ImageCarousel from "./image-carousel";

const ProductDetail = ({
  id,
  variantId,
}: {
  id: number;
  variantId: string;
}) => {
  const { data, isLoading, error } = productDetailData(id, variantId);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <ImageCarousel data={data?.prod_img} />
        <div className="ps-0 md:ps-5">
          <h1 className="text-2xl capitalize font-semibold">
            {data?.Product?.title}
          </h1>

          <h5 className="text-lg font-semibold mb-3 mt-10">Select variant:</h5>
          <div className="flex flex-wrap mb-5 gap-2 items-center ">
            {data?.Product?.variants.map((variant: ProductVariant) => (
              <Link
                href={`/product/${data?.Product?.id}/variant/${variant.id}`}
                key={variant.id}>
                <div
                  className={cn(
                    "w-24 border h-24 rounded-lg flex items-center justify-center flex-col",
                    variant.id === variantId
                      ? "ring-2 ring-primary bg-accent shadow-lg"
                      : ""
                  )}>
                  <p className="text-sm text-muted-foreground">
                    {variant.unit_value}{" "}
                    {variant.unit}
                  </p>

                  <p className="font-semibold">
                    ₹{Number(variant?.selling_price)}
                  </p>

                </div>
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground font-semibold">
                {data?.unit_value} {data?.unit}
              </p>
              <div className="flex items-center gap-3">
                <div>
                  <h2 className="text-3xl font-bold mt-2">
                    ₹{Number(data?.selling_price)}
                  </h2>
                  <p className="text-sm text-muted-foreground line-through">
                    MRP ₹{Number(data?.mrp)}
                  </p>
                  {
                    data?.stock < 5 && <p className="text-yellow-500 font-semibold italic">Hurry Up only {data?.stock} left</p>
                  }
                  {
                    data?.stock === 0 && <p className="text-red-500 font-semibold italic">Out of Stock</p>
                  }
                </div>
                <p className="text-green-500 italic">
                  {Math.round(
                    ((Number(data?.mrp) - Number(data?.selling_price)) /
                      Number(data?.mrp)) *
                    100
                  )}
                  % off
                </p>

              </div>
            </div>
            <AddToCart stock={data?.stock} productId={data?.Product?.id} variantId={data?.id} />
          </div>

          <div className="mt-5">
            <h5 className="text-lg font-semibold mb-2">Description</h5>
            <p>{data?.Product?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
