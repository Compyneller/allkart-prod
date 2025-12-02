import type { Request, Response } from "express";
import { ApiError } from "@repo/express-middleware";
import { getAllUserService } from "../../services/admin/users.service";
import { userdb } from "@repo/auth-db";

export const getAllUserController = async (req: Request, res: Response) => {
  const userRole = req.headers["x-user-role"];
  if (userRole != "admin") {
    throw new ApiError("Forbidden access", {
      status: 400,
    });
  }

  try {
    const users = await getAllUserService();

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

export const updateUserController = async (req: Request, res: Response) => {
  const id = req.params.id!;
  const body = req.body;
  const role = req.headers["x-user-role"];

  if (role != "admin") {
    throw new ApiError("Unauthorized Access", { status: 401 });
  }

  try {
    const user = await userdb.user.findUnique({
      where: {
        id: id,
      },
    });

    if (user?.role === "admin") {
      throw new ApiError("Admin cannot be updated", { status: 402 });
    }

    await userdb.user.update({
      where: {
        id: id,
      },
      data: {
        ...body,
      },
    });

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(error.message, { status: 400 });
    }
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  const id = req.params.id!;

  const role = req.headers["x-user-role"];

  if (role !== "admin") {
    throw new ApiError("Unauthorized Access", { status: 401 });
  }

  try {
    const findUser = await userdb.user.findUnique({
      where: {
        id: id,
      },
    });

    if (findUser?.role === "admin") {
      throw new ApiError("Admin cannot be deleted", { status: 402 });
    }

    await userdb.user.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(error.message, { status: 400 });
    }
  }
};
