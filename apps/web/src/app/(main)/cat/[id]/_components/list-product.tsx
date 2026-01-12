"use client";
import ProductCard from "@/components/product/product-card";
import { ProductType } from "@repo/types";
import { fetchAllProductRelatedToCategory } from "data/fetchAllProductRelatedToCategory";
import React from "react";

const ListProducts = ({ id }: { id: string }) => {
  const { data } = fetchAllProductRelatedToCategory(id);
  console.log(data, 'list-product.tsx');

  return (
    <div className="grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-6 ">
      {data?.map((prod) => {
        return <ProductCard
          pid={prod?.id}
          title={prod?.title}
          key={prod?.id}
          count={prod?._count?.variants!}
          data={prod?.variants[0]!}
        />
      })}
    </div>
  );
};

export default ListProducts;
