import { Request, Response } from "express";
import { getStoreDetailService } from "../../services/everyone/store-detail.service";
import { ApiError } from "@repo/express-middleware";

export const getStoreDetailController = async (req: Request, res: Response) => {

    const { id } = req.params

    try {
        const response = await getStoreDetailService(Number(id))

        return res.status(200).json({
            data: response,
            message: "Store Products",
            success: true

        })
    } catch (error) {
        if (error instanceof Error) {
            throw new ApiError(error.message, { status: 400 })
        }
        throw new ApiError("Something went wrong", { status: 500 })
    }

}