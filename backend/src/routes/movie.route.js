import { Router } from "express"
import adminAuth from "../middleware/adminAuth.js";
import { createMovie, deleteMovie, getMovies, updateMovie } from "../controllers/movie.controller.js";

const movieRouter = Router()
movieRouter.post("/add", adminAuth, createMovie)
movieRouter.get("/", adminAuth, getMovies)
movieRouter.put("/update", adminAuth, updateMovie)
movieRouter.delete("/delete", deleteMovie)

export default movieRouter;