import type { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { ApiError } from "@repo/express-middleware";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export const generateUploadSignatureController = async (
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

  const timestamp = Math.round(new Date().getTime() / 1000);
  const folder = `${userId}`; // Define folder name
  // Set parameters to sign
  const params_to_sign = {
    timestamp: timestamp,
    // You can add other parameters here, like a folder
    folder: folder,
  };

  try {
    // Get the API secret from your environment
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    // Create the signature
    const signature = cloudinary.utils.api_sign_request(
      params_to_sign,
      apiSecret!
    );

    res.json({
      signature: signature,
      timestamp: timestamp,
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName: process.env.CLOUDINARY_NAME,
      folder: folder,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(`${error.message}`, {
        status: 400,
      });
    }
  }
};
