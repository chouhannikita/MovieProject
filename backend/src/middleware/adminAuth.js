import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    const token = req.cookies.admin_token;

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();

  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};


export default adminAuth;
