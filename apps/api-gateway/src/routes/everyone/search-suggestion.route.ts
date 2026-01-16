import { Router } from "express";
import proxy from "express-http-proxy";

const router: Router = Router();

router.get(
    "/search-suggestion",
    proxy(`${process.env.ECOM_BASE_URL!}`, {
        proxyReqPathResolver: (req) => {
            // 1. Get the values
            const q = req.query.q as string;
            const lat = req.query.latitude;
            const lng = req.query.longitude;

            // 2. Encode the 'q' parameter so "uncle chips" becomes "uncle%20chips"
            return `/api/v1/dashboard/search-suggestion?q=${encodeURIComponent(q)}&latitude=${lat}&longitude=${lng}`;
        }
    })
);
export default router