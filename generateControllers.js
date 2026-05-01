import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resources = ['Experience', 'Skill', 'Freelance', 'Message'];

resources.forEach(resName => {
    const lowerName = resName.toLowerCase();
    
    // Controller content
    const controllerContent = `import ${resName} from "../models/${lowerName}.model.js";

export const get${resName}s = async (req, res) => {
  try {
    const items = await ${resName}.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const create${resName} = async (req, res) => {
  try {
    const item = await ${resName}.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const update${resName} = async (req, res) => {
  try {
    const item = await ${resName}.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: "${resName} not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const delete${resName} = async (req, res) => {
  try {
    const item = await ${resName}.findById(req.params.id);
    if (item) {
      await item.deleteOne();
      res.json({ message: "${resName} removed" });
    } else {
      res.status(404).json({ message: "${resName} not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
`;

    // Route content
    let routeContent = `import express from "express";
import { get${resName}s, create${resName}, update${resName}, delete${resName} } from "../controllers/${lowerName}.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/").get(get${resName}s).post(protect, create${resName});
router.route("/:id").put(protect, update${resName}).delete(protect, delete${resName});

export default router;
`;

    if(resName === 'Message'){
        routeContent = `import express from "express";
import { getMessages, createMessage, updateMessage, deleteMessage } from "../controllers/message.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Allow public to POST a message
router.route("/").get(protect, getMessages).post(createMessage);
router.route("/:id").put(protect, updateMessage).delete(protect, deleteMessage);

export default router;
`;
    }

    fs.writeFileSync(path.join(__dirname, 'controllers', `${lowerName}.controller.js`), controllerContent);
    fs.writeFileSync(path.join(__dirname, 'routes', `${lowerName}.route.js`), routeContent);
});

console.log("ES modules generated");
