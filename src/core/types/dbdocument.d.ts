import { Document } from "mongoose";

export type DbDocument<T> = Document<unknown, {}, T> & T & Required<{
    _id: Types.ObjectId;
}>