import { Router } from "express";
import proxy from "express-http-proxy";

const router: Router = Router();

router.get(
  "/seller-documents/:id",
  proxy(`${process.env.ECOM_BASE_URL}`, {
    proxyReqPathResolver: (req) => {
      return "/api/v1/dashboard/admin/seller-documents/" + req.params.id;
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
