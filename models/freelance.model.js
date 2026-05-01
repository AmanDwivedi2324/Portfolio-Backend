import mongoose from "mongoose";

const freelanceSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true },
    projectSummary: { type: String, required: true },
    link: { type: String },
  },
  { timestamps: true }
);

const Freelance = mongoose.model("Freelance", freelanceSchema);
export default Freelance;
