import Freelance from "../models/freelance.model.js";

export const getFreelances = async (req, res) => {
  try {
    const items = await Freelance.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createFreelance = async (req, res) => {
  try {
    const item = await Freelance.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateFreelance = async (req, res) => {
  try {
    const item = await Freelance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: "Freelance not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFreelance = async (req, res) => {
  try {
    const item = await Freelance.findById(req.params.id);
    if (item) {
      await item.deleteOne();
      res.json({ message: "Freelance removed" });
    } else {
      res.status(404).json({ message: "Freelance not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
