import {Schema, model, Document} from 'mongoose';

interface IUploadedFile extends Document {
    fileName?: string;
    size?: number;
    ext?: string;
    url?: string;
    user?: { type: Schema.Types.ObjectId, ref: string };
}

export default model<IUploadedFile>('UploadedFile', new Schema<IUploadedFile>({
    fileName: {
        type: Schema.Types.String,
        required: true
    },
    size: {
        type: Schema.Types.Number,
        required: true,
    },
    ext: {
        type: Schema.Types.String,
        required: true,
    },
    url: {
        type: Schema.Types.String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}))