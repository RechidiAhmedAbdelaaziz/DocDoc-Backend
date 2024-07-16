import { Prop, Schema } from "@nestjs/mongoose";
import { AbstractSchema } from "./abstract.schema";
import { Doctor } from "./doctor.schema";

@Schema({
    discriminatorKey: 'kind',
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

    @Prop()
    gender: "Male" | "Female";

    @Prop({ required: false, })
    socketId: string;


    // ["name email pic phone isActive gender "]


}
