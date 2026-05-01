import mongoose from "mongoose";
import dotenv from "dotenv";
import Profile from "./models/profile.model.js";
import Project from "./models/project.model.js";
import Experience from "./models/experience.model.js";
import Skill from "./models/skill.model.js";

dotenv.config();

const uploadData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for Upload Sequence...");

    // Clear existing data across the board
    await Profile.deleteMany();
    await Project.deleteMany();
    await Experience.deleteMany();
    await Skill.deleteMany();

    // 1. Profile Data
    await Profile.create({
      tagline: "Full Stack Developer",
      bio: "Full Stack Developer with 1+ year of production experience building scalable web applications using Node.js, Next.js, and React.js. Delivered end-to-end solutions across LegalTech, EdTech, and Solar Energy domains, serving 1,000+ users with measurable performance and productivity improvements.",
      email: "0786ad2000@gmail.com",
      phone: "9569065009",
    });

    // 2. Experience Data
    await Experience.insertMany([
      {
        company: "Self Employed",
        role: "Freelance Full Stack Developer",
        duration: "December 2025 - Present",
        description: "- Delivered end-to-end web solutions for multiple businesses, automating workflows and reducing manual data handling.\n- Built scalable full-stack applications with admin dashboards to manage inventory, leads, income, and operational workflows.\n- Developed solutions for diverse domains including solar energy, fitness, retail, and education sectors.\n- Key Clients/Projects: Raventra Solar Energy Platform, Warrior's Fitness (Gym Website), Tapasya Sports Shop, R.S. Library Management System, and more."
      },
      {
        company: "Difmo Private Limited",
        role: "Full Stack Developer",
        duration: "Jun 2025 - Nov 2025",
        description: "- Engineered backend solutions for 3+ production LegalTech/Gov projects (including PMAY), serving 1k+ users.\n- Architected modular APIs using Node.js/Express, reducing response latency by 40% via MongoDB indexing.\n- Implemented robust security (JWT, RBAC) and centralized error handling, cutting debugging time by 30%.\n- Collaborated with frontend teams to integrate React/Next.js interfaces, ensuring 99.9% system uptime."
      }
    ]);

    // 3. Projects Data
    await Project.insertMany([
      {
        title: "Raventra Solar Platform",
        description: "- Designed a responsive landing page and client portal featuring solar calculator tools.\n- Managed the full deployment lifecycle on Vercel and Shared Hosting, ensuring consistent uptime for the MVP.",
        techStack: ["Next.js", "Tailwind CSS", "MongoDB", "Node.js"]
      },
      {
        title: "Sajjadhusain Law Associates",
        description: "- Architected a Microservices backend with NestJS, using Kafka for event-driven communication between 5+ services.\n- Processed asynchronous legal workflows efficiently, improving system throughput by 3x vs. monolithic approach.",
        techStack: ["NestJS", "Microservices", "Kafka"]
      },
      {
        title: "Coding of World",
        description: "- Launched an e-learning platform with custom CMS, currently supporting content for 200+ active learners.\n- Integrated dynamic course management and secure authentication, boosting user retention by 25%.",
        techStack: ["Full-stack Web Development"]
      },
      {
        title: "Akshat Pragati",
        description: "- Developed a CRM for 100+ users, replacing manual Excel tracking and saving 15+ hours/week.\n- Leveraged Firebase listeners for real-time updates and optimized React rendering for 20% faster load times.",
        techStack: ["React.js", "Firebase", "Real-time DB"]
      }
    ]);

    // 4. Skills Data
    await Skill.insertMany([
      { name: "JavaScript (ES6+)", category: "Programming Languages" },
      { name: "Java", category: "Programming Languages" },
      
      { name: "Node.js", category: "Backend & Architecture" },
      { name: "Express.js", category: "Backend & Architecture" },
      { name: "NestJS", category: "Backend & Architecture" },
      { name: "Microservices", category: "Backend & Architecture" },
      { name: "Kafka", category: "Backend & Architecture" },
      { name: "RESTful APIs", category: "Backend & Architecture" },
      { name: "JWT", category: "Backend & Architecture" },
      { name: "API Gateway", category: "Backend & Architecture" },

      { name: "Next.js (SSR/App Router)", category: "Frontend" },
      { name: "React.js", category: "Frontend" },
      { name: "HTML5", category: "Frontend" },
      { name: "CSS3", category: "Frontend" },
      { name: "Tailwind CSS", category: "Frontend" },

      { name: "MongoDB (Aggregation/Indexing)", category: "Databases" },
      { name: "Mongoose", category: "Databases" },
      { name: "Firebase Firestore", category: "Databases" },

      { name: "Docker", category: "DevOps & Tools" },
      { name: "Docker Compose", category: "DevOps & Tools" },
      { name: "Git", category: "DevOps & Tools" },
      { name: "GitHub", category: "DevOps & Tools" },
      { name: "Postman", category: "DevOps & Tools" },
      { name: "VS Code", category: "DevOps & Tools" },

      { name: "Data Structures & Algorithms (350+ Problems Solved)", category: "Core CS" },
      { name: "DBMS", category: "Core CS" },
      { name: "OS", category: "Core CS" },
      { name: "System Design", category: "Core CS" }
    ]);

    console.log("All resume content has been successfully uploaded to the database!");
    process.exit(0);
  } catch (error) {
    console.error("Upload failed", error);
    process.exit(1);
  }
};

uploadData();
