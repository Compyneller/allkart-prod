"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ProductVariant } from "@repo/types";
import Container from "../ui/container";
import CardCarousel from "./card-carousel";
import AddToCart from "../add-to-cart-button";
import { Separator } from "../ui/separator";

export function VariantDrawer({
  variants,
  title,
  pid,
}: {
  variants: ProductVariant[];
  title: string;
  pid: number;
}) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="default" size={"sm"}>
          Options ({variants?.length})
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full py-5">
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
          </DrawerHeader>

          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {variants?.map((variant) => (
                <div className="w-full  rounded-lg">
                  <div className="aspect-[1/1] flex mb-5 items-center justify-center w-full rounded-t-lg">
                    <CardCarousel images={variant?.prod_img} />
                  </div>
                  {/* <div className=" space-y-0.5 text-sm">
                                            <p>
                                                {variant.unit_value} {variant.unit}
                                            </p>
                                            <p className="text-sm">
                                                ₹{Number(variant.selling_price)} M.R.P{" "}
                                                <span className="line-through">₹{Number(variant.mrp)}</span>
                                            </p>
                                            <AddToCart size="sm" variantId={variant.id!} productId={pid} />
                                            
                                            </div> */}
                  <div className=" mb-3 space-y-0.5 text-sm">
                    <p className="font-semibold text-lg">{title}</p>
                    <Separator />
                    <div className="flex items-center text-muted-foreground justify-between gap-2 text-sm">
                      <p>
                        {variant.unit_value} {variant.unit}
                      </p>
                      <p className="text-sm">
                        <span className=" text-primary">
                          ₹{Number(variant.selling_price)}
                        </span>{" "}
                        <span className="text-xs">M.R.P</span>{" "}
                        <span className="line-through italic">
                          ₹{Number(variant.mrp)}
                        </span>
                      </p>
                    </div>
                  </div>
                  <AddToCart
                    stock={variant?.stock}
                    size="sm"
                    variantId={variant.id!}
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
