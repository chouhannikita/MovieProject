import { Movie } from "../models/movie.model.js";
import ApiError from "../utils/ApiError.js";
import { validateObjectId } from "../utils/validate.js";

export const createMovie = async (data) => {
  try {
    const movie = await Movie.create({ ...data });
    return movie;
  } catch (err) {
    if (err.code === 11000) {
      throw new ApiError(409, "Movie with this name already exist");
    }

    throw new ApiError(400, err.message || "Failed to create movie");
  }
};

export const getAllMovies = (adminId) => {
  return Movie.find({ adminId, isActive: true });
};

export const getMovieById = (id, adminId) => {
  return Movie.findOne({ _id: id, adminId });
};

export const updateMovie = async (id, adminId, data) => {
  try {
    validateObjectId(id, "Movie ID");
    const movie = await Movie.findOneAndUpdate(
      { _id: id, adminId },
      data,
      { new: true, runValidators: true }
    );

    if (!movie) {
      throw new ApiError(404, "Movie not found or not authorized");
    }

    return movie;
  } catch (err) {
    if (err.code === 11000) {
      throw new ApiError(409, "Movie with this title already exists");
    }

    throw new ApiError(400, err.message || "Failed to update movie");
  }
};


export const deleteMovie = async (id, adminId) => {
  if (!adminId) {
    throw new ApiError(400, "adminId is required");
  }
  const movie = await Movie.findOneAndDelete({ _id: id, adminId });

  if (!movie) {
    throw new ApiError(404, "Movie not found or not authorized");
  }

  return movie;
};
