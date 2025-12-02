import { Router } from "express";
import proxy from "express-http-proxy";

const router: Router = Router();

router.post(
  "/cart",
  proxy("http://localhost:5003", {
    proxyReqPathResolver: (req) => {
      return "/api/v1/dashboard/cart";
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
router.post(
  "/decrement-cart",
  proxy("http://localhost:5003", {
    proxyReqPathResolver: (req) => {
      return "/api/v1/dashboard/decrement-cart";
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

router.get(
  "/cart",
  proxy("http://localhost:5003", {
    proxyReqPathResolver: (req) => {
      return "/api/v1/dashboard/cart";
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
