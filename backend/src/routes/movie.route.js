import { Router } from "express"
import adminAuth from "../middleware/adminAuth.js";
import { createMovie, deleteMovie, getMovies, updateMovie } from "../controllers/movie.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const movieRouter = Router()
movieRouter.post("/add", adminAuth, upload.single("posterUrl"), createMovie)
movieRouter.get("/", adminAuth, getMovies)
movieRouter.put("/update", adminAuth, updateMovie)
movieRouter.delete("/delete", adminAuth, deleteMovie)

export default movieRouter;
