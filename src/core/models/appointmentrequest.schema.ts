import { Prop, Schema } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { User } from "./user.schemas";
import { Doctor } from "./doctor.schema";
import { AbstractSchema } from "./abstract.schema";


@Schema()
export class AppointmentRequest extends AbstractSchema {

    @Prop({ type: Types.ObjectId, ref: User.name })
    patient: Types.ObjectId

    @Prop({ type: Types.ObjectId, ref: Doctor.name })
    doctor: Types.ObjectId

    @Prop()
    status: "Pending" | "Approved" | "Refused"

}