import type { Request, Response } from "express";
import { ApiError } from "@repo/express-middleware";
import { createRazorpayAccountService } from "../../services/payment/create-razorpay-account.service";
import { prisma } from "@repo/db";

export const createRazorpayAccountController = async (
  req: Request,
  res: Response
) => {
  const userId = req.headers["x-user-id"] as string;

  const storeId = req.params.id;

  {
    try {
      //   const response = await createRazorpayAccountService();
      //   await prisma.store.update({
      //     where: {
      //       id: Number(storeId),
      //       userId: userId,
      //     },
      //     data: {
      //       razorpayAccountId: response.id,
      //     },
      //   });
      //   res.status(200).json({
      //     success: true,
      //     data: response,
      //   });
    } catch (error) {
      if (error instanceof Error) {
        throw new ApiError(error.message, { status: 500 });
      }
      throw new ApiError("Failed to create razorpay account", { status: 500 });
    }
  }
};
