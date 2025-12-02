import { ApiError } from "@repo/express-middleware";
import type { Request, Response } from "express";
import { deleteAllImagesService, deleteSingleImageService } from "../../services/delete-image.service";


export const deleteImageController = async (req: Request, res: Response) => {
  const public_id = req.body.id;
  const userId = req.headers["x-user-id"] as string;
  const userRole = req.headers["x-user-role"] as string;

  if (!userId) {
    throw new ApiError("Unauthorized access", { status: 400 });
  }

  if (userRole === "user") {
    throw new ApiError("Unauthorized access", { status: 400 });
  }

  if (!public_id) {
    throw new ApiError("No public_id provided.", { status: 400 });
  }

  try {
    await deleteSingleImageService({ public_id });
    return res.json({ success: true, message: "Image deleted." });
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(error.message, { status: 400 });
    }
  }
};

export const deleteAllImagesController = async (
  req: Request,
  res: Response
) => {
  const userId = req.headers["x-user-id"] as string;
  const userRole = req.headers["x-user-role"] as string;

  if (!userId) {
    throw new ApiError("Unauthorized access", { status: 400 });
  }

  if (userRole === "user") {
    throw new ApiError("Unauthorized access", { status: 400 });
  }
  const publicIds: string[] = req.body.ids;

  if (!publicIds || !Array.isArray(publicIds) || publicIds.length === 0) {
    throw new ApiError("No public_ids provided.", { status: 400 });
  }

  try {
    await deleteAllImagesService({ publicIds });
    return res.json({ success: true, message: "Images deleted." });
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(error.message, { status: 400 });
    }
  }

};
