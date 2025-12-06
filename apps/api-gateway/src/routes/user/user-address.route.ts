import { Router } from "express";
import proxy from "express-http-proxy";

const router: Router = Router();

router.post(
  "/address",
  proxy(`${process.env.BASE_URL}`, {
    proxyReqPathResolver: (req) => {
      console.log("called");

      return "/api/v1/user/address";
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
  "/address",
  proxy(`${process.env.BASE_URL}`, {
    proxyReqPathResolver: (req) => {
      return "/api/v1/user/address";
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
  "/address/:id",
  proxy(`${process.env.BASE_URL}`, {
    proxyReqPathResolver: (req) => {
      return "/api/v1/user/address/" + req.params.id;
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
router.patch(
  "/address/:id",
  proxy(`${process.env.BASE_URL}`, {
    proxyReqPathResolver: (req) => {
      return "/api/v1/user/address/" + req.params.id;
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
