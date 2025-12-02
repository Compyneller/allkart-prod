"use client";
import React from "react";
import AddressCard from "./address-card";
import { fetchUserAddress } from "data/user/fetchAddress";
import Loader from "@/components/loader";
import { NoAddress } from "./no-address";
import AddressDialog from "./address-dialog";

const AddressLayout = () => {
  const { data, isLoading } = fetchUserAddress();
  if (isLoading) return <Loader />;
  if (data?.data?.length === 0) {
    return <NoAddress />;
  }
  return (
    <>
      <div className="w-full mb-3 border rounded-lg p-3 flex items-center justify-between">
        <h5 className="font-semibold text-xl">Address</h5> <AddressDialog />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {data?.data?.map((item) => (
          <AddressCard key={item.id} data={item} />
        ))}
      </div>
    </>
  );
};

export default AddressLayout;
