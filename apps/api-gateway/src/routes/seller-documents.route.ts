import { Router } from "express";
import proxy from "express-http-proxy";

const router: Router = Router();

router.post(
  "/seller-documents",
  proxy(`${process.env.BASE_URL}`, {
    proxyReqPathResolver: (req) => {
      return "/api/v1/seller-documents";
    },
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
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
