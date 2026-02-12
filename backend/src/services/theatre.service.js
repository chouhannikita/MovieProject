import Theatre from "../models/theatre.model.js";
import Admin from "../models/admin.model.js";
import ApiError from "../utils/ApiError.js";

export const createTheatreService = async ({ adminId, name, city, address }) => {
  const admin = await Admin.findById(adminId);
  if (!admin || admin.status !== "ACTIVE") {
    throw new ApiError(403,"Admin is not approved to create theatres");
  }

  if (!name || !city || !address) {
    throw new ApiError(400,"All fields are required");
  }

  try {
    const theatre = await Theatre.create({
      adminId,
      name,
      city,
      address,
    });
    return theatre;
  } catch (error) {
    if (error.code === 11000) {
      throw new ApiError(409,"Theatre with this name already exists");
    }
    throw error;
  }
};

export const getAdminTheatresService = async (adminId) => {
   return await Theatre.find({ adminId })
};

export const getTheatreByIdService = async (theatreId) => {
  const theatre = await Theatre.findById(theatreId);
  if (!theatre) {
    throw new ApiError("Theatre not found", 404);
  }
  return theatre;
};

export const getAllTheatresService = async () => {
  return await Theatre.find().sort({ createdAt: -1 });
};

export const deleteTheatreService = async (theatreId) => {
  const theatre = await Theatre.findByIdAndDelete(theatreId);
  if (!theatre) {
    throw new ApiError("Theatre not found", 404);
  }
  return true;
};

export const updateTheatreService = async (theatreId, data) => {
  const { name, city, address } = data;

  if (!name || !city || !address) {
    throw new ApiError("All fields are required", 400);
  }

  const theatre = await Theatre.findByIdAndUpdate(
    theatreId,
    { name, city, address },
    { new: true }
  );

  if (!theatre) {
    throw new ApiError("Theatre not found", 404);
  }

  return theatre;
};
