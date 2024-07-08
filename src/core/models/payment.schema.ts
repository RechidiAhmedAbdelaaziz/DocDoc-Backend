import { Prop, Schema } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "./user.schemas";
import { AbstractSchema } from "./abstract.schema";


@Schema()
export class Payment extends AbstractSchema {



    @Prop({ type: Types.ObjectId, ref: User.name })
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
