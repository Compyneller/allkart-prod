import { Router } from "express";
import { paymentController } from "../../controllers/payment/payment.controller";
import { createRazorpayAccountController } from "../../controllers/payment/create-razorpay-account.controller";


const router: Router = Router();

router.get("/checkout", paymentController);
router.post("/create-account/:id", createRazorpayAccountController);



export default router;
