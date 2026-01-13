import express from "express";
import LandingPage from "../models/LandingPage.js";

const router = express.Router();

// GET the landing page document
router.get("/", async (req, res) => {
  try {
    const landingPage = await LandingPage.findOne();
    res.json({ landingPage });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST / PUT to create or update landing page
router.post("/", async (req, res) => {
  try {
    const { navbar, hero, about, services, branches, team } = req.body;
    let landingPage = await LandingPage.findOne();
    if (landingPage) {
      landingPage.navbar = navbar;
      landingPage.hero = hero;
      landingPage.about = about;
      landingPage.services = services;
      landingPage.branches = branches;
      landingPage.team = team;
      await landingPage.save();
    } else {
      landingPage = await LandingPage.create({ navbar, hero, about, services, branches, team });
    }
    res.json({ message: "Landing page saved successfully", landingPage });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;



// backend/routes/landingPageRoutes.js
// import express from "express";
// import LandingPage from "../models/LandingPage.js";

// const router = express.Router();

// // GET landing page doc
// router.get("/", async (req, res) => {
//   try {
//     const doc = await LandingPage.findOne();
//     res.json({ success: true, data: doc });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success:false, message:"Server error" });
//   }
// });

// // PUT update whole landing page (send full object)
// router.put("/", async (req, res) => {
//   try {
//     const payload = req.body;
//     let doc = await LandingPage.findOne();
//     if (!doc) {
//       doc = new LandingPage(payload);
//     } else {
//       Object.assign(doc, payload);
//     }
//     await doc.save();
//     res.json({ success:true, data: doc });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success:false, message:"Server error" });
//   }
// });

// // Add item to an array sub-section like services, branches, team
// router.post("/:section/add", async (req, res) => {
//   try {
//     const { section } = req.params; // e.g., services
//     const item = req.body;
//     const doc = await LandingPage.findOne();
//     if (!doc) {
//       const base = {};
//       base[section] = [item];
//       const newDoc = new LandingPage(base);
//       await newDoc.save();
//       return res.status(201).json({ success:true, data: item });
//     }
//     doc[section] = doc[section] ? doc[section].concat(item) : [item];
//     await doc.save();
//     res.status(201).json({ success:true, data: item });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success:false, message:"Server error" });
//   }
// });

// // Update a sub-item by id (e.g., services/:id)
// router.put("/:section/:id", async (req, res) => {
//   try {
//     const { section, id } = req.params;
//     const update = req.body;
//     const doc = await LandingPage.findOne();
//     if (!doc || !doc[section]) return res.status(404).json({ success:false, message:"Section not found" });
//     const idx = doc[section].findIndex(i => i._id?.toString() === id);
//     if (idx === -1) return res.status(404).json({ success:false, message:"Item not found" });
//     doc[section][idx] = { ...doc[section][idx].toObject(), ...update };
//     await doc.save();
//     res.json({ success:true, data: doc[section][idx] });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success:false, message:"Server error" });
//   }
// });

// // Delete sub-item
// router.delete("/:section/:id", async (req, res) => {
//   try {
//     const { section, id } = req.params;
//     const doc = await LandingPage.findOne();
//     if (!doc || !doc[section]) return res.status(404).json({ success:false, message:"Section not found" });
//     doc[section] = doc[section].filter(i => i._id?.toString() !== id);
//     await doc.save();
//     res.json({ success:true, message:"Deleted" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success:false, message:"Server error" });
//   }
// });

// export default router;
