import { Router } from "express";
import otpRoutes from "./otp.routes.js";
import superAdminRoutes from "./superadmin.route.js";
import adminRouter from "./admin.routes.js";
import theatreRouter from "./threatre.route.js";
import screenRouter from "./screen.route.js";

const router = Router();

router.use("/otp", otpRoutes);
router.use("/super-admin", superAdminRoutes);
router.use("/admin", adminRouter);
router.use("/theatre", theatreRouter);
router.use("/screen",screenRouter)

export default router;