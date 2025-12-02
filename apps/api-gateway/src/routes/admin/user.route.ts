import { Router } from "express";
import proxy from "express-http-proxy";

const router: Router = Router();

router.get(
  "/users",
  proxy(`${process.env.BASE_URL}`, {
    proxyReqPathResolver: (req) => {
      return `/api/v1/admin/users`;
    },
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      // Send userId as a custom header
      proxyReqOpts.headers = {
        ...proxyReqOpts.headers,
        "X-User-Role": srcReq.userRole, // optional: add more user info
      };
      return proxyReqOpts;
    },
  })
);
router.patch(
  "/user/:id",
  proxy(`${process.env.BASE_URL}`, {
    proxyReqPathResolver: (req) => {
      console.log(req.params.id);
      return `/api/v1/admin/user/${req.params.id}`;
    },
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      // Send userId as a custom header
      proxyReqOpts.headers = {
        ...proxyReqOpts.headers,
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
  "/user/:id",
  proxy(`${process.env.BASE_URL}`, {
    proxyReqPathResolver: (req) => {
      console.log(req.params.id);
      return `/api/v1/admin/user/${req.params.id}`;
    },
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      // Send userId as a custom header
      proxyReqOpts.headers = {
        ...proxyReqOpts.headers,
        "X-User-Role": srcReq.userRole, // optional: add more user info
      };
      return proxyReqOpts;
    },
  })
);

export default router;
