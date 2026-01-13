import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization || "";

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "No session. Please login." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { registration_no, userType }
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Session expired or invalid. Please login again." });
  }
};
