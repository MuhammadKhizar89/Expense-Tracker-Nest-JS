import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    signup() {
        return 'signup';
    }
    signin() {
        return 'signin';
    }
}
