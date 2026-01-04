import Container from "@/components/ui/container";
import ProductLayout from "./_components/product-layout";

const Products = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = await params;

    return (
        <div>
            <ProductLayout id={Number(id?.id)} />
        </div>
    );
};

export default Products;
