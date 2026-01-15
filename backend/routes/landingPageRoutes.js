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