import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true }
});

const navbarSchema = new mongoose.Schema({
  logo: { type: String, required: true },
  links: [linkSchema],
  loginButtonText: { type: String, default: "Login" }
});

const heroSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  image: String
});

const aboutSchema = new mongoose.Schema({
  title: String,
  description: String
});

const servicesSchema = new mongoose.Schema( {
        title: String,
        desc: String,
        icon: String
      });

const branchesSchema = new mongoose.Schema( {
        img: String,
        title: String,
      });

const teamSchema = new mongoose.Schema( {
        img: String,
        name: String,
        role: String,
      });

const landingPageSchema = new mongoose.Schema({
  navbar: navbarSchema,
  hero: heroSchema,
  about: aboutSchema,
  services: [servicesSchema],
  branches: [branchesSchema],
  team : [teamSchema],
  // Add more sections here: services, team, contact, footer
});

export default mongoose.model("LandingPage", landingPageSchema);
