import express from "express";
import { getProfile, updateProfile } from "../controllers/profile.controller.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.get("/", getProfile);
router.put("/", upload.single("resume"), updateProfile);

export default router;
