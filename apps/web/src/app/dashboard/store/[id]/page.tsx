import { NoProduct } from "@/components/product/no-product";
import Container from "@/components/ui/container";

const Products = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = await params;

  return (
    <Container>
      <div className="w-full border rounded-xl p-3">
        <h3 className="text-2xl font-semibold">Add Product</h3>
      </div>
      <NoProduct />
    </Container>
  );
};

export default Products;
