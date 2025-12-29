import { Router } from "express";
import proxy from "express-http-proxy";

const router: Router = Router();

router.get(
    "/get-stores",
    proxy(`${process.env.ECOM_BASE_URL!}`, {
        proxyReqPathResolver: (req) => {
            return `/api/v1/dashboard/get-stores?latitude=${req.query.latitude}&longitude=${req.query.longitude}`;
        },
    })
);

export default router