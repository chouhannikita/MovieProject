import { Router } from "express"
import { createTheatre, getAdminTheatres } from "../controllers/theatre.controller.js";
import adminAuth from "../middleware/adminAuth.js";

const theatreRouter = Router()
theatreRouter.post("/add",adminAuth, createTheatre)
theatreRouter.get("/",adminAuth, getAdminTheatres)

export default theatreRouter;