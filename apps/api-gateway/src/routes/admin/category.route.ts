import { Router } from "express";
import proxy from "express-http-proxy";

const router: Router = Router();


router.post(
  "/category",
  proxy("http://localhost:5003", {
    proxyReqPathResolver: (req) => {
      return "/api/v1/dashboard/category";
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
router.delete(
  "/category/:id",
  proxy("http://localhost:5003", {
    proxyReqPathResolver: (req) => {
      return `/api/v1/dashboard/category/${req.params.id}`;
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
  })
);


export default router;
