import jwt from "jsonwebtoken";

export const authenticateRole = (...roles) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(403).json({ message: "Token missing" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!roles.includes(decoded.role)) {
      return res.status(403).json({ message: "Access Denied" });
    }

    req.user = decoded;
    next();
  };
};