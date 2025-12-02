import Container from "@/components/ui/container";
import VariantLayout from "./_components/variant-layout";

const VariantsPage = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const { id } = await params;

  return (
    <Container className="py-10">
      <VariantLayout id={Number(id)} />
    </Container>
  );
};

export default VariantsPage;
