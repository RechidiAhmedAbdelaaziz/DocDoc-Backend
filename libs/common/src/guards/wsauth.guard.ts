import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ParseMonogoIdPipe } from '..';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Injectable()
export class WsAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {

    }
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {

        const client = context.switchToWs().getClient<Socket>();

        return WsAuthGuard.verify(client);

    }

    static verify(client: Socket) {
        const token = client.handshake.headers.authorization?.split(' ')[1];

        if (!token) {
            client.disconnect();
            throw new WsException('Invalid token');
        }

        try {
            const decoded = new JwtService({ secret: process.env.JWT_SECRET }).verify(token);
            const id = new ParseMonogoIdPipe().transform(decoded.id, { type: 'param' });
            client.user = { id };
            return true;
        } catch (error) {
            client.disconnect();
            throw new WsException('Invalid token');
        }

    }
}