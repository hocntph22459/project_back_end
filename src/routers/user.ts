import express from "express";
import { checkPermission } from "../middlewares/CheckPermission";
import {  getAllUser, getOneUser, removeUser, updateUser } from "../controllers/user";
const RouterUser = express.Router();

RouterUser.get("/", getAllUser);
RouterUser.get("/:id", getOneUser);
RouterUser.put("/:id",checkPermission, updateUser);
RouterUser.delete("/:id",checkPermission, removeUser);

export default RouterUser; 