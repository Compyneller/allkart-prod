import { Router } from "express";
import proxy from "express-http-proxy";

const router: Router = Router();

router.get(
  "/get-upload-signature",
  proxy(`${process.env.ECOM_BASE_URL}`, {
    proxyReqPathResolver: (req) => {
      console.log(
        "------------------------------------------called---------------------------------------"
      );

      return "/api/v1/dashboard/get-upload-signature";
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
