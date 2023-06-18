import express from "express";
import { checkPermission } from "../middlewares/CheckPermission";
import { createHashTag, getAllHashTag, getOneHashTag, removeHashTag, updateHashTag } from "../controllers/hashtag";
const RouterHashTag = express.Router();

RouterHashTag.get("/", getAllHashTag);
RouterHashTag.get("/:id", getOneHashTag);
RouterHashTag.post("/", createHashTag);
RouterHashTag.put("/:id", checkPermission, updateHashTag);
RouterHashTag.delete("/:id", checkPermission, removeHashTag);

export default RouterHashTag; 