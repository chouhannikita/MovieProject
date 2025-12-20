import { Router } from "express";
import otpRoutes from "./otp.routes.js";

const router = Router();
router.use("/otp", otpRoutes);

export default router;