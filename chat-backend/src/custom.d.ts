declare namespace Express {
    import {IUser} from "./models/User";

    export interface Request {
        user?: any;
    }
}