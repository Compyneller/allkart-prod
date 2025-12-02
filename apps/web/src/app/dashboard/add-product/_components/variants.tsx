"use client";
import React from "react";
import { useAppSelector } from "store/hook";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VariantCard from "./variant-card";

const Variants = () => {
  const variants = useAppSelector((state) => state.product.variants || []);

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Product Variants ({variants?.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {variants.map((variant, index) => (
            <VariantCard key={index} variant={variant} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Variants;
