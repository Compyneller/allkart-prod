import { Router } from "express";
import proxy from "express-http-proxy";

const router: Router = Router();

router.get(
    "/dasboard/checkout",
    proxy("http://localhost:5003", {
        proxyReqPathResolver: (req) => {
            console.log("----------------called--------------------");

            return "/api/v1/dashboard/checkout";
        },
        proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
            proxyReqOpts.headers = {
                ...proxyReqOpts.headers,
                "X-User-Id": srcReq.userId || "",
                "X-User-Role": srcReq.userRole, // optional: add more user info
            };
            return proxyReqOpts;
        },

    })
);
router.post(
    "/dasboard/create-account/:id",
    proxy("http://localhost:5003", {
        proxyReqPathResolver: (req) => {

            return "/api/v1/dashboard/create-account/" + req.params.id;
        },
        proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
            proxyReqOpts.headers = {
                ...proxyReqOpts.headers,
                "X-User-Id": srcReq.userId || "",
                "X-User-Role": srcReq.userRole,
            };
            return proxyReqOpts;
        },

    })
);

export default router