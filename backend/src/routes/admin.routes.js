import { Router } from "express"
import { registerAdmin } from "../controllers/admin.controller";

const router = Router()
router.get("/admin", (req, res) => { })
router.post("/admin/register", registerAdmin);