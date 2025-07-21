import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDTO } from 'src/dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prismaService:PrismaService) { }
    async signup(body: UserDTO) {
        const existingUser = await this.prismaService.user.findUnique({
            where: { email: body.email }
        });
        if (existingUser) {
            throw new HttpException('Email already exists', HttpStatus.CONFLICT);
        }
        const response = await this.prismaService.user.create({
            data: body
        });
        return {
            success: true,
            message: 'User created successfully',
            data: response
        };
    }
    signin() {
        return 'signin';
    }
}
