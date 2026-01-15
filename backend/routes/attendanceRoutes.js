// backend/routes/attendanceRoutes.js
import express from "express";
import AttendanceModel from "../models/AttendanceModel.js";
import UsersModel from "../models/UsersModel.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * Helpers
 */
const normalize = (v) => (v ?? "").toString().trim();
const normalizeLower = (v) => normalize(v).toLowerCase();

const daysInMonth = (year, month) => {
  // month: 1..12
  return new Date(year, month, 0).getDate();
};

const buildEmptyDaysMap = (year, month) => {
  const d = daysInMonth(year, month);
  const m = {};
  for (let i = 1; i <= d; i++) m[String(i)] = "";
  return m;
};

/**
 * ✅ GET students list for making attendance (filtered)
 * GET /api/attendance/students?department=&program=&level=&semester=
 * Returns Active students only by default.
 */
router.get(
  "/students",
  authMiddleware,
  roleMiddleware(["admin", "faculty"]),
  async (req, res) => {
    try {
      const { department = "", program = "", level = "", semester } = req.query;

      const db = await UsersModel.findOne();
      if (!db) return res.json({ success: true, data: [] });

      let students = db.students || [];

      // Only Active students by default
      students = students.filter((s) => normalizeLower(s.status || "active") === "active");

      if (department) students = students.filter((s) => normalizeLower(s.department) === normalizeLower(department));
      if (program) students = students.filter((s) => normalizeLower(s.program) === normalizeLower(program));
      if (level) students = students.filter((s) => normalizeLower(s.level) === normalizeLower(level));
      if (semester !== undefined && semester !== "") students = students.filter((s) => Number(s.semester) === Number(semester));

      const result = students
        .map((s) => ({
          registration_no: s.registration_no,
          name: s.name || "",
        }))
        .sort((a, b) => (a.name || "").localeCompare(b.name || ""));

      return res.json({ success: true, data: result });
    } catch (e) {
      return res.status(500).json({ success: false, message: e.message || "Server error" });
    }
  }
);

/**
 * ✅ GET existing attendance sheet (month)
 * GET /api/attendance/month?userType=student&department=&program=&level=&semester=&month=&year=
 */
router.get(
  "/month",
  authMiddleware,
  roleMiddleware(["admin", "faculty"]),
  async (req, res) => {
    try {
      const {
        userType = "student",
        department = "",
        program = "",
        level = "",
        semester = "",
        month,
        year,
      } = req.query;

      if (!month || !year) {
        return res.status(400).json({ success: false, message: "month and year are required" });
      }

      const sheet = await AttendanceModel.findOne({
        userType,
        department: normalize(department),
        program: normalize(program),
        level: normalize(level),
        semester: semester === "" ? undefined : Number(semester),
        month: Number(month),
        year: Number(year),
      });

      return res.json({ success: true, data: sheet || null });
    } catch (e) {
      return res.status(500).json({ success: false, message: e.message || "Server error" });
    }
  }
);

/**
 * ✅ GET months that exist for a given scope/year
 * GET /api/attendance/months?userType=student&department=&program=&level=&semester=&year=2026
 */
router.get(
  "/months",
  authMiddleware,
  roleMiddleware(["admin", "faculty"]),
  async (req, res) => {
    try {
      const { userType = "student", department = "", program = "", level = "", semester = "", year } = req.query;

      if (!year) {
        return res.status(400).json({ success: false, message: "year is required" });
      }

      const list = await AttendanceModel.find({
        userType,
        department: normalize(department),
        program: normalize(program),
        level: normalize(level),
        semester: semester === "" ? undefined : Number(semester),
        year: Number(year),
      }).select("month year");

      const months = [...new Set(list.map((x) => x.month))].sort((a, b) => a - b);

      return res.json({ success: true, data: months });
    } catch (e) {
      return res.status(500).json({ success: false, message: e.message || "Server error" });
    }
  }
);

/**
 * ✅ CREATE (or return existing) monthly attendance sheet
 * POST /api/attendance/month
 * body: { userType, department, program, level, semester, month, year }
 */
