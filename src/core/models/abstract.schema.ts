import { Prop, Schema } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema()
export abstract class AbstractSchema extends Document<Types.ObjectId> {


}