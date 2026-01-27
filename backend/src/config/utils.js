import jwt from "jsonwebtoken";

export const generateToken = (admin) => {
  return jwt.sign(
    {
      adminId: admin._id,
      role: admin.role,
      status: admin.status,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};
