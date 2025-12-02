import { ApiError } from "@repo/express-middleware";
import type { Request, Response } from "express";
import {
  deleteAddressService,
  getAddressService,
  saveAddress,
  updateAddressService,
} from "../../services/user/save-address.service";
export const addressController = async (req: Request, res: Response) => {
  const body = req.body;
  const userId = req.headers["x-user-id"] as string;

  if (!userId) {
    throw new ApiError("Unauthorized Access", { status: 403 });
  }

  try {
    const data = await saveAddress({ body, userId });
    return res.status(200).json({
      message: "Address save successfully",
      success: true,
      data: data,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(error.message, { status: 400 });
    }
  }
};
export const updateAddressController = async (req: Request, res: Response) => {
  const body = req.body;
  const userId = req.headers["x-user-id"] as string;
  const { id } = req.params;

  if (!userId) {
    throw new ApiError("Unauthorized Access", { status: 403 });
  }

  try {
    const data = await updateAddressService({ body, userId, id: id! });
    return res.status(200).json({
      message: "Address update successfully",
      success: true,
      data: data,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(error.message, { status: 400 });
    }
  }
};

export const getAddressController = async (req: Request, res: Response) => {
  const userId = req.headers["x-user-id"] as string;

  if (!userId) {
    throw new ApiError("Unauthorized Access", { status: 403 });
  }

  try {
    const data = await getAddressService({ userId });
    return res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(error.message, { status: 400 });
    }
  }
};
export const deleteAddressController = async (req: Request, res: Response) => {
  const userId = req.headers["x-user-id"] as string;
  const { id } = req.params;

  if (!userId) {
    throw new ApiError("Unauthorized Access", { status: 403 });
  }

  try {
    const data = await deleteAddressService({ id: id! });
    return res.status(200).json({
      success: true,
      data: data,
      message: "Address deleted successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(error.message, { status: 400 });
    }
  }
};
