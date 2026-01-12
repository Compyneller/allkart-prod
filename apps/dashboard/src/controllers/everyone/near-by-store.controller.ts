import { Request, Response } from "express";
import { getNearByStore } from "../../services/everyone/near-by-store.service";
import { ApiError } from "@repo/express-middleware";

export const getNearByStoreController = async (req: Request, res: Response) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        throw new ApiError("Latitude and longitude are required", { status: 400 })
    }
    try {

        const stores = await getNearByStore({ latitude: latitude as unknown as number, longitude: longitude as unknown as number });
        return res.status(200).json({
            success: true,
            data: stores
        });
    } catch (error) {
        if (error instanceof Error) {
            throw new ApiError(error.message, { status: 500 });
        }
        throw new ApiError("No store found in your area", { status: 404 });
    }

}