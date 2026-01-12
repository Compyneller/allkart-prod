import { Request, Response } from "express";
import { variantsService } from "../../services/everyone/variants.service";
import { ApiError } from "@repo/express-middleware";


export const variantsController = async (req: Request, res: Response) => {

    const id = parseInt(req.query.id as string)

    try {
        const response = await variantsService(id)
        return res.status(200).json({
            success: true,
            data: response
        })
    } catch (error) {
        if (error instanceof Error) {
            throw new ApiError(error.message, { status: 400 })
        }
        throw new ApiError("Something went wrong", { status: 500 })
    }
}