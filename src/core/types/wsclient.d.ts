import { JwtPayload } from '@app/common';
import { Types } from 'mongoose';
import { Socket } from 'socket.io';

export { }

//add user property to socket
declare module 'socket.io' {
    interface Socket {
        user: JwtPayload;
    }
}