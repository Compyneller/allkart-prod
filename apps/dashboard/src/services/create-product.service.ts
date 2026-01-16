import { prisma } from "@repo/db";
import { ApiError } from "@repo/express-middleware";
import {
  productEditSchema,
  ProductEditType,
  productSubmissionSchema,
} from "@repo/schema";
import { ProductType } from "@repo/types";
import z from "zod";

export const createProductService = async (
  data: ProductType,
  userId: string
) => {
  const validatedData = productSubmissionSchema.safeParse(data);

  if (validatedData.error) {
    throw new Error(validatedData.error.message);
  }
  const res = await prisma.product.create({
    data: {
      title: validatedData.data.title,
      description: validatedData.data.description,
      categoryId: validatedData.data.categoryId,
      storeId: Number(validatedData.data.storeId),
      userId: userId,
      variants: {
        create: validatedData.data.variants.map((variant) => ({
          selling_price: Number(variant.selling_price),
          mrp: Number(variant.mrp),
          unit: variant.unit,
          unit_value: variant.unit_value,
          stock: Number(variant.stock),

          sku: variant.sku,
          prod_img: {
            create: variant.prod_img.map((img) => ({
              ...img,
            })),
          },
        })),
      },
    },
  });

  return res;
};

export const getProductsService = async (
  userId: string
): Promise<ProductType[]> => {
  const products = await prisma.product.findMany({
    orderBy: {
      id: "asc",
    },
    where: {
      userId: userId,
    },
    include: {
      // Include variants and their images
      variants: { include: { prod_img: true } },
      Store: true,
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return products;
};

export const deleteProductService = async (
  productId: number,
  userId: string
) => {
  const res = await prisma.product.delete({
    where: {
      id: productId,
      userId: userId,
    },
  });
  return res;
};

export const productDetailService = async (
  productId: number,
  variantId: string
) => {
  const product = await prisma.variants.findFirst({
    where: {
      id: variantId,
      Product: {
        id: productId,
      },
    },
    include: {
      prod_img: true,
      Product: {
        include: {
          variants: true,
          Store: true,
        },
      },
    },
  });

  return product;
};

export const getProductRelatedToCategoryService = async (
  categoryId: string
) => {
  const products = await prisma.product.findMany({
    where: {
      categoryId: categoryId,
    },
    select: {
      id: true,
      title: true,

      // 1. GET THE COUNT (Super fast, no object fetching)
      _count: {
        select: { variants: true }
      },

      // 2. GET ONLY THE "DISPLAY" VARIANT
      variants: {
        where: { stock: { gt: 0 } },
        orderBy: { selling_price: 'asc' }, // Show the "Starting at" price
        take: 1, // <--- Only fetch ONE
        select: {
          id: true,
          selling_price: true,
          mrp: true,
          unit: true,       // "kg", "size"
          unit_value: true, // "1", "XL"
          prod_img: {
            take: 1, // Only fetch ONE image
            select: { url: true }
          }
        }
      }
    }
  });

  return products;
};

export const updateProductService = async ({
  data,
  pid,
}: {
  data: ProductEditType;
  pid: number;
}) => {
  const parsedData = productEditSchema.partial().safeParse(data);
  if (parsedData.error) {
    throw new ApiError("Validation Error", {
      status: 500,
      errors: z.flattenError(parsedData.error).fieldErrors,
    });
  }

  const res = await prisma.product.update({
    where: {
      id: Number(pid),
    },
    data: {
      ...parsedData.data,
    },
  });

  return res;
};
