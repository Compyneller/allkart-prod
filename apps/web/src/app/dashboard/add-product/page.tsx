import Container from "@/components/ui/container";
import CreateProduct from "./_components/create-product-form";
import Variants from "./_components/variants";

const ProductsPage = () => {
  return (
    <Container className="py-10">
      <div className="w-full mb-3 border rounded-xl p-3">
        <h3 className="text-lg font-semibold">Add Product</h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <CreateProduct />
        <Variants />
      </div>
    </Container>
  );
};

export default ProductsPage;
