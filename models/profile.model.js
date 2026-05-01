import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  tagline: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  resumeUrl: {
    type: String,
    required: false,
  }
}, { timestamps: true });

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
