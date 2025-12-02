"use client";
import { DataTable } from "@/components/data-table";
import Loader from "@/components/loader";
import { fetchSellerDoc } from "data/admin/fetchSellerDoc";
import React from "react";
import { columns } from "./column";

const SellerDocLayout = () => {
  const { data, isLoading } = fetchSellerDoc();

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <DataTable data={data || []} columns={columns} />
    </div>
  );
};

export default SellerDocLayout;
