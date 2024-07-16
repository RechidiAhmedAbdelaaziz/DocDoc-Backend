import { Prop, Schema as ISchema } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@ISchema()
export abstract class AbstractSchema extends Document<Types.ObjectId> {


}