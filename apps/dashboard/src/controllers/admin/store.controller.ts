import { ApiError } from "@repo/express-middleware";
import type { NextFunction, Request, Response } from "express";
import { getStoreService } from "../../services/admin/store.service";

export const getStoreController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const userRole = req.headers["x-user-role"];

  if (!id) {
    throw new ApiError("Forbidden Access", { status: 403 });
  }

  if (userRole !== "admin") {
    throw new ApiError("Forbidden Access", { status: 403 });
  }
  try {
    const storeData = await getStoreService({ id });

    res.status(200).json({
      data: storeData,
      success: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(error.message, { status: 400 });
    }

    next(error);
  }
};
