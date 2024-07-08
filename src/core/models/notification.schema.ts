import { Prop, Schema } from "@nestjs/mongoose";
import { AbstractSchema } from "./abstract.schema";
import { Types } from "mongoose";
import { User } from "./user.schemas";

@Schema({ timestamps: true })
export class Notification extends AbstractSchema {

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop({ type: Types.ObjectId, ref: User.name })
    user: Types.ObjectId;
}