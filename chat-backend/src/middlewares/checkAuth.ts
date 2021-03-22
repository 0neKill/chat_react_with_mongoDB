import express from 'express';
import {verifyJWToken} from "../utils";
import {IUser} from '../models/User';

export default (req: any, res: any, next: any) => {
    const token = req.get('token');
    if (!token) return res.status(401).json({error: 'Token not provided!'});
    verifyJWToken(token)
        .then((user: any) => {
            req.user = user.data._doc;
            next();
        })
        .catch((err) => res.status(403).json({message: err}))
}