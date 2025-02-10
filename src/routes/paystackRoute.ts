import express from "express";
import { PaymentController } from "../controllers/paystackController";
import { authenticateToken } from "../middlewares/verifyJWT";
const router = express.Router();

router.post(
  "/initialize_payment",
  authenticateToken,
  PaymentController.initializePayment
);
router.post(
  "/verify_payment/:reference",
  authenticateToken,
  PaymentController.verifyPayment
);

export default router;
