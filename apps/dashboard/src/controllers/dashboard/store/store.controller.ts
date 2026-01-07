import type { NextFunction, Request, Response } from "express";
import {
  createStoreService,
  deleteStoreService,
  getStoreService,
  updateStoreService,
} from "../../../services/dashboard/store/store.service";
import { ApiError } from "@repo/express-middleware";
import { StoreTypes } from "@repo/types";
import { completeStoreCreationSchema } from "@repo/schema";
import z from "zod";

export const getStoreController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.headers["x-user-id"];
  const userRole = req.headers["x-user-role"];
  if (!userId) {
    throw new ApiError("Forbidden Access", { status: 403 });
  }

  if (userRole === "user") {
    throw new ApiError("Forbidden Access", { status: 403 });
  }
  try {
    const storeData = await getStoreService(userId as string);

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

export const createStoreController = async (req: Request, res: Response) => {
  const userId = req.headers["x-user-id"] as string;
  const userEmail = req.headers["x-user-email"];

  const body = req.body;


  if (!userId) {
    throw new ApiError("Forbidden Access", { status: 403 });
  }


  try {
    const parsedBody = completeStoreCreationSchema.safeParse(body);
    if (parsedBody.error) {
      throw new ApiError("Validation Error", {
        status: 400,
        errors: z.treeifyError(parsedBody.error),
      });
    }
    const store = await createStoreService({
      body: parsedBody.data,
      userId,
      userEmail: userEmail as string,
    });

    res.status(200).json({
      message: "Store created",
      success: true,
      data: store,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const updateStoreController = async (req: Request, res: Response) => {
  const userId = req.headers["x-user-id"] as string;
  const userRole = req.headers["x-user-role"];
  const storeId = Number(req.params.id!);

  if (!userId) {
    throw new ApiError("Forbidden Access", { status: 403 });
  }

  if (userRole === "user") {
    throw new ApiError("Forbidden Access", { status: 403 });
  }
  const body: StoreTypes = req.body;




  try {
    const status = await updateStoreService({ body, storeId, userId });

    res.status(200).json({
      message: "Done",
      success: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(error.message, { status: 500 });
    }
    throw error;
  }
};

export const deleteStoreController = async (req: Request, res: Response) => {
  const userId = req.headers["x-user-id"] as string;
  const userRole = req.headers["x-user-role"];
  const storeId = Number(req.params.id!);

  if (!userId) {
    throw new ApiError("Forbidden Access", { status: 403 });
  }

  if (userRole === "user") {
    throw new ApiError("Forbidden Access", { status: 403 });
  }

  try {
    const status = await deleteStoreService({ storeId, userId });

    res.status(200).json({
      message: "Store deleted",
      success: true,
      data: status,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(error.message, { status: 500 });
    }
    throw error;
  }
};
