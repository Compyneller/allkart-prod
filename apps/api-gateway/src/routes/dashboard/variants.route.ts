import { Router } from "express";
import proxy from "express-http-proxy";

const router: Router = Router();

router.get(
  "/variants/:pid",
  proxy(process.env.ECOM_BASE_URL!, {
    proxyReqPathResolver: (req) => {
      return "/api/v1/dashboard/variants/" + req.params.pid;
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
router.delete(
  "/variant/:vid",
  proxy(process.env.ECOM_BASE_URL!, {
    proxyReqPathResolver: (req) => {
      return "/api/v1/dashboard/variant/" + req.params.vid;
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
  "/variant",
  proxy(process.env.ECOM_BASE_URL!, {
    proxyReqPathResolver: (req) => {
      return "/api/v1/dashboard/variant";
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
router.patch(
  "/variant/:id",
  proxy(process.env.ECOM_BASE_URL!, {
    proxyReqPathResolver: (req) => {
      return "/api/v1/dashboard/variant/" + req.params.id;
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
