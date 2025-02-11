import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ParseMonogoIdPipe } from '..';
import { Request } from 'express';

@Injectable()
export class HttpAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {

    }
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest<Request>();

        const token = request.headers.authorization?.split(' ')[1];
        if (!token) throw new BadRequestException('Token not found');

        try {

            const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
            const id = new ParseMonogoIdPipe().transform(decoded.id, { type: 'param' });
            request.user = { id };
            return true;
        } catch (error) {
            console.log(error);
            throw new BadRequestException('Invalid token');
        }

    }


}