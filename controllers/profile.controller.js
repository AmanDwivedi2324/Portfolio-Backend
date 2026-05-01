import Profile from "../models/profile.model.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import fs from "fs";
import path from "path";

const uploadRawToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream({ resource_type: "raw" }, (error, result) => {
      if (result) resolve(result);
      else reject(error);
    });
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

// Get profile
export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({});
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile" });
  }
};

// Update profile
export const updateProfile = async (req, res) => {
  try {
    const { tagline, bio, email, phone } = req.body;
    let resumeUrl = undefined;
    
    if (req.file) {
      if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_CLOUD_NAME !== 'add_your_cloud_name') {
        const result = await uploadRawToCloudinary(req.file.buffer);
        resumeUrl = result.secure_url;
      } else {
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
        const fileName = `${Date.now()}-${req.file.originalname.replace(/\s+/g, '_')}`;
        fs.writeFileSync(path.join(uploadDir, fileName), req.file.buffer);
        resumeUrl = `/uploads/${fileName}`;
      }
    }

    const updatePayload = { tagline, bio, email, phone };
    if (resumeUrl) updatePayload.resumeUrl = resumeUrl;

    const profile = await Profile.findOne({});
    if (!profile) {
      const newProfile = new Profile(updatePayload);
      await newProfile.save();
      return res.status(201).json(newProfile);
    }
    
    const updatedProfile = await Profile.findOneAndUpdate(
      {}, 
      updatePayload, 
      { new: true, runValidators: true }
    );
    res.json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: "Error updating profile: " + error.message });
  }
};
