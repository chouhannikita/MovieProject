import Theatre from "../models/theatre.model.js";
import Admin from "../models/admin.model.js";
import mongoose from "mongoose";
import AppError from "../utils/ApiError.js";

/* ================= CREATE ================= */
export const createTheatreService = async ({ adminId, name, city, address }) => {
  const admin = await Admin.findById(adminId);
  console.log(admin,"===================",adminId)
  if (!admin || admin.status !== "ACTIVE") {
    throw new AppError(403,"Admin is not approved to create theatres");
  }

  if (!name || !city || !address) {
    throw new AppError(400,"All fields are required");
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
      throw new AppError(409,"Theatre with this name already exists");
    }
    throw error;
  }
};

/* ================= GET ADMIN THEATRES ================= */
export const getAdminTheatresService = async (adminId) => {
   return await Theatre.find({ adminId })
};

/* ================= GET BY ID ================= */
export const getTheatreByIdService = async (theatreId) => {
  const theatre = await Theatre.findById(theatreId);
  if (!theatre) {
    throw new AppError("Theatre not found", 404);
  }
  return theatre;
};

/* ================= GET ALL ================= */
export const getAllTheatresService = async () => {
  return await Theatre.find().sort({ createdAt: -1 });
};

/* ================= DELETE ================= */
export const deleteTheatreService = async (theatreId) => {
  const theatre = await Theatre.findByIdAndDelete(theatreId);
  if (!theatre) {
    throw new AppError("Theatre not found", 404);
  }
  return true;
};

/* ================= UPDATE ================= */
export const updateTheatreService = async (theatreId, data) => {
  const { name, city, address } = data;

  if (!name || !city || !address) {
    throw new AppError("All fields are required", 400);
  }

  const theatre = await Theatre.findByIdAndUpdate(
    theatreId,
    { name, city, address },
    { new: true }
  );

  if (!theatre) {
    throw new AppError("Theatre not found", 404);
  }

  return theatre;
};
