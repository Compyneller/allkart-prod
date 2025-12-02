import { ApiError } from "@repo/express-middleware";
import type { Request, Response } from "express";
import {
  createProductService,
  deleteProductService,
  getProductsService,
  productDetailService,
  updateProductService,
} from "../services/create-product.service";
export const createProductController = async (req: Request, res: Response) => {
  const body = req.body;
  const userId = req.headers["x-user-id"] as string;

  if (!userId) {
    throw new ApiError("Unauthorized access", { status: 400 });
  }

  try {
    const dbResponse = await createProductService(body, userId);
    res.status(201).json({ success: true, data: dbResponse });
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(error.message, { status: 500 });
    }
    throw new ApiError("Failed to create product", { status: 500 });
  }
};

export const getProductsController = async (req: Request, res: Response) => {
  const userId = req.headers["x-user-id"] as string;
  const userRole = req.headers["x-user-role"] as string;

  if (!userId) {
    throw new ApiError("Unauthorized access", { status: 400 });
  }

  if (userRole === "user") {
    throw new ApiError("Unauthorized access", { status: 400 });
  }
  try {
    const dbResponse = await getProductsService(userId);
    res.status(200).json({ success: true, data: dbResponse });
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(error.message, { status: 500 });
    }

    throw new ApiError("Failed to fetch products", { status: 500 });
  }
};

export const deleteProductController = async (req: Request, res: Response) => {
  const userId = req.headers["x-user-id"] as string;
  const productId = Number(req.params.productId);
  if (!userId) {
    throw new ApiError("Unauthorized access", { status: 400 });
  }

  try {
    const dbResponse = await deleteProductService(productId, userId);
    res.status(200).json({
      success: true,
      data: dbResponse,
      message: "Product deleted successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(error.message, { status: 500 });
    }
    throw new ApiError("Failed to delete product", { status: 500 });
  }
};

export const productDetailController = async (req: Request, res: Response) => {
  const productId = Number(req.params.productId);
  const variantId = req.params.variantId;

  try {
    const dbResponse = await productDetailService(productId, variantId!);
    res.status(200).json({ success: true, data: dbResponse });
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(error.message, { status: 500 });
    }

    throw new ApiError("Failed to fetch product details", { status: 500 });
  }
};

export const updateProductController = async (req: Request, res: Response) => {
  const pid = Number(req.params.id);
  const data = req.body;
  const userId = req.headers["x-user-id"] as string;
  const userRole = req.headers["x-user-role"] as string;

  if (!userId) {
    throw new ApiError("Unauthorized access", { status: 400 });
  }

  if (userRole === "user") {
    throw new ApiError("Unauthorized access", { status: 400 });
  }

  try {
    const response = await updateProductService({ data, pid });

    return res.status(200).json({
      success: true,
      data: response,
      message: "Product updated successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(error.message, { status: 500 });
    }
    throw new ApiError("Failed to fetch product details", { status: 500 });
  }
};
