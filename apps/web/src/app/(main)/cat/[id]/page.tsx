import React from "react";
import ListProducts from "./_components/list-product";
import Container from "@/components/ui/container";

const ProductsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <Container className="py-10">
      <ListProducts id={id} />
    </Container>
  );
};

export default ProductsPage;
