import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import mongoose from "mongoose";

const url = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

export const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      dbName: dbName,
    });

    console.log("✅ Mongoose Connected Successfully");
  } catch (err) {
    console.error("❌ Mongoose Connection Error:", err);
    process.exit(1);
  }
};