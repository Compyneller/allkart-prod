import { prisma } from "@repo/db";
import { ProductResponseType } from "@repo/types";

export const getAllProductService = async (): Promise<any[]> => {
  const response = await prisma.variants.findMany({
    include: {
      Product: true,
      prod_img: true,
    },
  });
  console.log(response);

  return response;
};
