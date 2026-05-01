import Experience from "../models/experience.model.js";

export const getExperiences = async (req, res) => {
  try {
    const items = await Experience.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createExperience = async (req, res) => {
  try {
    const item = await Experience.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateExperience = async (req, res) => {
  try {
    const item = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: "Experience not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteExperience = async (req, res) => {
  try {
    const item = await Experience.findById(req.params.id);
    if (item) {
      await item.deleteOne();
      res.json({ message: "Experience removed" });
    } else {
      res.status(404).json({ message: "Experience not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
