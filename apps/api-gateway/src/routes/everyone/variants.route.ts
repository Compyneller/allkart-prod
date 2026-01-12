import { Router } from "express";
import proxy from "express-http-proxy";

const router: Router = Router();

router.get(
    "/variants",
    proxy(`${process.env.ECOM_BASE_URL!}`, {
        proxyReqPathResolver: (req) => {
            return `/api/v1/dashboard/variants?id=${req.query.id}`;
        },
    })
);

export default router