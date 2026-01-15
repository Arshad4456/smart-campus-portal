// backend/middleware/roleMiddleware.js

const toSingular = (t = "") => {
  const map = {
    admins: "admin",
    students: "student",
    faculties: "faculty",
    monitors: "monitor",
  };
  return map[t] || t;
};

export const roleMiddleware = (allowedRoles = []) => {
  return (req, res, next) => {
    const rawRole = req.user?.userType;

    if (!rawRole) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const role = toSingular(rawRole);

    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    next();
  };
};
