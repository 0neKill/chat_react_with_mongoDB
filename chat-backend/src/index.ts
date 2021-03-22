import express from 'express';
import dotenv from 'dotenv';
import {createServer} from 'http';
import DataBase from './core/db';

import createRoutes from "./core/routes";
import createSocket from './core/socket';

const app = express();
const http = createServer(app);
const io = createSocket(http);


createRoutes(app, io);
dotenv.config();

DataBase.then(() => http.listen(process.env.PORT, () => {
    console.log(`Server is running: ${process.env.PORT} port`)
}))
    .catch(() => console.log('DB dont work!'))

