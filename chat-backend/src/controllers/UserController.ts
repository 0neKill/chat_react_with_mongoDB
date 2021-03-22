import express from "express";
import {validationResult} from 'express-validator';
import socket from 'socket.io';
import bcrypt from 'bcrypt';

import createJWToken from "../utils/createJWToken";
import {UserSchema} from '../models';
import has = Reflect.has;


export default class UserController {
    io: socket.Server;

    constructor(io: socket.Server) {
        this.io = io;
    }

    verify = (req: express.Request, res: express.Response) => {
        const hash: any = req.query.hash;
        if (!hash) {
            return res.status(422).json({
                error: 'Invalid hash!'
            });
        }
        UserSchema.findOne({confirm_hash: hash}, (err, user: any) => {
            if (err || !user) {
                return res.status(422).json({
                    message: "Hash not found!"
                });
            }
            user.confirmed = true;
            user.save()
                .then(() => {
                    UserSchema.findOneAndUpdate({_id: user._id}, {$unset: {confirm_hash: ''}})
                        .then(() => {
                            return res.status(200).json({
                                status: 'success',
                                message: 'Аккаунт успешно потвержден!'
                            })
                        })
                })
                .catch(() => {
                    return res.status(404).json({
                        status: "error",
                        message: err,
                    });
                });
        })

    }

    show = (req: express.Request, res: express.Response): void => {
        const id: string = req.params.id;
        UserSchema.findById(id)
            .then((obj) => (res.status(200).json(obj)))
            .catch(() => (res.json({message: 'User not found'})));
    };

    getMe = (req: any, res: express.Response): void => {
        const id: string = req.user._id;
        UserSchema.findById(id)
            .then((obj: any) => {
                return res.status(200).json(obj)
            })
            .catch(() => (res.status(403).json({message: 'User not found'})));
    }

    userFind = (req: any, res: express.Response) => {
        const {query}: any = req.query;
        UserSchema
            .find()
            .or([{fullname: {$regex: query}}, {email: {$regex: query}}])
            .then((User: any) => {
                return res.status(200).json(User);
            })
            .catch(() => {
                return res.status(403).json({message: 'User not found1'});
            })
    }

    delete = (req: express.Request, res: express.Response): void => {
        const id: string = req.params.id;
        UserSchema.findOneAndDelete({_id: id})
            .then((user) => {
                if (user) {
                    return res.status(200).json({message: `User deleted ${user.fullname}`})
                }
                return res.json({message: 'User not found'});
            })
            .catch(() => (res.json({message: 'User not found'})));
    };

    create = (req: express.Request, res: express.Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({error: errors.array()});
        }
        const {email, fullname, password} = req.body;
        const User = new UserSchema({email, fullname, password});
        User.save()
            .then((obj: any) => (res.status(200).json({
                status: 'success',
            })))
            .catch((reason) => (res.status(500).json({
                status: 'error',
                message: reason,
            })))
    }
    login = (req: express.Request, res: express.Response) => {
        const postData = {
            email: req.body.email,
            password: req.body.password
        };
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        UserSchema.findOne({email: postData.email, confirmed: true}, (err, user: any) => {
            if (err || !user) {
                return res.status(422).json({
                    message: "User not found"
                });
            }

            if (bcrypt.compareSync(postData.password, user.password)) {
                const token = createJWToken(user);
                res.json({
                    status: 'success',
                    token,
                });
            } else {
                res.status(404).json({
                    status: 'error',
                    message: 'Incorrect password or email',
                });
            }
        });
    }
}