import React from "react";
import CreateCategoryForm from "./_components/create-cat-form";
import Container from "@/components/ui/container";
import CatList from "./_components/category-list";

const CategoryPage = () => {
  return (
    <Container className="py-10">
      <div className="w-full mx-auto max-w-2xl">
        <CreateCategoryForm />
      </div>
      <CatList />
    </Container>
  );
};

export default CategoryPage;
