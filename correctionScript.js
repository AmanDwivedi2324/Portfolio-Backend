import mongoose from "mongoose";
import dotenv from "dotenv";
import Experience from "./models/experience.model.js";

dotenv.config();

const correctData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Wipe all old experiences and inject the EXACT ones specified by the image
    await Experience.deleteMany();

    await Experience.insertMany([
      {
        company: "Raventra Solar Private Limited",
        role: "Full Stack Developer",
        duration: "Jan 2026 - Mar 2026",
        description: "Developed a scalable solar energy management platform using MERN stack, handling 200+ customer records and real-time operational data. Designed and implemented admin dashboards to manage 50+ monthly leads, installations, and revenue tracking, improving team productivity by 30%. Automated key business workflows, reducing manual data handling efforts by 40% and minimizing human errors. Built secure and optimized backend services using Node.js, improving API response time by 25%."
      },
      {
        company: "Difmo Private Limited",
        role: "Full Stack Developer",
        duration: "Mar 2025 - Dec 2025",
        description: "Engineered backend solutions for 3+ production LegalTech/Gov projects (including PMAY), serving 1k+ users. Architected modular APIs using Node.js/Express, reducing response latency by 40% via MongoDB indexing. Implemented robust security (JWT, RBAC) and centralized error handling, cutting debugging time by 30%. Collaborated with frontend teams to integrate React/Next.js interfaces, ensuring 99.9% system uptime."
      }
    ]);
    
    console.log("Experience timings completely corrected to Raventra/Difmo specs.");
    process.exit(0);
  } catch (error) {
    console.error("Correction failed", error);
    process.exit(1);
  }
};

correctData();
