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

const daysInMonth = (year, month) => new Date(year, month, 0).getDate(); // month 1..12
const buildEmptyDaysMap = (year, month) => {
  const d = daysInMonth(year, month);
  const m = {};
  for (let i = 1; i <= d; i++) m[String(i)] = "";
  return m;
};

/**
 * ✅ GET students list (filtered)
 * GET /api/attendance/students?department=&program=&level=&semester=&section=
 */
router.get(
  "/students",
  authMiddleware,
  roleMiddleware(["admin", "faculty"]),
  async (req, res) => {
    try {
      const { department = "", program = "", level = "", semester, section = "" } = req.query;

      const db = await UsersModel.findOne();
      if (!db) return res.json({ success: true, data: [] });

      let students = db.students || [];

      // Only Active students by default
      students = students.filter((s) => normalizeLower(s.status || "active") === "active");

      if (department) students = students.filter((s) => normalizeLower(s.department) === normalizeLower(department));
      if (program) students = students.filter((s) => normalizeLower(s.program) === normalizeLower(program));
      if (level) students = students.filter((s) => normalizeLower(s.level) === normalizeLower(level));
      if (semester !== undefined && semester !== "") students = students.filter((s) => Number(s.semester) === Number(semester));
      if (section) students = students.filter((s) => normalizeLower(s.section) === normalizeLower(section));

      const result = students
        .map((s) => ({ registration_no: s.registration_no, name: s.name || "" }))
        .sort((a, b) => (a.name || "").localeCompare(b.name || ""));

      return res.json({ success: true, data: result });
    } catch (e) {
      return res.status(500).json({ success: false, message: e.message || "Server error" });
    }
  }
);

/**
 * ✅ GET faculties list (filtered)  ✅ NEW
 * GET /api/attendance/faculties?department=&program=
 */
router.get(
  "/faculties",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req, res) => {
    try {
      const { department = "", program = "" } = req.query;

      const db = await UsersModel.findOne();
      if (!db) return res.json({ success: true, data: [] });

      let faculties = db.faculties || [];

      // If you later add faculty status, this will still work:
      faculties = faculties.filter((f) => normalizeLower(f.status || "active") === "active");

      if (department) faculties = faculties.filter((f) => normalizeLower(f.department) === normalizeLower(department));
      if (program) faculties = faculties.filter((f) => normalizeLower(f.program) === normalizeLower(program));

      const result = faculties
        .map((f) => ({ registration_no: f.registration_no, name: f.name || "" }))
        .sort((a, b) => (a.name || "").localeCompare(b.name || ""));

      return res.json({ success: true, data: result });
    } catch (e) {
      return res.status(500).json({ success: false, message: e.message || "Server error" });
    }
  }
);

/**
 * ✅ GET one attendance sheet
 * GET /api/attendance/month?userType=&department=&program=&level=&semester=&section=&month=&year=
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
        section = "",
        month,
        year,
      } = req.query;

      if (!month || !year) return res.status(400).json({ success: false, message: "month and year are required" });

      const filter = {
        userType,
        department: normalize(department),
        program: normalize(program),
        level: normalize(level),
        month: Number(month),
        year: Number(year),
      };

      if (semester !== "") filter.semester = Number(semester);
      if (section) filter.section = normalize(section);

      const sheet = await AttendanceModel.findOne(filter);
      return res.json({ success: true, data: sheet || null });
    } catch (e) {
      return res.status(500).json({ success: false, message: e.message || "Server error" });
    }
  }
);

/**
 * ✅ GET months list for a given scope/year
 * GET /api/attendance/months?...&year=
 */
router.get(
  "/months",
  authMiddleware,
  roleMiddleware(["admin", "faculty"]),
  async (req, res) => {
    try {
      const { userType = "student", department = "", program = "", level = "", semester = "", section = "", year } = req.query;

      if (!year) return res.status(400).json({ success: false, message: "year is required" });

      const filter = {
        userType,
        department: normalize(department),
        program: normalize(program),
        level: normalize(level),
        year: Number(year),
      };

      if (semester !== "") filter.semester = Number(semester);
      if (section) filter.section = normalize(section);

      const list = await AttendanceModel.find(filter).select("month year");
      const months = [...new Set(list.map((x) => x.month))].sort((a, b) => a - b);

      return res.json({ success: true, data: months });
    } catch (e) {
      return res.status(500).json({ success: false, message: e.message || "Server error" });
    }
  }
);

/**
 * ✅ CREATE monthly attendance sheet (student OR faculty)
 * POST /api/attendance/month
 */
