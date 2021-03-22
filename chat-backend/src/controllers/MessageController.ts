import express from "express";
import socket from 'socket.io';

import {DialogSchema, MessageSchema} from "../models";

export default class MessageController {
    io: socket.Server;

    constructor(io: socket.Server) {
        this.io = io;
    }

    index = (req: any, res: express.Response): void => {
        const dialogId: any = req.query.dialog;
        MessageSchema.updateMany({
            dialog: dialogId,
            user: {$ne: req.user._id}
        }, {$set: {isRead: true}}, (err: any, result: any) => {
            if (err) {
                return {
                    status: 'error',
                    message: err
                }
            }
        })

        MessageSchema.find({dialog: dialogId})
            .populate(['dialog', 'user', 'attachments'],)
            .exec()
            .then((messages: any) => res.status(200).json(messages))
            .catch(() => res.status(404).json({message: 'Messages not found'}))

    };

    create = (req: any, res: express.Response): void => {

        const {dialog, text, attachments} = req.body;
        console.log(attachments)
        new MessageSchema({dialog, text, user: req.user._id, attachments: attachments})
            .save()
            .then((obj: any) => {
                obj.populate(['dialog', 'user', 'attachments'], (err: any, message: any) => {
                    if (err) {
                        return res.status(500).json({
                            message: err
                        });
                    }
                    DialogSchema.findOneAndUpdate(
                        {_id: dialog},
                        {lastMessage: message._id},
                        {upsert: true}, err => {
                            if (err) {
                                return res.status(500).json({
                                    status: "error",
                                    message: err,
                                });
                            }
                        })

                    res.status(200).json({message: message});
                    this.io.emit('SERVER:NEW_MESSAGE', message);
                })
            })
            .catch((err: any) => (res.status(404).json({message: 'Not created message' + err})))
    };
    delete = (req: any, res: any): void => {
        const id: string = req.params.id;
        MessageSchema.findOneAndDelete({_id: id, user: req.user._id})
            .populate('dialog')
            .then((message: any) => {
                const messageId: string = message._id.toString();
                const lastMessageId: string = message.dialog.lastMessage.toString();
                if (messageId === lastMessageId) {
                    return MessageSchema
                        .find({dialog: message.dialog._id})
                        .then((messages: any) => {
                            return DialogSchema.findOne({_id: message.dialog._id})
                                .then((dialog: any) => {
                                    if (messages.length <= 0) {
                                        return DialogSchema.findOneAndUpdate({_id: message.dialog._id}, {$unset: {lastMessage: ''}})
                                            .then(() => {
                                                this.io.emit('SERVER:DELETE_MESSAGE', messageId);
                                                return res.status(200).json({message: `Message deleted123123 `})
                                            })
                                    }
                                    dialog.lastMessage = messages[messages.length - 1]._id;
                                    dialog
                                        .save()
                                        .then(() => {
                                            this.io.emit('SERVER:DELETE_MESSAGE', messageId);
                                            return res.status(200).json({message: `Message deleted123123 `})
                                        })
                                        .catch(() => {
                                            return res.json({message: 'Message not found'});
                                        })
                                })
                        })
                }
                if (message) {
                    this.io.emit('SERVER:DELETE_MESSAGE', messageId);
                    return res.status(200).json({message: `Message deleted `})
                }
                return res.json({message: 'Message not found'});
            })
            .catch(() => (res.json({message: 'Message not found'})));
    };
}