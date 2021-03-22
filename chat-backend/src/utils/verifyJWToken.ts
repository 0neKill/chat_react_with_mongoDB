import jwt from 'jsonwebtoken';
import {IUser} from '../models/User'

export default (token: string) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET || "", (err, date) => {
            if (err || !date) return reject(err);
            return resolve(date);
        })
    })
}