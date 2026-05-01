import Message from "../models/message.model.js";

export const getMessages = async (req, res) => {
  try {
    const items = await Message.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createMessage = async (req, res) => {
  try {
    const item = await Message.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMessage = async (req, res) => {
  try {
    const item = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: "Message not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const item = await Message.findById(req.params.id);
    if (item) {
      await item.deleteOne();
      res.json({ message: "Message removed" });
    } else {
      res.status(404).json({ message: "Message not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
