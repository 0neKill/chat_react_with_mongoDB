import {Schema, model, Document} from 'mongoose';
import isEmail from 'validator';
import differenceInMinutes from 'date-fns/differenceInMinutes';

import {generatePasswordHash} from '../utils';

export interface IUser extends Document {
    email?: string;
    fullname?: string;
    password?: string;
    avatar?: string;
    confirmed?: boolean;
    confirm_hash?: string;
    last_seen?: Date;
}

const UserSchema = new Schema({
    email: {
        type: String,
        required: 'Email is required',
        validate: [isEmail.isEmail, 'Invalid email'],
        unique: true, //Уникальность Эмайла
    },
    fullname: {
        type: String,
        required: 'FullName is required'
    },
    password: {
        type: String,
        required: 'Password is required'
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
    avatar: String,
    confirm_hash: String,
    last_seen: {
        type: Date,
        default: new Date(),
    },
}, {
    timestamps: true, //Добавляет 2 поля create_at: Date, update_at: Date,
})
UserSchema.virtual("isOnline").get(function (this: any) {
    return differenceInMinutes(new Date(), this.last_seen) < 5;
});
UserSchema.set("toJSON", {
    virtuals: true,
});

UserSchema.pre('save', function (next) {
    const user: IUser = this;

    if (!user.isModified('password')) return next();

    generatePasswordHash(user.password)
        .then(hash => {
            user.password = String(hash);
            generatePasswordHash(user.password)
                .then(hash => {
                    user.confirm_hash = String(hash);
                    next();
                })
        })
        .catch(err => {
            next(err);
        });
});
export default model<IUser>('User', UserSchema);