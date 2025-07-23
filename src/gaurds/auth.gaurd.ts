import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import tryCatch from 'src/utils/tryCatch';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): Promise<boolean> | boolean {
        return tryCatch(async () => {
            const request = context.switchToHttp().getRequest();
            const token = request.cookies['token'];
            if (!token) {
                throw new HttpException('Unauthorized: No token provided', HttpStatus.UNAUTHORIZED);
            }
            const payload = jwt.verify(token, process.env.JWT_SECRET as string);
            if (!payload) {
                throw new HttpException('Unauthorized: Invalid token', HttpStatus.UNAUTHORIZED);
            }
            request['userId'] = payload['id'];
            return true;
        });

    }
}
