"use client";
import CatCard from "@/components/cat-card";
import CatCardSkeleton from "@/components/skeletons/cat-card-skeleton";
import { fetchCategory } from "data/fetchCat";

const CategoryListing = () => {
  const { data, isLoading, error } = fetchCategory();

  if (isLoading) {
    return <CatCardSkeleton />;
  }
  return (
    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-1 py-10">
      {data?.map((item) => (
        <CatCard data={item} key={item.id} />
      ))}
    </div>
  );
};

export default CategoryListing;
