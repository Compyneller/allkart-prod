import { userdb } from "@repo/auth-db";
import { ApiError } from "@repo/express-middleware";
import type { Request, Response } from "express";

export const changeRoleController = async (req: Request, res: Response) => {
  const body = req.body;
  const role = req.headers["x-user-role"];
  console.log(body);

  if (role != "ADMIN") {
    throw new ApiError("Unauthorized Access", { status: 401 });
  }

  try {
    await userdb.user.update({
      where: {
        id: body.id,
      },
      data: {
        role: body.role,
      },
    });
    return res.status(200).json({
      success: true,
      message: "User role changed successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(error.message, { status: 400 });
    }
  }
};
