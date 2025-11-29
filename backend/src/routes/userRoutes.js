import express from "express";
import { addUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/add-user", addUser);

export default userRouter;