router.post(
  "/month",
  authMiddleware,
  roleMiddleware(["admin", "faculty"]),
  async (req, res) => {
    try {
      const { userType = "student", department = "", program = "", level = "", semester, month, year } = req.body;

      if (!month || !year) {
        return res.status(400).json({ success: false, message: "month and year are required" });
      }

      // For student sheet, require these selections
      if (userType === "student") {
        if (!department || !program || !level || !semester) {
          return res.status(400).json({
            success: false,
            message: "department, program, level, semester are required for student attendance",
          });
        }
      }

      // Find students for this scope (Active only)
      let students = [];
      if (userType === "student") {
        const db = await UsersModel.findOne();
        students = (db?.students || [])
          .filter((s) => normalizeLower(s.status || "active") === "active")
          .filter((s) => normalizeLower(s.department) === normalizeLower(department))
          .filter((s) => normalizeLower(s.program) === normalizeLower(program))
          .filter((s) => normalizeLower(s.level) === normalizeLower(level))
          .filter((s) => Number(s.semester) === Number(semester))
          .map((s) => ({
            registration_no: s.registration_no,
            name: s.name || "",
          }))
          .sort((a, b) => (a.name || "").localeCompare(b.name || ""));
      }

      const baseDays = buildEmptyDaysMap(Number(year), Number(month));

      // build rows
      const records = students.map((s) => ({
        registration_no: s.registration_no,
        name: s.name,
        days: baseDays,
      }));

      const createdBy = req.user?.registration_no || "";

      // upsert (create if not exists)
      const filter = {
        userType,
        department: normalize(department),
        program: normalize(program),
        level: normalize(level),
        semester: userType === "student" ? Number(semester) : undefined,
        month: Number(month),
        year: Number(year),
      };

      let sheet = await AttendanceModel.findOne(filter);

      if (sheet) {
        return res.json({ success: true, message: "Sheet already exists", data: sheet });
      }

      sheet = await AttendanceModel.create({
        ...filter,
        records,
        createdBy,
        updatedBy: createdBy,
      });

      return res.status(201).json({ success: true, message: "Attendance sheet created", data: sheet });
    } catch (e) {
      // unique index collision safe
      if (String(e?.code) === "11000") {
        const existing = await AttendanceModel.findOne(req.body);
        return res.json({ success: true, message: "Sheet already exists", data: existing || null });
      }
      return res.status(500).json({ success: false, message: e.message || "Server error" });
    }
  }
);

/**
 * ✅ UPDATE monthly attendance sheet records
 * PUT /api/attendance/month/:id
 * body: { records: [...] }
 *
 * Admin: can update any.
 * Faculty: allowed only for student sheets (as required).
 */
router.put(
  "/month/:id",
  authMiddleware,
  roleMiddleware(["admin", "faculty"]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { records } = req.body;

      if (!Array.isArray(records)) {
        return res.status(400).json({ success: false, message: "records must be an array" });
      }

      const sheet = await AttendanceModel.findById(id);
      if (!sheet) return res.status(404).json({ success: false, message: "Sheet not found" });

      const role = req.user?.userType;

      // Faculty restriction: only student attendance editable
      if (role === "faculty" && sheet.userType !== "student") {
        return res.status(403).json({ success: false, message: "Faculty can update students attendance only" });
      }

      sheet.records = records;
      sheet.updatedBy = req.user?.registration_no || "";

      await sheet.save();

      return res.json({ success: true, message: "Attendance updated", data: sheet });
    } catch (e) {
      return res.status(500).json({ success: false, message: e.message || "Server error" });
    }
  }
);


// ✅ Delete whole month attendance (by filters)
router.delete(
  "/month",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req, res) => {
    try {
      const { year, month, userType, department, program, level, semester } = req.body;

      if (!year || !month || !userType) {
        return res.status(400).json({ success: false, message: "year, month, userType required" });
      }

      const filter = {
        year: Number(year),
        month: Number(month),
        userType: String(userType),
        department: department ? String(department).trim() : "",
        program: program ? String(program).trim() : "",
        level: level ? String(level).trim() : "",
        semester: semester !== undefined && semester !== null && semester !== "" ? Number(semester) : undefined,
      };

      const result = await AttendanceModel.deleteMany(filter);

      return res.json({
        success: true,
        message: `Deleted month record. Removed: ${result.deletedCount}`,
        deletedCount: result.deletedCount,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);
export default router;
