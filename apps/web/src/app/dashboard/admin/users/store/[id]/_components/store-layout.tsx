"use client";
import Loader from "@/components/loader";
import { StoreTypes } from "@repo/types";
import StoreCard from "app/dashboard/store/_components/store-card";
import { fetchSellerStore } from "data/admin/fetchSellerStore";
import React from "react";

const StoreLayout = ({ id }: { id: string }) => {
  const { data, isLoading } = fetchSellerStore(id);

  if (isLoading) return <Loader />;

  if (data?.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className=" p-10 rounded-lg bg-accent">No Store Found</div>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1.5">
      {data?.map((item: StoreTypes) => (
        <StoreCard data={item} key={item.id} />
      ))}
    </div>
  );
};

export default StoreLayout;
