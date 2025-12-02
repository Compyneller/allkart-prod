import type { Response, Request } from "express";
import {
  createVariantService,
  deleteVariantService,
  getVariantsService,
  updateVariantService,
} from "../../services/dashboard/variants.service";
import { ApiError } from "@repo/express-middleware";
export const getVariantsController = async (req: Request, res: Response) => {
  const pid = req.params.pid;

  try {
    const data = await getVariantsService({ pid: Number(pid) });
    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(error.message, { status: 500 });
    }
    throw new ApiError("Failed to fetch products", { status: 500 });
  }
};

export const deleteVariantController = async (req: Request, res: Response) => {
  const vid = req.params.vid!;

  try {
    const data = await deleteVariantService({ vid });
    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(error.message, { status: 500 });
    }
    throw new ApiError("Failed to fetch products", { status: 500 });
  }
};

export const createVariantController = async (req: Request, res: Response) => {
  const { pid, data } = req.body;
  const userId = req.headers["x-user-id"] as string;
  const userRole = req.headers["x-user-role"] as string;

  if (!userId) {
    throw new ApiError("Unauthorized access", { status: 400 });
  }

  if (userRole === "user") {
    throw new ApiError("Unauthorized access", { status: 400 });
  }

  try {
    const response = await createVariantService({ data, pid: Number(pid) });

    return res.status(200).json({
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
export const updateVariantController = async (req: Request, res: Response) => {
  const { pid, data } = req.body;
  const vid = req.params.vid!;
  const userId = req.headers["x-user-id"] as string;
  const userRole = req.headers["x-user-role"] as string;

  if (!userId) {
    throw new ApiError("Unauthorized access", { status: 400 });
  }

  if (userRole === "user") {
    throw new ApiError("Unauthorized access", { status: 400 });
  }

  try {
    const response = await updateVariantService({
      data,
      pid: Number(pid),
      vid,
    });

    return res.status(200).json({
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