router.post(
  "/month",
  authMiddleware,
  roleMiddleware(["admin", "faculty"]),
  async (req, res) => {
    try {
      const { userType = "student", department = "", program = "", level = "", semester, section = "", month, year } = req.body;

      if (!month || !year) return res.status(400).json({ success: false, message: "month and year are required" });

      // ✅ Student requires full scope
      if (userType === "student") {
        if (!department || !program || !level || !semester || !section) {
          return res.status(400).json({
            success: false,
            message: "department, program, level, semester, section are required for student attendance",
          });
        }
      }

      // ✅ Faculty requires only department + program
      if (userType === "faculty") {
        if (!department || !program) {
          return res.status(400).json({
            success: false,
            message: "department and program are required for faculty attendance",
          });
        }
      }

      let people = [];

      const db = await UsersModel.findOne();

      if (userType === "student") {
        people = (db?.students || [])
          .filter((s) => normalizeLower(s.status || "active") === "active")
          .filter((s) => normalizeLower(s.department) === normalizeLower(department))
          .filter((s) => normalizeLower(s.program) === normalizeLower(program))
          .filter((s) => normalizeLower(s.level) === normalizeLower(level))
          .filter((s) => Number(s.semester) === Number(semester))
          .filter((s) => normalizeLower(s.section) === normalizeLower(section))
          .map((s) => ({ registration_no: s.registration_no, name: s.name || "" }))
          .sort((a, b) => (a.name || "").localeCompare(b.name || ""));
      }

      if (userType === "faculty") {
        people = (db?.faculties || [])
          .filter((f) => normalizeLower(f.status || "active") === "active")
          .filter((f) => normalizeLower(f.department) === normalizeLower(department))
          .filter((f) => normalizeLower(f.program) === normalizeLower(program))
          .map((f) => ({ registration_no: f.registration_no, name: f.name || "" }))
          .sort((a, b) => (a.name || "").localeCompare(b.name || ""));
      }

      const baseDays = buildEmptyDaysMap(Number(year), Number(month));
      const records = people.map((p) => ({
        registration_no: p.registration_no,
        name: p.name,
        days: baseDays,
      }));

      const createdBy = req.user?.registration_no || "";

      const filter = {
        userType,
        department: normalize(department),
        program: normalize(program),
        level: userType === "student" ? normalize(level) : "", // keep empty for faculty
        month: Number(month),
        year: Number(year),
      };

      if (userType === "student") {
        filter.semester = Number(semester);
        filter.section = normalize(section);
      }

      let sheet = await AttendanceModel.findOne(filter);
      if (sheet) return res.json({ success: true, message: "Sheet already exists", data: sheet });

      sheet = await AttendanceModel.create({
        ...filter,
        records,
        createdBy,
        updatedBy: createdBy,
      });

      return res.status(201).json({ success: true, message: "Attendance sheet created", data: sheet });
    } catch (e) {
      return res.status(500).json({ success: false, message: e.message || "Server error" });
    }
  }
);

/**
 * ✅ UPDATE monthly sheet
 * PUT /api/attendance/month/:id
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

/**
 * ✅ DELETE whole month attendance sheet (student OR faculty)
 * DELETE /api/attendance/month
 * body: { userType, department, program, level?, semester?, section?, month, year }
 */
router.delete(
  "/month",
  authMiddleware,
  roleMiddleware(["admin"]), // recommended: only admin can delete
  async (req, res) => {
    try {
      const {
        userType,
        department,
        program,
        level,
        semester,
        section,
        month,
        year,
      } = req.body;

      if (!userType || !month || !year) {
        return res.status(400).json({ success: false, message: "userType, month, year are required" });
      }

      const filter = {
        userType: normalize(userType),
        month: Number(month),
        year: Number(year),
        department: normalize(department),
        program: normalize(program),
      };

      // ✅ student sheet needs full scope
      if (normalize(userType) === "student") {
        filter.level = normalize(level);
        filter.semester = Number(semester);
        filter.section = normalize(section);
      }

      // ✅ faculty sheet: in your create route you store level="" for faculty
      if (normalize(userType) === "faculty") {
        filter.level = ""; // must match stored value
      }

      const result = await AttendanceModel.deleteMany(filter);

      if (result.deletedCount === 0) {
        return res.status(404).json({
          success: false,
          message: "No matching month record found to delete.",
        });
      }

      return res.json({
        success: true,
        message: `Deleted month record. Removed: ${result.deletedCount}`,
        deletedCount: result.deletedCount,
      });
    } catch (e) {
      return res.status(500).json({ success: false, message: e.message || "Server error" });
    }
  }
);


export default router;
