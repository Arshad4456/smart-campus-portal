export const roleMiddleware = (allowedRoles = []) => {
  return (req, res, next) => {
    // authMiddleware must run before this
    const role = req.user?.userType;

    if (!role) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    next();
  };
};
