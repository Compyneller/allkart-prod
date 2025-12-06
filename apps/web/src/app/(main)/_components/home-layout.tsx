"use client";
import Container from "@/components/ui/container";
import CategoryListing from "./cat-listing";
import HomeProducts from "./home-products";

const HomeLayout = () => {
  return (
    <Container>
      <CategoryListing />
      <HomeProducts />
    </Container>
  );
};

export default HomeLayout;
