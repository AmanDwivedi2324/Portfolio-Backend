import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    techStack: [{ type: String }],
    imageUrl: { type: String },
    liveLink: { type: String },
    githubLink: { type: String },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
