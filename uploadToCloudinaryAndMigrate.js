import "dotenv/config";
import mongoose from "mongoose";
import cloudinary from "./config/cloudinary.js";
import fs from "fs";
import path from "path";

const migrateMedia = async () => {
  // Use remote URI to ensure production is updated
  const remoteUri = "mongodb+srv://0786ad2000_db_user:Aman%40123@cluster0.kz6fdei.mongodb.net/portfolio";
  const localUri = "mongodb://127.0.0.1:27017/portfolio";

  console.log("Connecting to Local DB...");
  const localDb = mongoose.createConnection(localUri);
  console.log("Connecting to Remote DB...");
  const remoteDb = mongoose.createConnection(remoteUri);

  await Promise.all([
    new Promise((res) => localDb.once("open", res)),
    new Promise((res) => remoteDb.once("open", res)),
  ]);

  const uploadToCloudinary = async (filePath) => {
    try {
      const absolutePath = path.join(process.cwd(), "public", filePath);
      if (!fs.existsSync(absolutePath)) {
        console.log(`File not found: ${absolutePath}`);
        return filePath; // Keep old URL if file doesn't exist
      }
      console.log(`Uploading ${filePath} to Cloudinary...`);
      const result = await cloudinary.uploader.upload(absolutePath);
      return result.secure_url;
    } catch (error) {
      console.error(`Error uploading ${filePath}:`, error);
      return filePath;
    }
  };

  try {
    console.log("Checking Projects for local images...");
    const projects = await localDb.db.collection("projects").find({}).toArray();
    for (const project of projects) {
      if (project.imageUrl && project.imageUrl.startsWith("/uploads/")) {
        const newUrl = await uploadToCloudinary(project.imageUrl);
        if (newUrl !== project.imageUrl) {
          // Update in both DBs
          await localDb.db.collection("projects").updateOne({ _id: project._id }, { $set: { imageUrl: newUrl } });
          await remoteDb.db.collection("projects").updateOne({ _id: project._id }, { $set: { imageUrl: newUrl } });
          console.log(`Updated project ${project.title} with new image URL.`);
        }
      }
    }

    console.log("Checking Profiles for local resumes...");
    const profiles = await localDb.db.collection("profiles").find({}).toArray();
    for (const profile of profiles) {
      if (profile.resumeUrl && profile.resumeUrl.startsWith("/uploads/")) {
        const newUrl = await uploadToCloudinary(profile.resumeUrl);
        if (newUrl !== profile.resumeUrl) {
          // Update in both DBs
          await localDb.db.collection("profiles").updateOne({ _id: profile._id }, { $set: { resumeUrl: newUrl } });
          await remoteDb.db.collection("profiles").updateOne({ _id: profile._id }, { $set: { resumeUrl: newUrl } });
          console.log(`Updated profile ${profile.tagline} with new resume URL.`);
        }
      }
    }

    console.log("Media migration to Cloudinary completed successfully!");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    localDb.close();
    remoteDb.close();
    process.exit(0);
  }
};

migrateMedia();
