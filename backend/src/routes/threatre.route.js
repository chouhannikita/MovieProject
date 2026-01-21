import { Router } from "express"
import { createTheatre, deleteTheatre, getAdminTheatres, getAllTheatres, updateTheatre } from "../controllers/theatre.controller.js";
import adminAuth from "../middleware/adminAuth.js";

const theatreRouter = Router()
theatreRouter.post("/add", adminAuth, createTheatre)
theatreRouter.get("/", adminAuth, getAdminTheatres)
theatreRouter.put("/update", adminAuth, updateTheatre)
theatreRouter.delete("/delete", adminAuth, deleteTheatre)
theatreRouter.get("/all", getAllTheatres)

export default theatreRouter;