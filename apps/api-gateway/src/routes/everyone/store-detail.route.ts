import { Router } from "express";
import proxy from "express-http-proxy";

const router: Router = Router();

router.get(
    "/store-detail/:id",
    proxy(`${process.env.ECOM_BASE_URL!}`, {
        proxyReqPathResolver: (req) => {
            return `/api/v1/dashboard/store-detail/${req.params.id}`;
        },
    })
);

export default router