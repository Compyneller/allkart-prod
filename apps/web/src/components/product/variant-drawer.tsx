"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import api from "@/lib/axios-instance";
import { ProductType, ProductVariant } from "@repo/types";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import AddToCart from "../add-to-cart-button";
import ProductCardSkeleton from "../skeletons/product/product-card-skeleton";
import Container from "../ui/container";
import { Separator } from "../ui/separator";

export function VariantDrawer({
  count,
  pid,
}: {
  count: number
  pid: number;
}) {

  const skeleton = Array.from({ length: count }, (_, i) => i + 1);
  const fetchVariants = async (id: number) => {
    const { data } = await api.get(`/api/v1/variants?id=${id}`);

    return data?.data;
  };
  const { data, isPending, mutate } = useMutation({
    mutationFn: fetchVariants,
  });


  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="default" size={"sm"} onClick={() => mutate(pid)}>
          Options ({count})
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full py-5">
          <DrawerHeader>
            <DrawerTitle>Variants</DrawerTitle>
          </DrawerHeader>

          <Container>
            {
              isPending && <div className="grid prod-card grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {
                  skeleton.map((v, i) => (
                    <ProductCardSkeleton key={i} />
                  ))
                }
              </div>
            }
            <div className="grid prod-card grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {data?.map((variant: ProductVariant & { Product: ProductType }) => (
                <div className="w-full  rounded-lg" >
                  <div className="aspect-square relative flex mb-5 items-center justify-center w-full rounded-t-lg">
                    <Image
                      fill
                      src={variant?.prod_img[0]?.url!}
                      alt={`Variant Image`}
                      className="w-full prod-image aspect-square object-cover rounded-md"
                    />
                  </div>

                  <div className=" mb-3 space-y-0.5 text-sm">
                    <p className="font-semibold">{variant?.Product.title}</p>
                    <Separator />
                    <div className="flex items-center text-muted-foreground justify-between gap-2 text-sm">
                      <p>
                        {variant?.unit_value} {variant?.unit}
                      </p>
                      <p className="text-sm">
                        <span className=" text-primary">
                          ₹{Number(variant?.selling_price)}
                        </span>{" "}
                        <span className="text-xs">M.R.P</span>{" "}
                        <span className="line-through italic">
                          ₹{Number(variant?.mrp)}
                        </span>
                      </p>
                    </div>
                  </div>
                  <AddToCart
                    stock={variant?.stock}
                    size="sm"
                    data={variant}
                    variantId={variant?.id!}
                    productId={pid}
                  />
                </div>
              ))}
            </div>
          </Container>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
