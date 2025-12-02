import { ApiError } from "@repo/express-middleware";
import { getCategoriesService } from "../../services/everyone/category.service";
import type { Request, Response } from "express";
export const getCategoriesController = async (req: Request, res: Response) => {


    try {
        const data = await getCategoriesService();
        return res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        if (error instanceof Error) {
            throw new ApiError(error.message, { status: 500 });
        }
        throw new ApiError("Failed to create category", { status: 500 });
    }
};
