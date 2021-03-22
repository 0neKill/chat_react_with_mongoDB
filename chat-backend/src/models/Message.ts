import {Schema, model, Document} from 'mongoose';


interface IMessage extends Document {
    dialog?: { type: Schema.Types.ObjectId, ref: string, };
    text?: { type: string };
    isRead?: boolean;
    attachments?: [{ type: Schema.Types.ObjectId, ref: string }]

}

export default model<IMessage>('Message', new Schema<IMessage>({
    dialog: {
        type: Schema.Types.ObjectId,
        ref: 'Dialog',
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    text: {
        type: String,
        // required: true,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    attachments: [{ type: Schema.Types.ObjectId, ref: "UploadedFile" }]
}, {timestamps: true}));