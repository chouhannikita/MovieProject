import * as movieService from "../services/movie.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { requireFields } from "../utils/validate.js";

export const createMovie = asyncHandler(async (req, res) => {
    requireFields(req.body, ["title", "duration", "adminId"]);
    const movie = await movieService.createMovie(
        req.body,
    );
    res.status(201).json(ApiResponse(movie, "Movie added successfully"));
});

export const getMovies = async (req, res) => {
    const movies = await movieService.getAllMovies(req.tenantId);
    res.json(movies);
};

export const getMovie = async (req, res) => {
    const movie = await movieService.getMovieById(
        req.params.id,
        req.tenantId
    );
    res.json(movie);
};

export const updateMovie = async (req, res) => {
    const movie = await movieService.updateMovie(
        req.params.id,
        req.tenantId,
        req.body
    );
    res.json(movie);
};

export const deleteMovie = async (req, res) => {
    await movieService.deleteMovie(req.params.id, req.tenantId);
    res.json({ message: "Movie removed" });
};
