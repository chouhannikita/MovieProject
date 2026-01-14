import { Router } from "express";
import otpRoutes from "./otp.routes.js";
import superAdminRoutes from "./superadmin.route.js";
import adminRouter from "./admin.routes.js";

const router = Router();

router.use("/otp", otpRoutes);
router.use("/super-admin", superAdminRoutes);
router.use("/admin", adminRouter);

export default router;