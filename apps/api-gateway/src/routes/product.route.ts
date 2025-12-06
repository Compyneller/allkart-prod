import { Router } from "express";
import proxy from "express-http-proxy";
import { checkSeller } from "../middleware/dashboard.middleware";

const router: Router = Router();

router.post(
  "/create-product",
  checkSeller,
  proxy(`${process.env.ECOM_BASE_URL}`, {
    proxyReqPathResolver: (req) => {
      return "/api/v1/dashboard/create-product";
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
  "/dashboard/products",
  checkSeller,
  proxy(`${process.env.ECOM_BASE_URL}`, {
    proxyReqPathResolver: (req) => {
      return "/api/v1/dashboard/products";
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
router.get(
  "/all-products",
  proxy(`${process.env.ECOM_BASE_URL}`, {
    proxyReqPathResolver: (req) => {

      return "/api/v1/dashboard/all-products";
    },
    // proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
    //   proxyReqOpts.headers = {
    //     ...proxyReqOpts.headers,
    //     "X-User-Id": srcReq.userId || "",
    //     "X-User-Role": srcReq.userRole, // optional: add more user info
    //   };
    //   return proxyReqOpts;
    // },
  })
);
router.get(
  "/products/:id",
  proxy(`${process.env.ECOM_BASE_URL}`, {
    proxyReqPathResolver: (req) => {
      return "/api/v1/dashboard/products/" + req.params.id;
    },
  })
);
router.delete(
  "/dashboard/delete-product/:productId",
  checkSeller,
  proxy(`${process.env.ECOM_BASE_URL}`, {
    proxyReqPathResolver: (req) => {
      return "/api/v1/dashboard/delete-product/" + req.params.productId;
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
  "/dashboard/product/:id",
  checkSeller,
  proxy(`${process.env.ECOM_BASE_URL}`, {
    proxyReqPathResolver: (req) => {
      return "/api/v1/dashboard/product/" + req.params.id;
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
router.get(
  "/dashboard/product/:productId/:variantId",
  proxy(`${process.env.ECOM_BASE_URL}`, {
    proxyReqPathResolver: (req) => {
      return (
        "/api/v1/dashboard/product/" +
        req.params.productId +
        "/" +
        req.params.variantId
      );
    },
  })
);

export default router;
