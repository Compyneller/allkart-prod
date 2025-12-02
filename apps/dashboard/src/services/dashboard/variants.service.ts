import { prisma } from "@repo/db";
import { variantSchema } from "@repo/schema";
import { ProductVariant } from "@repo/types";

export const getVariantsService = async ({ pid }: { pid: number }) => {
  const res = await prisma.variants.findMany({
    where: {
      productId: pid,
    },
    include: {
      prod_img: true,
      Product: true,
    },
  });

  return res;
};

export const deleteVariantService = async ({
  vid,
}: {
  vid: string;
}): Promise<any> => {
  const res = await prisma.variants.delete({
    where: {
      id: vid,
    },
  });

  return res;
};

export const createVariantService = async ({
  data,
  pid,
}: {
  data: ProductVariant;
  pid: number;
}): Promise<{ id: string }> => {
  console.log(data, pid);

  const parsedData = variantSchema.safeParse(data);
  if (parsedData.error) {
    throw new Error(parsedData.error.message);
  }
  const res = await prisma.variants.create({
    data: {
      mrp: parsedData.data.mrp,
      selling_price: parsedData.data.selling_price,
      sku: parsedData.data.sku,
      stock: parsedData.data.stock,
      unit: parsedData.data.unit,
      unit_value: parsedData.data.unit_value,
      productId: pid,
      prod_img: {
        create: parsedData.data.prod_img.map((img) => {
          return {
            url: img.url,
            publicId: img.publicId,
            original_filename: img.original_filename,
            bytes: img.bytes,
          };
        }),
      },
    },
    select: {
      id: true,
    },
  });

  return res;
};

export const updateVariantService = async ({
  data,
  pid,
  vid,
}: {
  data: Partial<ProductVariant>;
  pid: number;
  vid: string;
}) => {
  // 1. Validate data
  const parsedData = variantSchema.partial().safeParse(data);
  if (parsedData.error) {
    throw new Error(parsedData.error.message);
  }

  const { prod_img, ...rest } = parsedData.data;

  // 2. Perform the Update
  const res = await prisma.variants.update({
    where: {
      id: vid, // You usually only need the unique ID (vid)
      productId: pid, // Adding this adds an extra safety check
    },
    data: {
      ...rest, // Update scalar fields (price, stock, etc.)

      // Handle Images
      ...(prod_img && {
        prod_img: {
          // STEP A: Delete all existing images for this variant
          // This is cleaner than 'set: []' for required relations
          deleteMany: {},

          // STEP B: Create the new list of images
          create: prod_img.map((img) => ({
            url: img.url,
            publicId: img.publicId,
            // 👇 You MUST map these new fields you added,
            // or they won't be saved to the DB!
            original_filename: img.original_filename || "default",
            bytes: img.bytes || 0,
          })),
        },
      }),
    },
    select: {
      id: true,
    },
  });

  return res;
};
