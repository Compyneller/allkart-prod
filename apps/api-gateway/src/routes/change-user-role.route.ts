import { Router } from "express";
import proxy from "express-http-proxy";

const router: Router = Router();

router.patch(
  "/role",
  proxy("http://localhost:5000", {
    proxyReqPathResolver: (req) => {
      return "/api/v1/role";
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
export default router;
