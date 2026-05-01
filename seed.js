import mongoose from "mongoose";
import dotenv from "dotenv";
import Project from "./models/project.model.js";
import Experience from "./models/experience.model.js";
import Skill from "./models/skill.model.js";
import Freelance from "./models/freelance.model.js";
import Profile from "./models/profile.model.js";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Project.deleteMany();
    await Experience.deleteMany();
    await Skill.deleteMany();
    await Freelance.deleteMany();
    await Profile.deleteMany();

    await Project.insertMany([
      { title: "Raventra Solar Platform", description: "Designed a responsive landing page and client portal featuring dynamic solar estimator tools. Managed the full deployment lifecycle on Vercel and Shared Hosting.", techStack: ["React.js", "Tailwind CSS", "MongoDB", "Node.js"], liveLink: "#", githubLink: "#" },
      { title: "Sajjadhusain Law Associates", description: "Architected a Microservices backend with NestJS using Kafka for event-driven communication. Processed asynchronous legal workflows efficiently.", techStack: ["React.js", "Microservices", "Kafka"], liveLink: "#", githubLink: "#" },
      { title: "Coding of World", description: "Launched an e-learning platform with custom CMS, currently supporting content for 200+ active learners. Integrated dynamic course management.", techStack: ["Fullstack Web Development"], liveLink: "#", githubLink: "#" },
      { title: "Akshat Pragati", description: "Developed a CRM for 100+ users, replacing manual Excel tracking. Leveraged Firebase listeners for real-time updates.", techStack: ["React.js", "Firebase", "Real-time DB"], liveLink: "#", githubLink: "#" }
    ]);

    await Experience.insertMany([
      { company: "Self-Employed", role: "Freelance Full Stack Developer", duration: "December 2025 - Present", description: "Delivered end-to-end web solutions for multiple businesses. Built scalable full-stack applications with admin dashboards to manage inventory, leads, income, etc." },
      { company: "Difmo Private Limited", role: "Full Stack Developer Intern", duration: "June 2025 - November 2025", description: "Engineered backend solutions for 3+ production LegalTech/Gov projects serving 10k+ users. Architected modular APIs using Node.js/Express, reducing response latency by 40% via MongoDB indexing." }
    ]);

    await Skill.insertMany([
      { name: "React.js", category: "Frontend" },
      { name: "Next.js", category: "Frontend" },
      { name: "Tailwind CSS", category: "Frontend" },
      { name: "Node.js", category: "Backend" },
      { name: "Express.js", category: "Backend" },
      { name: "Microservices", category: "Backend" },
      { name: "Kafka", category: "Backend" },
      { name: "MongoDB", category: "Database" },
      { name: "Firebase", category: "Database" },
      { name: "Data Structures & Algorithms", category: "Core CS" }
    ]);

    await Profile.create({
      tagline: "Engineering Intelligent Solutions",
      bio: "I am Aman Dwivedi, a Full Stack Developer currently pursuing a Bachelor of Technology in Computer Science (Specialization AI/ML) at Dr. A.P.J. Abdul Kalam Technical University (AKTU). From automating workflows for local businesses to architecting event-driven microservices with NestJS and Kafka, I thrive on building scalable, resilient, and highly performant digital solutions.",
      email: "amandwivedi@example.com",
      phone: "+91 12345 67890"
    });

    console.log("Data Seeded!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
