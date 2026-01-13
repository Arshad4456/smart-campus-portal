// backend/routes/feesRoutes.js
import express from "express";
import FeesModel from "../models/FeesModel.js";

const router = express.Router();

// GET all
router.get("/", async (req, res) => {
  try {
    const fees = await FeesModel.find();
    res.json({ success: true, data: fees });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success:false, message:"Server error" });
  }
});

// POST add (single or array)
router.post("/add", async (req, res) => {
  try {
    const payload = req.body;
    if (Array.isArray(payload)) {
      const docs = await FeesModel.insertMany(payload);
      return res.status(201).json({ success:true, data: docs });
    }
    const fee = new FeesModel(payload);
    await fee.save();
    res.status(201).json({ success:true, data: fee });
  } catch (err) {
    console.error("Error adding fee:", err);
    res.status(500).json({ success:false, message: err.message });
  }
});

// GET single
router.get("/:id", async (req, res) => {
  try {
    const f = await FeesModel.findById(req.params.id);
    if (!f) return res.status(404).json({ success:false, message:"Not found" });
    res.json({ success:true, data: f });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success:false, message:"Server error" });
  }
});

// PUT update
router.put("/:id", async (req, res) => {
  try {
    const updated = await FeesModel.findByIdAndUpdate(req.params.id, req.body, { new:true });
    res.json({ success:true, data: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success:false, message:"Server error" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await FeesModel.findByIdAndDelete(req.params.id);
    res.json({ success:true, message:"Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success:false, message:"Server error" });
  }
});

export default router;



// import express from "express";
// import FeesModel from "../models/FeesModel.js";

// const router = express.Router();

// // Add a new fee record
// router.post("/add", async (req, res) => {
//   try {
//     const data = req.body;

//     // If you receive an array → insertMany
//     if (Array.isArray(data)) {
//       await FeesModel.insertMany(data);
//       return res.status(201).json({
//         success: true,
//         message: "Multiple Fee records added successfully"
//       });
//     }

//     // If it is a single object → normal save
//     const record = new FeesModel(data);
//     await record.save();

//     res.status(201).json({
//       success: true,
//       message: "Single Fee record added successfully"
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });


// // Get all fees
// router.get("/", async (req, res) => {
//   try {
//     const fees = await FeesModel.find();
//     res.json(fees);
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// export default router;
