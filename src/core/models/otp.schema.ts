import { Prop, Schema } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { User } from "./user.schemas";
import { AbstractSchema } from "./abstract.schema";

@Schema()
export class Otp extends AbstractSchema {

    @Prop({ type: Types.ObjectId, ref: User.name })
    user: Types.ObjectId

    @Prop()
    otp: number

    @Prop({ index: { expireAfterSeconds: 1 } })
    expiresAt: Date
}