import { Router } from "express";
import proxy from "express-http-proxy";

const router: Router = Router();

router.get(
  "/store",
  proxy(process.env.ECOM_BASE_URL!, {
    proxyReqPathResolver: (req) => {
      return "/api/v1/dashboard/store";
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
router.post(
  "/store",
  proxy(process.env.ECOM_BASE_URL!, {
    proxyReqPathResolver: (req) => {
      return "/api/v1/dashboard/store";
    },
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      // Send userId as a custom header
      proxyReqOpts.headers = {
        ...proxyReqOpts.headers,
        "X-User-Id": srcReq.userId || "",
        "X-User-Role": srcReq.userRole, // optional: add more user info
        "X-User-Email": srcReq.userEmail, // optional: add more user info
      };
      return proxyReqOpts;
    },

    proxyReqBodyDecorator: (bodyContent, srcReq) => {
      return bodyContent;
    },
  })
);
router.patch(
  "/store/:id",
  proxy(process.env.ECOM_BASE_URL!, {
    proxyReqPathResolver: (req) => {
      console.log();

      return `/api/v1/dashboard/store/${req.params.id}`;
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
  "/store/:id",
  proxy(process.env.ECOM_BASE_URL!, {
    proxyReqPathResolver: (req) => {
      return `/api/v1/dashboard/store/${req.params.id}`;
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

// ----------------------------------------------------address-------------------------------------------------------

router.post(
  "/address",
  proxy(process.env.ECOM_BASE_URL!, {
    proxyReqPathResolver: (req) => {
      console.log("called");

      return "/api/v1/dashboard/address";
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
  "/address/:id",
  proxy(process.env.ECOM_BASE_URL!, {
    proxyReqPathResolver: (req) => {
      return `/api/v1/dashboard/address/${req.params.id}`;
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
