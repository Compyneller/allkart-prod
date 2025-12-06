import { ApiError } from "@repo/express-middleware";
import type { Request, Response } from "express";
import { getSellerDocService } from "../../services/admin/seller-doc.service";

export const getSellerDocController = async (req: Request, res: Response) => {
  const userRole = req.headers["x-user-role"] as string;
  const { id } = req.params;

  if (userRole !== "admin") {
    throw new ApiError("Unauthorized access", { status: 400 });
  }

  try {
    const docs = await getSellerDocService({ id: id! });
    return res.status(200).json({
      success: true,
      data: docs,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(error.message, { status: 500 });
    }
    throw new ApiError("Failed to fetch seller documents", { status: 500 });
  }
};
