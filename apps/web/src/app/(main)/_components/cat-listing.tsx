"use client";
import CatCard from "@/components/cat-card";
import { CategoryType } from "@repo/types";

const CategoryListing = ({ data }: { data: CategoryType[] }) => {
  return (
    <div className="flex gap-2 flex-wrap py-10">
      {data?.map((item) => (
        <CatCard data={item} key={item.id} />
      ))}
    </div>
  );
};

export default CategoryListing;
