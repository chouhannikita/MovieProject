import dotenv from "dotenv";
dotenv.config(); 
import cors from "cors";

import express from "express";
import userRoutes from "./src/routes/userRoutes.js";
import { connectDB } from "./src/config/dbConfig.js";
import superAdminrouter from "./src/routes/superAdminRoute.js";

const app = express();
app.use(express.json());
app.use(cors());

connectDB()

app.use("/api/user",userRoutes)
app.use("/super-admin",superAdminrouter)

app.get("/", (req, res) => {
    res.send("API Running");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
    console.log(`Server: http://localhost:${PORT}`)
);
