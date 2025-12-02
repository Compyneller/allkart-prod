import { ApiError } from "@repo/express-middleware";
import type { Request, Response } from "express";
import {
  createCategoryService,
  deleteCategoryService
} from "../../services/admin/category.service";

export const createCategoryController = async (req: Request, res: Response) => {
  const body = req.body;
  const userId = req.headers["x-user-id"] as string;
  const userRole = req.headers["x-user-role"] as string;

  if (userRole !== "admin") {
    throw new ApiError("Unauthorized access", { status: 400 });
  }

  if (!userId) {
    throw new ApiError("Unauthorized access", { status: 400 });
  }

  try {
    const data = createCategoryService({ body, userId });

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(error.message, { status: 500 });
    }
    throw new ApiError("Failed to create category", { status: 500 });
  }
};


export const deleteCategoryController = async (req: Request, res: Response) => {
  const id = req.params.id!;
  const userId = req.headers["x-user-id"] as string;
  const userRole = req.headers["x-user-role"] as string;

  if (userRole !== "admin") {
    throw new ApiError("Unauthorized access", { status: 400 });
  }

  if (!userId) {
    throw new ApiError("Unauthorized access", { status: 400 });
  }

  try {
    const data = deleteCategoryService({ id });
    return res.status(200).json({
      success: true,
      data,
      message: "Category deleted successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(error.message, { status: 500 });
    }
    throw new ApiError("Failed to create category", { status: 500 });
  }
};

