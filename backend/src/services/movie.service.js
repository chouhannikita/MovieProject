import { Movie } from "../models/movie.model.js";
import ApiError from "../utils/ApiError.js";

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

export const updateMovie = (id, adminId, data) => {
  return Movie.findOneAndUpdate(
    { _id: id, adminId },
    data,
    { new: true }
  );
};

export const deleteMovie = (id, adminId) => {
  return Movie.findOneAndUpdate(
    { _id: id, adminId },
    { isActive: false }
  );
};
