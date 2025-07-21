import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from 'src/dto/user.dto';
import tryCatch from 'src/utils/tryCatch';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post('signup')
    signup(@Body() body: UserDTO) {
        console.log(body);
        return tryCatch(() => this.userService.signup(body));
    }


    @Post('signin')
    signin() {
        return this.userService.signin();
    }
}
