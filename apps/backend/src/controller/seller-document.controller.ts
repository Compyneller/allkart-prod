import { ApiError } from "@repo/express-middleware";
import type { NextFunction, Request, Response } from "express";
import { sellerDocumentService } from "../services/seller-document.service";
import { sellerFormSchema } from "@repo/schema";
import z from "zod";
export const sellerDocumentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.headers["x-user-id"] as string;

  if (!userId) {
    throw new ApiError("Unauthorized Access", { status: 403 });
  }
  const body = req.body;

  const parsedBody = sellerFormSchema.safeParse(body);

  if (parsedBody.error) {
    const formattedErrors = z.flattenError(parsedBody.error);
    throw new ApiError("validation error", {
      status: 422,
      errors: formattedErrors,
    });
  }
  try {
    const data = await sellerDocumentService({
      body: parsedBody.data,
      userId: userId,
    });

    return res.status(201).json({
      message: "Document submitted successfully",
      data: data,
    });
  } catch (error) {
    if (error instanceof Error)
      throw new ApiError(error.message, { status: 400 });
  }
};
