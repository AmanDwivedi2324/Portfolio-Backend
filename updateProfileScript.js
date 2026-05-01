import mongoose from "mongoose";
import dotenv from "dotenv";
import Profile from "./models/profile.model.js";

dotenv.config();

const overrideContact = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Hardcode the specifically requested strings
    const result = await Profile.findOneAndUpdate(
      {}, 
      { email: "0786ad2000@gmail.com", phone: "9569065009" },
      { new: true }
    );
    
    console.log("Profile contact details successfully overridden in DB:", result);
    process.exit(0);
  } catch (error) {
    console.error("DB Override failed", error);
    process.exit(1);
  }
};

overrideContact();
