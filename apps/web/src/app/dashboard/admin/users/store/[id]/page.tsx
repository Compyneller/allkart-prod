import Container from "@/components/ui/container";
import StoreLayout from "./_components/store-layout";

const StorePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <Container>
      <StoreLayout id={id} />
    </Container>
  );
};

export default StorePage;
