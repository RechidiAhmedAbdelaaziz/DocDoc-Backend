import { Prop, Schema } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "./user.schemas";
import { Doctor } from "./doctor.schema";
import { AbstractSchema } from "./abstract.schema";

export class Appointment extends AbstractSchema {
    @Prop({ type: Types.ObjectId, ref: User.name })
    patient: Types.ObjectId

    @Prop({ type: Types.ObjectId, ref: Doctor.name })
    doctor: Types.ObjectId

    @Prop()
    status: "Upcoming" | "Completed" | "Canceled"

    @Prop()
    date: Date
}