import jwt from "jsonwebtoken";
import express from "express";
import UsersModel from "../models/UsersModel.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

// import bycrypt from "bycryptjs"

const router = express.Router();

/*=========================================
   GET ALL USERS
=========================================*/
router.get("/", authMiddleware, async (req, res) => {
  try {
    const users = await UsersModel.findOne();
    res.json({ success: true, data: users || {} });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

 /**
 * POST /api/users/login  
 * Login user by registration_no + password + userType
 */
router.post("/login", async (req, res) => {
  const { registration_no, password, userType } = req.body;

  try {
    const portalData = await UsersModel.findOne();
    if (!portalData || !portalData[userType]) {
      return res.status(404).json({ success: false, message: "User type not found" });
    }

    const user = portalData[userType].find(u => u.registration_no === registration_no);
    if (!user) {
      return res.status(401).json({ success: false, message: "Username not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }

    const token = jwt.sign(
  { registration_no: user.registration_no, userType }, // payload
  process.env.JWT_SECRET,
  { expiresIn: "2h" }
);

res.json({
  success: true,
  message: "Login successful",
  role: userType,
  user,
  token,
});


  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/*=========================================
   ADD USER (single + multiple)
=========================================*/
router.post("/add", authMiddleware, async (req, res) => {
  try {
    // If request is multipart/form-data, reject so frontend fallback works
    const contentType = req.headers["content-type"] || "";
    if (contentType.includes("multipart/form-data")) {
      return res.status(415).json({
        success: false,
        message: "Send JSON. CSV is parsed client-side in frontend."
      });
    }

    const body = req.body;

    let db = await UsersModel.findOne();
    if (!db) db = new UsersModel({ admins: [], monitors: [], faculties: [], students: [] });

    const normalizeReg = (v) => (v ?? "").toString().trim().toLowerCase();

    const addUniqueUsersToList = (listName, usersToAdd = []) => {
      if (!Array.isArray(usersToAdd) || usersToAdd.length === 0) {
        return { added: 0, skipped: 0, skippedRegs: [] };
      }

      // Build a set of existing registration numbers (case-insensitive)
      const existing = new Set(
        (db[listName] || []).map((u) => normalizeReg(u.registration_no))
      );

      let added = 0;
      let skipped = 0;
      const skippedRegs = [];

      for (const user of usersToAdd) {
        const reg = normalizeReg(user?.registration_no);
        if (!reg) {
          // no registration -> skip
          skipped++;
          skippedRegs.push("(missing registration_no)");
          continue;
        }

        if (existing.has(reg)) {
          skipped++;
          skippedRegs.push(user.registration_no);
          continue;
        }

        db[listName].push(user);
        existing.add(reg);
        added++;
      }

      return { added, skipped, skippedRegs };
    };

    // =========================
    // CASE 1: SINGLE USER
    // body: { userType, user }
    // =========================
    if (body.userType && body.user) {
      const list = body.userType.toLowerCase() + "s";

      if (!db[list]) {
        return res.status(400).json({ success: false, message: "Invalid user type" });
      }

      const result = addUniqueUsersToList(list, [body.user]);
      await db.save();

      return res.json({
        success: true,
        message:
          result.added === 1
            ? "Single user added!"
            : "Duplicate registration_no. User not added.",
        added: result.added,
        skipped: result.skipped,
        skippedRegs: result.skippedRegs,
      });
    }

    // =========================
    // CASE 2: MULTIPLE USERS
    // body: { admins:[], monitors:[], faculties:[], students:[] }
    // =========================
    const summary = {
      admins: addUniqueUsersToList("admins", body.admins),
      monitors: addUniqueUsersToList("monitors", body.monitors),
      faculties: addUniqueUsersToList("faculties", body.faculties),
      students: addUniqueUsersToList("students", body.students),
    };

    await db.save();

    const totalAdded =
      summary.admins.added +
      summary.monitors.added +
      summary.faculties.added +
      summary.students.added;

    const totalSkipped =
      summary.admins.skipped +
      summary.monitors.skipped +
      summary.faculties.skipped +
      summary.students.skipped;

    return res.json({
      success: true,
      message: "Users processed!",
      totalAdded,
      totalSkipped,
      summary,
    });
  } catch (err) {
    console.error("Add Users Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});


/*=========================================
   EDIT USER
=========================================*/
router.put("/edit", authMiddleware, async (req, res) => {
  try {
    const { registration_no, userType } = req.body;

    // accept both names from frontend/backends
    const updateData = req.body.updateData || req.body.updatedData;

    if (!registration_no || !userType || !updateData) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields."
      });
    }

    const db = await UsersModel.findOne();
    if (!db) {
      return res.status(404).json({ success: false, message: "Database empty" });
    }

    const list = userType.toLowerCase() + "s"; // admin -> admins, student -> students

    if (!db[list]) {
      return res.status(400).json({ success: false, message: "Invalid user type" });
    }

    const index = db[list].findIndex((u) => u.registration_no === registration_no);

    if (index === -1) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // prevent changing registration_no accidentally
    delete updateData.registration_no;
    delete updateData.userType;
    delete updateData._id;

    Object.assign(db[list][index], updateData);

    await db.save();

    return res.json({
      success: true,
      message: "User updated successfully",
      user: db[list][index],
    });
  } catch (error) {
    console.error("Edit User Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});


/*=========================================
   CHANGE PASSWORD
=========================================*/
router.put("/change-password", authMiddleware, async (req, res) => {
  try {
    const { registration_no, userType, currentPassword, newPassword } = req.body;

    if (!registration_no || !userType || !currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: "Missing required fields." });
    }

    const db = await UsersModel.findOne();
    if (!db) return res.status(404).json({ success: false, message: "Database empty" });

    const list = userType.toLowerCase() + "s"; // admin -> admins
    if (!db[list]) return res.status(400).json({ success: false, message: "Invalid user type" });

    const index = db[list].findIndex((u) => u.registration_no === registration_no);
    if (index === -1) return res.status(404).json({ success: false, message: "User not found" });

    const user = db[list][index];

    // ✅ current password check (your project currently stores plain passwords)
    if (user.password !== currentPassword) {
      return res.status(401).json({ success: false, message: "Current password is incorrect" });
    }

    user.password = newPassword;
    await db.save();

    return res.json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.error("Change Password Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});



/*=========================================
   DELETE USER
=========================================*/
router.delete("/delete", authMiddleware, async (req, res) => {
  const { registration_no, userType } = req.body;

  try {
    const db = await UsersModel.findOne();
    if (!db) return res.json({ success: false, message: "DB missing" });

    const list = userType.toLowerCase() + "s";

    db[list] = db[list].filter(u => u.registration_no !== registration_no);
    await db.save();

    res.json({ success: true, message: "User deleted!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;