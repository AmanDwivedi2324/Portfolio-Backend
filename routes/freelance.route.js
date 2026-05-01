import express from "express";
import { getFreelances, createFreelance, updateFreelance, deleteFreelance } from "../controllers/freelance.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/").get(getFreelances).post(protect, createFreelance);
router.route("/:id").put(protect, updateFreelance).delete(protect, deleteFreelance);

export default router;
