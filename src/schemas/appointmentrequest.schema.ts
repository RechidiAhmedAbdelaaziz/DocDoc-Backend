import { Prop, Schema } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { UserEntity } from "./user.schemas";
import { DoctorEntity } from "./doctor.schema";


@Schema()
export class AppointmentRequestEntity extends Document {

    @Prop({ type: Types.ObjectId, ref: UserEntity.name })
    patient: Types.ObjectId

    @Prop({ type: Types.ObjectId, ref: DoctorEntity.name })
    doctor: Types.ObjectId

    @Prop()
    status: "Pending" | "Approved" | "Refused"

}