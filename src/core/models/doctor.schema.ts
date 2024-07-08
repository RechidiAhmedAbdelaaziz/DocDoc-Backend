import { Prop, Schema } from "@nestjs/mongoose";
import { User } from "./user.schemas";


@Schema()
export class Doctor extends User {

    @Prop()
    description: string;

    @Prop()
    isAvailable: boolean;

    @Prop()
    role: "Doctor" | "Dentist" | "Hairdresser" | "Personal Trainer"

    @Prop()
    rating: {
        avrege: number
        total: number
        count: number
    }

    @Prop()
    location: {
        city: string
        state: string
        country: string
    }


}