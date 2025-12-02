import type { Request, Response } from "express";
import { ApiError } from "@repo/express-middleware";
import { paymentService } from "../../services/payment/payment.service";


export const paymentController = async (req: Request, res: Response) => {
    const userId = req.headers["x-user-id"] as string;

    {
        try {
            const response = await paymentService({ userId });

            res.status(200).json({
                success: true,
                data: response,
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new ApiError(error.message, { status: 500 });
            }
            throw new ApiError("Failed to fetch products", { status: 500 });
        }
    };
}