import Screen from "../models/screen.model.js";
import ApiError from "../utils/ApiError.js";
import Theatre from "../models/theatre.model.js";
import { validateObjectId } from "../utils/validate.js";
import mongoose from "mongoose";

export const createScreenService = async (data) => {
  const { theatreId, name, totalSeats } = data;

  validateObjectId(theatreId, "theatreId");

  if(totalSeats <= 0 || !Number.isInteger(Number(totalSeats))) {
    throw new ApiError(400, "totalSeats must be a positive number");
  }

  try {
    const screen = await Screen.create({
      theatreId,
      name,
      totalSeats
    });
    await Theatre.findByIdAndUpdate(theatreId, {
      $inc: {
        totalScreens: 1,
        totalSeats: totalSeats
      }
    });
    return screen;

  } catch (err) {
    if (err.code === 11000) {
      throw new ApiError(409, "Screen with this name already exists in the theatre");
    }
    throw err;
  }
};

export const getScreensByTheatreService = async (adminId, page=1, limit=10) => {
  const skip = (page - 1) * limit;

  return Screen.aggregate([
    {
      $lookup: {
        from: "theatres",
        localField: "theatreId",
        foreignField: "_id",
        as: "theatre"
      }
    },
    { $unwind: "$theatre" },
    {
      $match: {
        "theatre.adminId": new mongoose.Types.ObjectId(adminId)
      }
    },
    {
      $project: {
        _id: 1,
        name: 1,
        totalSeats: 1,
        theatreId: "$theatre._id",
        theatreName: "$theatre.name",
        createdAt: 1
      }
    },
    { $skip: skip },
    { $limit: limit }
  ]);
};

export const getScreenByIdService = async (id) => {
  const screen = await Screen.findById(id);
  if (!screen) throw new ApiError(404, "Screen not found");
  return screen;
};

export const updateScreenService = async (id, data) => {
  const screen = await Screen.findById(id);
  if (!screen) throw new ApiError(404, "Screen not found");

  if (data.name) screen.name = data.name;
  if (data.totalSeats) {
    if (data.totalSeats <= 0) {
      throw new ApiError(400, "totalSeats must be greater than 0");
    }
    screen.totalSeats = data.totalSeats;
  }

  return screen.save();
};

export const deleteScreenService = async (id) => {
  const screen = await Screen.findById(id);
  if (!screen) throw new ApiError(404, "Screen not found");

  await Theatre.findByIdAndUpdate(screen.theatreId, {
    $inc: {
      totalScreens: -1,
      totalSeats: -screen.totalSeats
    }
  });

  await screen.deleteOne();

  return screen;
};

