import type { Request, Response } from "express";
import { getNearByStore } from "../../services/everyone/near-by-store.service";
import { getProductsForFeed } from "../../services/everyone/products.service";
import { ApiError } from "@repo/express-middleware";


export const getHomeFeedHandler = async (req: Request, res: Response) => {
    const lat = parseFloat(req.query.latitude as string);
    const long = parseFloat(req.query.longitude as string);
    const page = parseInt(req.query.page as string) || 1;

    // 1. CALL STORE SERVICE (Internal & Fast)
    // Even on Page 2, we call this. 
    // Why? Because it hits Redis (Speed: ~1ms). It gives us the secure list of IDs.


    try {
        const nearbyStores = await getNearByStore({ latitude: lat, longitude: long });

        // 2. EXTRACT IDS
        // We Map IDs internally. This is cheap CPU work.
        const storeIds = nearbyStores.map(s => s.id);

        // 3. GET PRODUCTS
        const products = await getProductsForFeed({
            storeIds,
            page
        });

        // 4. THE OPTIMIZATION (Bandwidth Saver)
        // We only attach the 'stores' list if it's the first page.
        return res.json({
            success: true,
            // If Page > 1, send empty array. The Frontend already has the stores from Page 1.
            stores: page === 1 ? nearbyStores : [],
            products: products,
            page: page,
            hasMore: products.length === 20
        });
    } catch (error) {
        if (error instanceof Error) {
            throw new ApiError(error.message, { status: 500 });
        }
        throw new ApiError("No store found in your area", { status: 404 });
    }
};