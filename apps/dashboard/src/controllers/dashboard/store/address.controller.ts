import { ApiError } from "@repo/express-middleware";
import type { Request, Response } from "express";
import { saveAddress, updateAddressService } from "../../../services/dashboard/store/save-address.service";
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
      data,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(error.message, { status: 400, errors: error });
    }
  }
};

export const updateAddressController = async (req: Request, res: Response) => {
  const body = req.body;
  const userId = req.headers["x-user-id"] as string;
  const id = req.params.id!;

  if (!userId) {
    throw new ApiError("Unauthorized Access", { status: 403 });
  }

  try {
    const data = await updateAddressService({ userId, id, body })
    return res.status(200).json({
      message: "Address save successfully",
      success: true,
      data,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(error.message, { status: 400, errors: error });
    }
  }


}
