import type { Request, Response } from "express";
import { ApiError } from "@repo/express-middleware";
import { getAllProductService } from "../services/all-products.service";
import { getProductRelatedToCategoryService } from "../services/create-product.service";

export const getAllProductsController = async (req: Request, res: Response) => {
  try {
    const response = await getAllProductService();

    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(error.message, { status: 500 });
    }
    throw new ApiError("Failed to fetch products", { status: 500 });
  }
};

export const getProductRelatedToCategoryController = async (
  req: Request,
  res: Response
) => {
  const categoryId = req.params.id;
  try {
    const data = await getProductRelatedToCategoryService(categoryId!);
    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(error.message, { status: 500 });
    }
    throw new ApiError("Failed to fetch products", { status: 500 });
  }
};
