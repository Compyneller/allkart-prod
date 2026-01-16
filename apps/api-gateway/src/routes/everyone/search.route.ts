import { Router } from "express";
import proxy from "express-http-proxy";

const router: Router = Router();

router.get(
    "/search",
    proxy(`${process.env.ECOM_BASE_URL!}`, {
        proxyReqPathResolver: (req) => {
            const q = req.query.q as string;
            const lat = req.query.latitude;
            const lng = req.query.longitude;
            const page = req.query.page;
            return `/api/v1/dashboard/search?q=${encodeURIComponent(q)}&latitude=${lat}&longitude=${lng}&page=${page}`;
        }
    })
);

export default router