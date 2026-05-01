import mongoose from "mongoose";
import dotenv from "dotenv";
import Project from "./models/project.model.js";

dotenv.config();

const updateLinks = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    await Project.updateOne({ title: /Coding of World/i }, { $set: { liveLink: "https://www.codingofworld.com" } });
    await Project.updateOne({ title: /Raventra Solar Platform/i }, { $set: { liveLink: "https://www.raventra.in" } });
    await Project.updateOne({ title: /Sajjadhusain Law Associates/i }, { $set: { liveLink: "https://www.sajjadhusainlawassociates.com" } });
    await Project.updateOne({ title: /Akshat Pragati/i }, { $set: { liveLink: "https://www.akshatpragati.com" } });

    console.log("Links updated successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error updating links", error);
    process.exit(1);
  }
};

updateLinks();
