import express from "express";
import { getMessages, createMessage, updateMessage, deleteMessage } from "../controllers/message.controller.js";

const router = express.Router();

// Allow public to POST a message, and admin to GET/PUT/DELETE
router.route("/").get(getMessages).post(createMessage);
router.route("/:id").put(updateMessage).delete(deleteMessage);

export default router;
