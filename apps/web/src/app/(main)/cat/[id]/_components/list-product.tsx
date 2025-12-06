"use client";
import ProductCard from "@/components/product/product-card";
import { fetchAllProductRelatedToCategory } from "data/fetchAllProductRelatedToCategory";
import React from "react";

const ListProducts = ({ id }: { id: string }) => {
  const { data, isLoading, error } = fetchAllProductRelatedToCategory(id);

  return (
    <div className="grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-6 ">
      {data?.map((item) => {
        return item?.variants?.map((variant) => (
          <ProductCard
            pid={item?.id}
            title={item?.title}
            key={variant.id}
            data={variant}
            product={item}
            options={false}
          />
        ));
      })}
    </div>
  );
};

export default ListProducts;
