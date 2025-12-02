import { Router } from "express";
import proxy from "express-http-proxy";

const router: Router = Router();

router.patch(
  "/ban/:id",
  proxy("http://localhost:5000", {
    proxyReqPathResolver: (req) => {
      return `/api/v1/auth/ban/${req.params.id}`;
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
