import { Router } from "express";
import proxy from "express-http-proxy";

const router: Router = Router();

router.get(
    "/category",
    proxy(`${process.env.ECOM_BASE_URL!}`, {
        proxyReqPathResolver: (req) => {
            console.log("--------------------called------------------------");
            return "/api/v1/dashboard/category";
        },
    })
);

export default router