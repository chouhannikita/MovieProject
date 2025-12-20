import express from "express";
import { superAdminLogin } from "../controllers/superadmin.controller.js";

const superAdminrouter = express.Router();

superAdminrouter.post("/login", superAdminLogin);

export default superAdminrouter;