import Project from "../models/project.model.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import fs from "fs";
import path from "path";

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProject = async (req, res) => {
  try {
    const { title, description, techStack, liveLink, githubLink } = req.body;
    let imageUrl = "";

    if (req.file) {
      if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_CLOUD_NAME !== 'add_your_cloud_name') {
        const result = await uploadToCloudinary(req.file.buffer);
        imageUrl = result.secure_url;
      } else {
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
        const fileName = `${Date.now()}-${req.file.originalname.replace(/\s+/g, '_')}`;
        fs.writeFileSync(path.join(uploadDir, fileName), req.file.buffer);
        imageUrl = `/uploads/${fileName}`;
      }
    }

    const project = await Project.create({
      title,
      description,
      techStack: techStack ? techStack.split(',').map(s => s.trim()) : [],
      imageUrl,
      liveLink,
      githubLink,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { title, description, techStack, liveLink, githubLink } = req.body;
    const project = await Project.findById(req.params.id);

    if (project) {
      project.title = title || project.title;
      project.description = description || project.description;
      if (techStack) {
          project.techStack = typeof techStack === 'string' ? techStack.split(',').map(s => s.trim()) : techStack;
      }
      project.liveLink = liveLink || project.liveLink;
      project.githubLink = githubLink || project.githubLink;

      if (req.file) {
        if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_CLOUD_NAME !== 'add_your_cloud_name') {
          const result = await uploadToCloudinary(req.file.buffer);
          project.imageUrl = result.secure_url;
        } else {
          const uploadDir = path.join(process.cwd(), "public", "uploads");
          if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
          const fileName = `${Date.now()}-${req.file.originalname.replace(/\s+/g, '_')}`;
          fs.writeFileSync(path.join(uploadDir, fileName), req.file.buffer);
          project.imageUrl = `/uploads/${fileName}`;
        }
      }

      const updatedProject = await project.save();
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      await project.deleteOne();
      res.json({ message: "Project removed" });
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
