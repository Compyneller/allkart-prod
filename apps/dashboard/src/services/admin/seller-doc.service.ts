import { prisma } from "@repo/db";

export const getSellerDocService = async ({ id }: { id: string }) => {
  const docs = await prisma.sellerDocuments.findFirst({
    where: {
      userId: id,
    },
  });
  return docs;
};
