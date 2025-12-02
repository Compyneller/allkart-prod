import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Plus } from "lucide-react";
import React from "react";
import ProdTable from "./_components/prod-table";
import Link from "next/link";

const Products = () => {
  return (
    <Container className="py-10">
      <div className="w-full mb-3 flex items-center justify-between p-3 rounded-lg border">
        <h5 className="text-2xl font-semibold">Products</h5>
        <Link href="/dashboard/add-product">
          <Button size={"sm"}>
            <Plus /> Create Product
          </Button>
        </Link>
      </div>
      <ProdTable />
    </Container>
  );
};

export default Products;
