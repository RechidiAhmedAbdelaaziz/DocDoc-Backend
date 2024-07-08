import { JwtPayload } from "@app/common";

export { }

declare global {
    namespace Express {
        export interface Request {
            user?: JwtPayload;
        }
    }
}