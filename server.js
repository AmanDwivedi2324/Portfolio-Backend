import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import path from "path";

// Import routers
import authRoutes from "./routes/auth.route.js";
import projectRoutes from "./routes/project.route.js";
import experienceRoutes from "./routes/experience.route.js";
import skillRoutes from "./routes/skill.route.js";
import freelanceRoutes from "./routes/freelance.route.js";
import messageRoutes from "./routes/message.route.js";
import profileRoutes from "./routes/profile.route.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(process.cwd(), "public", "uploads")));

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Mounted routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/freelance", freelanceRoutes);
app.use("/api/contact", messageRoutes);
app.use("/api/profile", profileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
