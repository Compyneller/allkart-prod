import { ApiError } from "@repo/express-middleware";
import type { Request, Response } from "express";
import { getSellerDocService } from "../../services/admin/seller-doc.service";

export const getSellerDocController = async (req: Request, res: Response) => {
  const userRole = req.headers["x-user-role"];
  if (userRole != "admin") {
    throw new ApiError("Forbidden access", {
      status: 400,
    });
  }

  try {
    const users = await getSellerDocService();

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error: any) {
    if (error instanceof Error) {
      throw new ApiError(error.message, { status: 400 });
    }
  }
};
