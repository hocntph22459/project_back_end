import express from "express";
import Router from "./routers/index.js";
import cors from "cors"
import morgan from 'morgan';
import http from "http"
// import bodyParser  from "body-parser"
import Connectdb from "./config/ConnectDB.js";
import { realTimeSocketIo } from "./config/socketio.js";

// config
const app = express();
const server = http.createServer(app);

// middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());

//router
app.use("/api", Router);

// connect to db
Connectdb()

server.listen(8080, () => {
	console.log('server running port 8080');
});

/* socket */
realTimeSocketIo(server);