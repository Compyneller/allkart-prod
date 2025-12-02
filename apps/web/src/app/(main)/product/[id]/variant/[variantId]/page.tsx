import Container from "@/components/ui/container";
import ProductDetail from "./_components/product-detail";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string; variantId: string }>;
}) {
  const { id, variantId } = await params;

  return (
    <Container className="py-10">
      <ProductDetail id={Number(id)} variantId={variantId} />
    </Container>
  );
}
