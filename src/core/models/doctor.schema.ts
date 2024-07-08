import { Prop, Schema } from "@nestjs/mongoose";
import { User } from "./user.schemas";


@Schema()
export class Doctor extends User {

    @Prop()
    description: string;

    @Prop({ default: true })
    isAvailable: boolean;



    @Prop({
        type: {
            avg: { type: Number, default: 0 },
            total: { type: Number, default: 0 },
            count: { type: Number, default: 0 }
        }
    })
    rating: {
        avg: number
        total: number
        count: number
    }

    @Prop({ type: { city: String, state: String, country: String } })
    location: {
        city: string
        state: string
        country: string
    }

    @Prop({ enum: ["Doctor", "Dentist", "Hairdresser", "Personal Trainer", "User"], default: "User" })
    role: "Doctor" | "Dentist" | "Hairdresser" | "Personal Trainer" | "User";
}