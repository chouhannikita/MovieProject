import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { requireFields } from "../utils/validate.js";
import {
  createTheatreService,
  getAdminTheatresService,
  getTheatreByIdService,
  getAllTheatresService,
  deleteTheatreService,
  updateTheatreService
} from "../services/theatre.service.js";

export const createTheatre = asyncHandler(async (req, res) => {
  requireFields(req.body, ["name", "city", "address"]);

  const theatre = await createTheatreService({
    adminId: req.body.userId,
    ...req.body,
  });

  res.status(201).json(
    ApiResponse(theatre, "Theatre created successfully")
  );
});

export const getAdminTheatres = asyncHandler(async (req, res) => {
  const data = await getAdminTheatresService(req.user.adminId);

  res.json(ApiResponse(data));
});

export const getTheatreById = asyncHandler(async (req, res) => {
  const theatre = await getTheatreByIdService(req.params.id);

  res.json(ApiResponse(theatre));
});

export const getAllTheatres = asyncHandler(async (req, res) => {
  const theatres = await getAllTheatresService();

  res.json(ApiResponse(theatres));
});

export const deleteTheatre = asyncHandler(async (req, res) => {
  await deleteTheatreService(req.params.id);

  res.json(ApiResponse(null, "Theatre deleted successfully"));
});

export const updateTheatre = asyncHandler(async (req, res) => {
  requireFields(req.body, ["name", "city", "address"]);

  const theatre = await updateTheatreService(req.params.id, req.body);

  res.json(ApiResponse(theatre, "Theatre updated successfully"));
});
