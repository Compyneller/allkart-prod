import { Router } from "express";
import proxy from "express-http-proxy";

const router: Router = Router();
router.post(
  "/delete-image",
  proxy(`${process.env.ECOM_BASE_URL}`, {
    proxyReqPathResolver: (req) => {
      return "/api/v1/dashboard/delete-image";
    },
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      // Send userId as a custom header
      proxyReqOpts.headers = {
        ...proxyReqOpts.headers,
        "X-User-Id": srcReq.userId || "",
        "X-User-Role": srcReq.userRole, // optional: add more user info
      };
      return proxyReqOpts;
    },

    proxyReqBodyDecorator: (bodyContent, srcReq) => {
      return bodyContent;
    },
  })
);
router.post(
  "/delete-all-image",
  proxy("http://localhost:5003", {
    proxyReqPathResolver: (req) => {
      return "/api/v1/dashboard/delete-all-image";
    },
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      // Send userId as a custom header
      proxyReqOpts.headers = {
        ...proxyReqOpts.headers,
        "X-User-Id": srcReq.userId || "",
        "X-User-Role": srcReq.userRole, // optional: add more user info
      };
      return proxyReqOpts;
    },

    proxyReqBodyDecorator: (bodyContent, srcReq) => {
      return bodyContent;
    },
  })
);
export default router;
