import express from "express";
import Router from "./routers";
import cors from "cors"
import Connectdb from "./config/ConnectDB";
// config
const app = express();

// middleware
app.use(express.json());
app.use(cors());

//router
app.use("/api", Router); 

// connect to db
Connectdb()

export const viteNodeApp = app;
