import { ApiError } from "@repo/express-middleware";
import type { Request, Response } from "express";
import { addToCartService, decrementCartService, getCartService } from "../services/cart.service";


export const AddToCartController = async (req: Request, res: Response) => {
  const userId = req.headers["x-user-id"] as string;
  const { productId, variantId } = req.body;

  if (!userId) {
    throw new ApiError("Unauthorized access", { status: 400 });
  }
  try {
    const response = await addToCartService({ userId, productId, variantId });
    res.status(200).json({
      success: true,
      data: response,
      message: "Product added to cart successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(error.message, { status: 500 });
    }
    throw new ApiError("Failed to add product to cart", { status: 500 });
  }
};
export const DecrementCartController = async (req: Request, res: Response) => {
  const userId = req.headers["x-user-id"] as string;
  const { productId, variantId } = req.body;

  if (!userId) {
    throw new ApiError("Unauthorized access", { status: 400 });
  }
  try {
    const response = await decrementCartService({ userId, productId, variantId });
    res.status(200).json({
      success: true,
      data: response,
      message: "Product added to cart successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(error.message, { status: 500 });
    }
    throw new ApiError("Failed to add product to cart", { status: 500 });
  }
};

export const getCartController = async (req: Request, res: Response) => {
  const userId = req.headers["x-user-id"] as string;
  if (!userId) {
    throw new ApiError("Unauthorized access", { status: 400 });
  }

  try {
    const response = await getCartService(userId);
    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(error.message, { status: 500 });
    }
    throw new ApiError("Failed to fetch cart items", { status: 500 });
  }
};
