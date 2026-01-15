import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import landingPageRoutes from "./routes/landingPageRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import feesRoutes from "./routes/feesRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import noticesRoutes from "./routes/noticesRoutes.js";

dotenv.config();

const app = express();
connectDB();

app.use(cors({
  origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(express.json());

app.use("/api/landing", landingPageRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/fees", feesRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/notices", noticesRoutes);

app.get("/", (req, res) => {
  res.send("Smart Campus Portal Backend is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
