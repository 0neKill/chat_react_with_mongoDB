import mongoose from "mongoose";

export default mongoose.connect(
    "mongodb://localhost:27017/chat",
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    },
    (err: any) => {
        if (err) {
            throw Error(err);
        }
    }
);