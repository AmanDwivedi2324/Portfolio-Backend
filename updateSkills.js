import mongoose from "mongoose";
import dotenv from "dotenv";
import Skill from "./models/skill.model.js";

dotenv.config();

const skillsData = [
  // Specializations
  { category: "Specializations", name: "Backend Development" },
  { category: "Specializations", name: "Full Stack Development" },
  { category: "Specializations", name: "Scalable APIs" },
  { category: "Specializations", name: "Microservices Architecture" },

  // Programming Languages
  { category: "Programming Languages", name: "JavaScript (ES6+)" },
  { category: "Programming Languages", name: "Java" },

  // Backend & Architecture
  { category: "Backend & Architecture", name: "Node.js" },
  { category: "Backend & Architecture", name: "Express.js" },
  { category: "Backend & Architecture", name: "NestJS" },
  { category: "Backend & Architecture", name: "Microservices" },
  { category: "Backend & Architecture", name: "Kafka" },
  { category: "Backend & Architecture", name: "RESTful APIs" },
  { category: "Backend & Architecture", name: "JWT" },
  { category: "Backend & Architecture", name: "API Gateway" },

  // Frontend
  { category: "Frontend", name: "Next.js (SSR/App Router)" },
  { category: "Frontend", name: "React.js" },
  { category: "Frontend", name: "HTML5" },
  { category: "Frontend", name: "CSS3" },
  { category: "Frontend", name: "Tailwind CSS" },

  // Databases
  { category: "Databases", name: "MongoDB (Aggregation/Indexing)" },
  { category: "Databases", name: "Mongoose" },
  { category: "Databases", name: "Firebase Firestore" },

  // DevOps & Tools
  { category: "DevOps & Tools", name: "Docker" },
  { category: "DevOps & Tools", name: "Docker Compose" },
  { category: "DevOps & Tools", name: "Git" },
  { category: "DevOps & Tools", name: "GitHub" },
  { category: "DevOps & Tools", name: "Postman" },
  { category: "DevOps & Tools", name: "VS Code" },

  // Core CS
  { category: "Core CS", name: "Data Structures & Algorithms (350+ Problems Solved)" },
  { category: "Core CS", name: "DBMS" },
  { category: "Core CS", name: "OS" },
  { category: "Core CS", name: "System Design" },
];

const updateSkills = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    console.log("Deleting existing skills...");
    await Skill.deleteMany({});
    
    console.log("Inserting new skills...");
    await Skill.insertMany(skillsData);

    console.log("Skills updated successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error updating skills:", error);
    process.exit(1);
  }
};

updateSkills();
