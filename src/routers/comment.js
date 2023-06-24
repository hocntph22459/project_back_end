import express from "express";
import { checkPermission } from "../middlewares/CheckPermission.js";
import { createComment, getAllComment, getOneComment, removeComment, updateComment } from "../controllers/comment.js";
const RouterComment = express.Router();

RouterComment.get("/", getAllComment);
RouterComment.get("/:id", getOneComment);
RouterComment.post("/", createComment);
RouterComment.put("/:id",checkPermission, updateComment);
RouterComment.delete("/:id",checkPermission, removeComment);

export default RouterComment; 