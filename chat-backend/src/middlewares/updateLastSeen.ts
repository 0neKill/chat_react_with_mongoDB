import express from 'express';

import {UserSchema} from '../models'

export default async (req: any, res: express.Response, next: express.NextFunction) => {
    if (req.user) {
        await UserSchema.findOneAndUpdate({_id: req.user._id}, {last_seen: new Date()});
    }
    next();
}