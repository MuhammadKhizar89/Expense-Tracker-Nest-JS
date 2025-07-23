import { Body, Controller, Post, Res } from '@nestjs/common';
import { signInDTO, signUpDTO } from 'src/dto/auth.dto';
import tryCatch from 'src/utils/tryCatch';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private userService: AuthService) { }

    @Post('signup')
    signup(@Body() body: signUpDTO,@Res({ passthrough: true }) res: Response) {
        console.log(body);
        return tryCatch(() => this.userService.signup(body,res));
    }

    @Post('signin')
    signin(@Body() body: signInDTO, @Res({ passthrough: true }) res: Response) {
        return tryCatch(() => this.userService.signin(body, res));
    }
}
