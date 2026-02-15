import { Router } from "express"
import adminAuth from "../middleware/adminAuth.js";
import { createMovie } from "../controllers/movie.controller.js";

const movieRouter = Router()
movieRouter.post("/add", adminAuth, createMovie)
// screenRouter.get("/", adminAuth, getAllMovies)
// screenRouter.put("/update", adminAuth,updateScreen )
// screenRouter.delete("/delete", deleteScreen)
// screenRouter.get("/screenById",adminAuth, getScreenById)

export default movieRouter;