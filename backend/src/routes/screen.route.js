import { Router } from "express"
import adminAuth from "../middleware/adminAuth.js";
import { createScreen, deleteScreen, getScreenById, getScreensByTheatre, updateScreen } from "../controllers/screen.controller.js";

const screenRouter = Router()
screenRouter.post("/add", adminAuth, createScreen)
screenRouter.get("/", adminAuth, getScreensByTheatre)
screenRouter.put("/update", adminAuth,updateScreen )
screenRouter.delete("/delete", deleteScreen)
screenRouter.get("/screenById",adminAuth, getScreenById)

export default screenRouter;