import express from "express";
import NoticesModel from "../models/NoticesModel.js";

const router = express.Router();

// GET all notices
router.get("/", async (req, res) => {
  try {
    const notices = await NoticesModel.find();
    res.json({ success: true, data: notices });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST a new notice
router.post("/add", async (req, res) => {
  try {
    const data = req.body;

    // If you receive an array → insertMany
    if (Array.isArray(data)) {
      await NoticesModel.insertMany(data);
      return res.status(201).json({
        success: true,
        message: "Multiple Notices added successfully"
      });
    }

    // If it is a single object → normal save
    const record = new NoticesModel(data);
    await record.save();

    res.status(201).json({
      success: true,
      message: "Single Notice added successfully"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


export default router;
