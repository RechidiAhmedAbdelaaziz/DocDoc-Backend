import { Prop, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({})
export class UserEntity extends Document {

    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    pic: string;

    @Prop()
    phone: string;

    @Prop()
    password: string;

    @Prop()
    isActive: boolean;

    @Prop()
    gender: "Male" | "Female";

}
