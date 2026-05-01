import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/user.model.js";

dotenv.config();

async function reset() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await User.deleteMany({}); // Clear out old lost admin accounts
    await User.create({ username: "admin", password: "password123" });
    console.log("Admin account successfully reset!");
    process.exit(0);
  } catch (error) {
    console.error("Error resetting admin:", error);
    process.exit(1);
  }
}
reset();
