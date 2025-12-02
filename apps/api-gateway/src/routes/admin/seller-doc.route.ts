import { Router } from "express";
import proxy from "express-http-proxy";

const router: Router = Router();

router.get(
  "/seller-documents",
  proxy(`${process.env.BASE_URL}`, {
    proxyReqPathResolver: (req) => {
      console.log(
        `${process.env.BASE_URL}/api/v1/dashboard/admin/seller-documents`
      );

      return "/api/v1/admin/seller-documents";
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
