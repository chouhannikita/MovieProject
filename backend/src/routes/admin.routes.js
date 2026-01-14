import { Router } from "express"
import { registerAdmin } from "../controllers/admin.controller.js";

const adminRouter = Router()
adminRouter.get("/admin", (req, res) => { })
adminRouter.post("/register", registerAdmin);

export default adminRouter;