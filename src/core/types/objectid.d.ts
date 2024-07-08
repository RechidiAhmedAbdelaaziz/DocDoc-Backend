import { Types } from "mongoose";

export { }

declare global {
    namespace Types {
        export class ObjectId {

            equlals(id: Types.ObjectId): boolean {
                return this.toHexString() === id.toHexString()
            }
        }
    }
}