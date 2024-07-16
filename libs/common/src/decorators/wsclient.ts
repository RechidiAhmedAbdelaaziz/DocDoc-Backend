import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Socket } from "socket.io";
import { JwtPayload } from "..";


export const WsClient = createParamDecorator((data: any, context: ExecutionContext): JwtPayload => {
    const client = context.switchToWs().getClient<Socket>();
    return client.user;
});