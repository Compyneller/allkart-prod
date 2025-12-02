import { prisma } from "@repo/db";
import { ApiError } from "@repo/express-middleware";
import { categorySchema } from "@repo/schema";
import { CategoryType, ProductType } from "@repo/types";
import z from "zod";

export const createCategoryService = async ({
  body,
  userId,
}: {
  body: CategoryType;
  userId: string;
}) => {

  const parsedData = categorySchema.safeParse(body)

  if (!parsedData.success) {
    throw new ApiError("Validation Error", {
      status: 400,
      errors: z.treeifyError(parsedData.error),
    })
  }

  const response = await prisma.category.create({
    data: {
      ...parsedData.data,
      userId,
    },
  });
  return response;
};



export const deleteCategoryService = async ({ id }: { id: string }) => {
  const response = await prisma.category.delete({
    where: {
      id: id,
    },
  });
  return response;
};

export const getCategoriesWithProductsService = async (): Promise<
  CategoryType[]
> => {
  const response = await prisma.category.findMany({
    include: {
      products: {
        take: 8,
        include: {
          variants: {
            include: {
              prod_img: true,
            },
          },
        },
      },
    },
  });
  return response;
};
