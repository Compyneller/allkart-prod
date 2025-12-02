"use client";
import { DataTable } from "@/components/data-table";
import { fetchVariants } from "data/dashboard/fetchVariants";
import React from "react";
import { columns } from "./column";
import { Spinner } from "@/components/ui/spinner";
import { CreateVariant } from "./create";

const VariantLayout = ({ id }: { id: number }) => {
  const { data, isLoading, error } = fetchVariants(id);

  if (isLoading)
    return (
      <div className="w-full h-dvh flex items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <div>
      <div className="border rounded-lg mb-3 p-3 flex items-center justify-between">
        <CreateVariant pid={id} />
      </div>
      <DataTable data={data || []} columns={columns} />
    </div>
  );
};

export default VariantLayout;
