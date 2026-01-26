import Screen from "../models/screen.model.js";
import ApiError from "../utils/ApiError.js";
import Theatre from "../models/theatre.model.js";

export const createScreenService = async (data) => {
  const { theatreId, name, totalSeats } = data;

  const existing = await Screen.findOne({ theatreId, name });
  if (existing) {
    throw new ApiError(409, "Screen already exists in this theatre");
  }

  const screen = await Screen.create({
    theatreId,
    name,
    totalSeats
  });

  // 🔥 DOMAIN SIDE EFFECT
  await Theatre.findByIdAndUpdate(theatreId, {
    $inc: {
      totalScreens: 1,
      totalSeats: totalSeats
    }
  });

  return screen;
};

export const getScreensByTheatreService = (theatreId) => {
  return Screen.find({ theatreId });
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
  const screen = await Screen.findByIdAndDelete(id);
  if (!screen) throw new ApiError(404, "Screen not found");
  return screen;
};
