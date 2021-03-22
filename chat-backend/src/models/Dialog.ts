import {Schema, model, Document} from 'mongoose';

interface IDialog extends Document {
    author?: { type: Schema.Types.ObjectId, ref: string, },
    partner?: { type: Schema.Types.ObjectId, ref: string, },
    lastMessage?: { type: Schema.Types.ObjectId, ref: string, },
}

export default model<IDialog>('Dialog', new Schema<IDialog>({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    partner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    lastMessage: {
        type: Schema.Types.ObjectId,
        ref: 'Message',
    },
}, {timestamps: true}));