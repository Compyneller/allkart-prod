import type { Request, Response } from "express";

import { ApiError } from "@repo/express-middleware";
import { changeUserRoleService } from "../services/change-user-role.service";
export const changeUserRoleController = async (req: Request, res: Response) => {
  const userId = req.headers["x-user-id"] as string;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "Forbidden access",
    });
  }

  try {
    const data = await changeUserRoleService({ userId });

    res.status(200).json({
      data: data,
      success: true,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      throw new ApiError(error.message, { status: 400 });
    }
  }
};
