"use client";
import { Spinner } from "@/components/ui/spinner";
import { fetchCategory } from "data/fetchCat";
import { List } from "lucide-react";
import React from "react";
import DeleteCat from "./delete-cat";

const CatList = () => {
  const { data, isLoading } = fetchCategory();
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="mt-5 ">
      <h5 className="flex mb-3 items-center gap-1 text-lg font-semibold">
        <List size={18} /> Category List
      </h5>
      <div className="flex items-center gap-2  flex-wrap ">
        {data?.map((item) => (
          <div
            key={item?.id}
            className="w-fit h-fit relative p-2 border rounded-lg flex items-center justify-center flex-col">
            <DeleteCat catData={item} />
            <img
              src={item.url}
              alt="category-image"
              className="w-20 h-20 object-contain"
            />
            <p className="text-sm capitalize">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatList;
