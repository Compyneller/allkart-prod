"use client";
import { DataTable } from "@/components/data-table";
import { NoProduct } from "@/components/product/no-product";
import { Spinner } from "@/components/ui/spinner";
import { productsData } from "data/product";
import { columns } from "./column";
import Container from "@/components/ui/container";

const ProdTable = () => {
  const { data, isLoading, error } = productsData();

  if (data?.length === 0) {
    return (
      <Container className="py-10">
        <NoProduct />
      </Container>
    );
  }
  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-dvh">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-dvh">
        <h1 className="text-2xl font-semibold text-center text-red-500">
          {error.message}
        </h1>
      </div>
    );
  }

  return (
    <>
      <DataTable data={data || []} columns={columns} />
    </>
  );
};

export default ProdTable;
