import { prisma } from "@repo/db";

export const getSellerDocService = async () => {
  const data = await prisma.sellerDocuments.findMany();

  return data;
};
