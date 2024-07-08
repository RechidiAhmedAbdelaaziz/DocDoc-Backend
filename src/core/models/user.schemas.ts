import { Prop, Schema } from "@nestjs/mongoose";
import { AbstractSchema } from "./abstract.schema";

@Schema({
    _id: true,
})
export class User extends AbstractSchema {

    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    pic: string;

    @Prop()
    phone: string;

    @Prop({ select: false })
    password: string;

    @Prop({ default: true })
    isActive: boolean;

    @Prop()
    gender: "Male" | "Female";

}
