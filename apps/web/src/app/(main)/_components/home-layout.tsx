"use client";
import Container from "@/components/ui/container";
import { Spinner } from "@/components/ui/spinner";
import { fetchAllProducts } from "data/allProducts";
import CategoryListing from "./cat-listing";
import HomeProducts from "./home-products";

const HomeLayout = () => {
  const { data, isLoading, error } = fetchAllProducts();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container>
      <CategoryListing data={data} />
      <HomeProducts data={data} />
    </Container>
  );
};

export default HomeLayout;
