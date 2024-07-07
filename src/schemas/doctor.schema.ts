import { Prop, Schema } from "@nestjs/mongoose";
import { UserEntity } from "./user.schemas";


@Schema()
export class DoctorEntity extends UserEntity {

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