import { Router } from "express";
import proxy from "express-http-proxy";

const router: Router = Router();

router.get(
    "/store-products/:id",
    proxy(`${process.env.ECOM_BASE_URL!}`, {
        proxyReqPathResolver: (req) => {
            return `/api/v1/dashboard/store-products/${req.params.id}`;
        },
    })
);

export default router