import { userdb } from "@repo/auth-db";
import { ApiError } from "@repo/express-middleware";
import { addressSchema } from "@repo/schema";
import { addressTypes } from "@repo/types";
import z from "zod";
export const saveAddress = async ({
  body,
  userId,
}: {
  body: addressTypes;
  userId: string;
}) => {
  const parsedBody = z.safeParse(addressSchema, body);

  if (parsedBody.error) {
    throw new ApiError("validation error", {
      status: 422,
      errors: z.treeifyError(parsedBody.error),
    });
  }

  const data = userdb.address.create({
    data: {
      ...parsedBody.data,
      userId: userId,
    },
  });

  return data;
};
export const getAddressService = async ({ userId }: { userId: string }) => {
  const data = userdb.address.findMany({
    where: {
      userId: userId,
    },
  });

  return data;
};

export const deleteAddressService = async ({ id }: { id: string }) => {
  const data = userdb.address.delete({
    where: {
      id: id,
    },
  });
  return data;
};

export const updateAddressService = async ({
  body,
  userId,
  id,
}: {
  body: addressTypes;
  userId: string;
  id: string;
}) => {
  const parsedBody = addressSchema.partial().safeParse(body);

  if (parsedBody.error) {
    throw new ApiError("validation error", {
      status: 422,
      errors: z.treeifyError(parsedBody.error),
    });
  }

  const data = userdb.address.update({
    where: {
      id: id,
      userId: userId,
    },
    data: {
      ...parsedBody.data,
    },
  });

  return data;
};
