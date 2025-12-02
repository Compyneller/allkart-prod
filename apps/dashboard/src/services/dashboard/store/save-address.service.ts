import { prisma } from "@repo/db";
import { ApiError } from "@repo/express-middleware";
import { StoreAddressSchema } from "@repo/schema";
import { StoreAddressTypes } from "@repo/types";
import z from "zod";

export const saveAddress = async ({
  body,
  userId,
}: {
  body: StoreAddressTypes;
  userId: string;
}) => {
  try {
    const parsedBody = StoreAddressSchema.safeParse(body);
    console.log(parsedBody.data);

    if (parsedBody.error) {
      throw new ApiError("validation error", {
        status: 422,
        errors: z.treeifyError(parsedBody.error),
      });
    }

    const data = prisma.address.create({
      data: {
        ...parsedBody.data,

        userId: userId,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateAddressService = async ({
  body,
  userId,
  id,
}: {
  body: Partial<StoreAddressTypes>;
  userId: string;
  id: string;
}) => {
  try {
    console.log(body);

    const parsedBody = StoreAddressSchema.partial().safeParse(body);
    if (!parsedBody.success) {
      throw new ApiError("validation error", {
        status: 422,
        errors: z.treeifyError(parsedBody.error),
      });
    }

    const data = await prisma.address.update({
      where: {
        id: id,
        userId: userId,
      },
      data: {
        ...parsedBody.data,
      },
    });

    return data;
  } catch (error) {
    throw error;
  }
};
