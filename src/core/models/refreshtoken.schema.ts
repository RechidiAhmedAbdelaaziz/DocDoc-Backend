import { Prop, Schema } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "./user.schemas";
import { AbstractSchema } from "./abstract.schema";


@Schema()
export class RefreshToken extends AbstractSchema {

    @Prop()
    token: string;

    @Prop({ type: Types.ObjectId, ref: User.name })
    userId: Types.ObjectId;

    @Prop({ index: { expireAfterSeconds: 1 } })
    expires: Date;
}