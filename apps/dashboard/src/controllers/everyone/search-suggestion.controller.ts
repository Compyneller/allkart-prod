import { Request, Response } from "express";
import { ApiError } from "@repo/express-middleware";
import { getSearchSuggestions } from "../../services/everyone/search-suggestion.service";
import { getNearByStore } from "../../services/everyone/near-by-store.service";

export const searchSuggestionsController = async (req: Request, res: Response) => {
    const q = req.query.q;
    const lat = parseFloat(req.query.latitude as string);
    const long = parseFloat(req.query.longitude as string);




    if (!q) {
        throw new ApiError("Store ids and query are required", { status: 400 });
    }

    const nearbyStores = await getNearByStore({
        latitude: lat,
        longitude: long
    });

    // Optimization: If no stores nearby, don't search DB
    if (!nearbyStores || nearbyStores.length === 0) {
        throw new ApiError('No product found in your area', { status: 404 });

    }

    const storeIds = nearbyStores.map(s => s.id);
    try {

        const response = await getSearchSuggestions({ query: q as string, storeIds: storeIds as number[] })

        return res.status(200).json({
            success: true,
            data: response
        })
    } catch (error) {
        if (error instanceof Error) {
            throw new ApiError(error.message, { status: 500 });
        }
        throw new ApiError("No store found in your area", { status: 404 });
    }

}