import bodyParser from "body-parser";
import express from 'express';
import path from 'path';

import {UserController, UploadController, DialogController, MessageController} from "../controllers";
import {checkAuth, updateLastSeen} from '../middlewares';
import {loginValidation, registerValidation} from '../utils/validations';
import multer from "./multer";

export default (app: any, io: any) => {

    const userController = new UserController(io);
    const dialogController = new DialogController(io);
    const messageController = new MessageController(io);
    const uploadController = new UploadController();

    app.use(bodyParser.json());
    app.use('/temp/upload', express.static(path.join('temp/upload')));
    app.get("/user/", checkAuth, updateLastSeen, userController.getMe);
    app.get("/user/verify", checkAuth, updateLastSeen, userController.verify);
    app.get("/user/find", checkAuth, updateLastSeen, userController.userFind);
    app.get("/user/:id", checkAuth, updateLastSeen, userController.show);
    app.post("/user/register", registerValidation, userController.create);
    app.post("/user/login", loginValidation, userController.login);
    app.delete("/user/:id", checkAuth, updateLastSeen, userController.delete);

    app.get("/dialogs", checkAuth, updateLastSeen, dialogController.index);
    app.delete("/dialogs/:id", checkAuth, updateLastSeen, dialogController.delete);
    app.post("/dialogs/create", checkAuth, updateLastSeen, dialogController.create);

    app.get("/messages", checkAuth, updateLastSeen, messageController.index);
    app.post("/messages", checkAuth, updateLastSeen, messageController.create);
    app.delete("/messages/:id", checkAuth, updateLastSeen, messageController.delete);

    app.post("/files", checkAuth, multer.single("attachments"), updateLastSeen, uploadController.create);
    app.delete("/files", checkAuth, updateLastSeen, uploadController.delete);
}