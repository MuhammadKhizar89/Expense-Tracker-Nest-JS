import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from 'src/dto/user.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post('signup')
    signup(@Body() body: UserDTO) {
        console.log(body);
        return this.userService.signup();
    }

    @Post('signin')
    signin() {
        return this.userService.signin();
    }
}
