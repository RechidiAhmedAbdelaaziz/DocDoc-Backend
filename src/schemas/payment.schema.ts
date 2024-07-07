import { Prop, Schema } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { UserEntity } from "./user.schemas";


@Schema()
export class PaymentEntity extends Document {



    @Prop({ type: Types.ObjectId, ref: UserEntity.name })
    user: Types.ObjectId

    @Prop()
    type: "Visa" | "MasterCard" | "Paypal"

    @Prop()
    cardNumber: string

    @Prop()
    expirationDate: Date

    @Prop()
    cvv: string

    @Prop()
    amount: number
    
    @Prop()
    status: "Pending" | "Approved" | "Refused"
}
