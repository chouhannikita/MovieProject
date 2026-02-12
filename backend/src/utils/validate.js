import ApiError from "./ApiError.js";
import mongoose from "mongoose";

export const requireFields = (obj, fields) => {
  for (const field of fields) {
    if (!obj[field]) {
      throw new ApiError(400, `${field} is required`);
    }
  }
};


export const validateObjectId = (id, name = "id") => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400,`Invalid ${name}`);
  }
};
