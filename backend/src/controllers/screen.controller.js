import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { requireFields } from "../utils/validate.js";
import {
  createScreenService,
  getScreensByTheatreService,
  getScreenByIdService,
  updateScreenService,
  deleteScreenService
} from "../services/screen.service.js";

export const createScreen = asyncHandler(async (req, res) => {
  requireFields(req.body, ["theatreId", "name", "totalSeats"]);

  const screen = await createScreenService(req.body);

  res.status(201).json(
    ApiResponse(screen, "Screen created successfully")
  );
});

export const getScreensByTheatre = asyncHandler(async (req, res) => {
  const { theatreId,page,limit } = req.query;
  const screens = await getScreensByTheatreService(theatreId,page,limit);

  res.json(ApiResponse(screens));
});

export const getScreenById = asyncHandler(async (req, res) => {
  const { screenId } = req.query;
  const screen = await getScreenByIdService(screenId);

  res.json(ApiResponse(screen));
});

export const updateScreen = asyncHandler(async (req, res) => {
  const { screenId } = req.query;
  const screen = await updateScreenService(screenId, req.body);

  res.json(ApiResponse(screen, "Updated successfully"));
});

export const deleteScreen = asyncHandler(async (req, res) => {
  const { id } = req.query;
  await deleteScreenService(id);

  res.json(ApiResponse(null, "Deleted successfully"));
});
