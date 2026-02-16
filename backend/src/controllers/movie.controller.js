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
    const adminId = req.query.adminId;
    if (!adminId) {
        return res.status(400).json({ message: "adminId query parameter is required" });
    }
    const movies = await movieService.getAllMovies(adminId);
    res.json(movies);
};

export const getMovie = async (req, res) => {
    const movie = await movieService.getMovieById(
        req.params.id,
        req.tenantId
    );
    res.json(movie);
};

export const updateMovie = asyncHandler(async (req, res) => {
    requireFields(req.body, ["title", "duration", "adminId"]);
    const movie = await movieService.updateMovie(
        req.query.id,
        req.body.adminId,
        req.body
    );
    res.json(ApiResponse(movie, "movie updated successfully"));
});

export const deleteMovie = asyncHandler(async (req, res) => {
    const movie = await movieService.deleteMovie(req.query.id, req.body.adminId);
    res.json(ApiResponse(movie, "Movie removed successfully"));
});
