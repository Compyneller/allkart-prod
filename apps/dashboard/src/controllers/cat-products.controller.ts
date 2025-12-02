import type { Request, Response } from "express";
import { getCategoriesWithProductsService } from "../services/admin/category.service";
import { ApiError } from "@repo/express-middleware";

export const getCategoriesWithProductsController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await getCategoriesWithProductsService();
    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(error.message, { status: 500 });
    }
    throw new ApiError("Failed to fetch cart items", { status: 500 });
  }
};
