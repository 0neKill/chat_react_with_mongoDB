import express from 'express';
import socket from "socket.io";

import {DialogSchema, MessageSchema} from '../models';

export default class DialogController {
    io: socket.Server;

    constructor(io: socket.Server) {
        this.io = io
    }


    index = (req: any, res: express.Response): void => {
        const userId: any = req.user._id;

        DialogSchema.find()
            .or([{author: userId}, {partner: userId}])
            .populate(['author', 'partner'],)
            .populate({
                path: 'lastMessage',
                populate: {
                    path: 'user'
                }
            })
            .exec()
            .then((dialogs: any) => res.status(200).json(dialogs))
            .catch(() => res.status(404).json({message: 'Dialogs not found'}))
    };

    create = (req: any, res: express.Response): void => {
        const {partner, text} = req.body;
        new DialogSchema({author: req.user._id, partner})
            .save()
            .then((dialogObj: any) => {
                new MessageSchema({
                    user: req.user._id,
                    text: text,
                    dialog: dialogObj._id,
                })
                    .save()
                    .then((message) => {
                        dialogObj.lastMessage = message._id;
                        dialogObj
                            .save()
                            .then((dialog: any) => {
                                res.status(200).json({dialog: dialog,})
                                this.io.emit('SERVER:DIALOG_CREATED', {
                                    author:req.user._id, partner, text, dialog
                                })
                            })
                    })
                    .catch((err: any) => (res.status(404).json({message: 'Not created dialog' + err})))

            })
            .catch((err: any) => (res.status(404).json({message: 'Not created dialog' + err})))
    };
    delete = (req: express.Request, res: express.Response): void => {
        const {id} = req.params;
        DialogSchema.findOneAndDelete({_id: id})
            .then((dialog) => {
                if (dialog) {
                    return res.status(200).json({message: `User deleted ${dialog}`})
                }
                return res.json({message: 'Dialog not found'});
            })
            .catch(() => (res.json({message: 'Dialog not found'})));
    }
}