import express from "express";
import { getProjects, getProjectById, createProject, updateProject, deleteProject } from "../controllers/project.controller.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.route("/").get(getProjects).post(upload.single("image"), createProject);
router.route("/:id").get(getProjectById).put(upload.single("image"), updateProject).delete(deleteProject);

export default router;
