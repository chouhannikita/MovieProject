import ApiError from "./ApiError.js";

export const requireFields = (obj, fields) => {
  for (const field of fields) {
    if (!obj[field]) {
      throw new ApiError(400, `${field} is required`);
    }
  }
};
