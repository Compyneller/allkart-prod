import { userdb } from "@repo/auth-db";
import { ApiError } from "@repo/express-middleware";
import { sellerDocumentsType } from "@repo/types";
export const sellerDocumentService = async ({
  body,
  userId,
}: {
  body: sellerDocumentsType;
  userId: string;
}) => {
  // try {
  //   const data = await userdb.sellerDocuments.create({
  //     data: {
  //       ...body,
  //       userId: userId,
  //     },
  //   });

  //   return data;
  // } catch (error) {
  //   if (error instanceof Prisma.PrismaClientKnownRequestError) {
  //     if (error.code === "P2002") {
  //       throw new ApiError("Document already exists", {
  //         status: 401,
  //       });
  //     }
  //   }
  // }

  return "hello";
};
