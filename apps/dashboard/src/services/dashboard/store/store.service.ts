import { prisma } from "@repo/db";
import { ApiError } from "@repo/express-middleware";
import { CompleteStoreCreationType, storeUpdateSchema } from "@repo/schema";
import { ProductType, StoreTypes } from "@repo/types";
import z from "zod";
import { deleteAllImagesService } from "../../delete-image.service";
import { createRazorpayAccountService } from "../../payment/create-razorpay-account.service";

export const createStoreService = async ({
  body,
  userId,
  userEmail,
}: {
  body: CompleteStoreCreationType;
  userId: string;
  userEmail: string;
}) => {
  try {
    const response = await prisma.$transaction(async (tsx) => {
      const storeData = await tsx.store.create({
        data: {
          ...body.storeDetails,
          userId: userId,
          address: {
            create: {
              ...body.addressDetails,
              userId: userId,
            },
          },
        },
        include: {
          category: {
            select: {
              name: true,
            },
          },
        },
      });

      const sellerDoc = await tsx.sellerDocuments.create({
        data: {
          ...body.kycDetails,
          storeId: storeData.id,
          userId: userId,
        },
      });

      const bankDetails = await tsx.bankDetail.create({
        data: {
          ...body.bankDetails,
          storeId: storeData.id,
          userId: userId,
        },
      });

      return { storeData, sellerDoc, bankDetails };
    });

    // if (response) {
    //   const rzres = await createRazorpayAccountService({
    //     userEmail: userEmail,
    //     data: body,
    //     category: response?.storeData?.category?.name!,
    //   });

    //   console.log(rzres);
    // }

    return response;
  } catch (error) {
    throw error;
  }
};

export const getStoreService = async (userId: string) => {
  try {
    const storeData = await prisma.store.findMany({
      orderBy: {
        id: "asc",
      },
      where: {
        userId: userId,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        address: true,
      },
    });

    return storeData;
  } catch (error) {
    throw error;
  }
};

export const deleteStoreService = async ({
  storeId,
  userId,
}: {
  storeId: number;
  userId: string;
}) => {
  try {
    const storeData = await prisma.product.findMany({
      where: {
        storeId: storeId,
        userId: userId,
      },
      select: {
        variants: {
          select: {
            prod_img: {
              select: {
                publicId: true,
              },
            },
          },
        },
      },
    });

    if (storeData.length === 0) {
      await prisma.store.delete({
        where: {
          id: storeId,
          userId: userId,
        },
      });
      return;
    }

    const publicIds = storeData.map((product) => {
      return product.variants.map((variant) => {
        return variant.prod_img.map((img) => img.publicId);
      });
    });

    const publicIdsArray = publicIds.flat().flat();

    await deleteAllImagesService({ publicIds: publicIdsArray });

    await prisma.store.delete({
      where: {
        id: storeId,
        userId: userId,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const updateStoreService = async ({
  body,
  storeId,
  userId,
}: {
  body: StoreTypes;
  storeId: number;
  userId: string;
}) => {
  try {
    const parsedBody = storeUpdateSchema.safeParse(body);
    if (!parsedBody.success) {
      throw new ApiError("Validation Error", {
        status: 422,
        errors: z.flattenError(parsedBody.error),
      });
    }
    const storeData = await prisma.store.update({
      where: {
        id: storeId,
        userId: userId,
      },
      data: {
        ...parsedBody.data,
      },
    });

    return storeData;
  } catch (error) {
    throw error;
  }
};
