import express from "express";
import { superAdminLogin } from "../controllers/superAdminController.js";

const superAdminrouter = express.Router();

superAdminrouter.post("/login", superAdminLogin);

export default superAdminrouter;
