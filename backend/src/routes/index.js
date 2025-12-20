import { Router } from "express";
import otpRoutes from "./otp.routes.js";
import superAdminRoutes from "./superadmin.route.js";

const router = Router();

router.use("/otp", otpRoutes);
router.use("/super-admin", superAdminRoutes);

export default router;