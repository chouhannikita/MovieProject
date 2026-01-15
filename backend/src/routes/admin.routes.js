import { Router } from "express"
import { loginAdmin, registerAdmin } from "../controllers/admin.controller.js";

const adminRouter = Router()
adminRouter.get("/admin", (req, res) => { })
adminRouter.post("/register", registerAdmin);
adminRouter.post("/login", loginAdmin);

export default adminRouter;