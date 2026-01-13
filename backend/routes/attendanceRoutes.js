import express from "express";
import AttendanceModel from "../models/AttendanceModel.js";

const router = express.Router();
// Get all attendance records
router.get("/", async (req, res) => {
  try {
    const data = await AttendanceModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Add attendance
router.post("/add", async (req, res) => {
  try {
    const data = req.body;

    // If you receive an array → insertMany
    if (Array.isArray(data)) {
      await AttendanceModel.insertMany(data);
      return res.status(201).json({
        success: true,
        message: "Multiple attendance records added successfully"
      });
    }

    // If it is a single object → normal save
    const record = new AttendanceModel(data);
    await record.save();

    res.status(201).json({
      success: true,
      message: "Single attendance added successfully"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});



export default router;
