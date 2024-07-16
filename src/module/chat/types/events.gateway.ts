import { Types } from "mongoose";
import { Message } from "src/core/models/message.schema";
import { DbDocument } from "src/core/types/dbdocument";

export interface ServerToClientEvents {
    newMessage: (payload: DbDocument<Message>) => void
    messageSeen: (messageId: Types.ObjectId) => void
}