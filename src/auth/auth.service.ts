import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { signInDTO, signUpDTO } from 'src/dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as jwt from 'jsonwebtoken';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) { }

  async signup(body: signUpDTO, res: Response) {
    const existingUser = await this.prismaService.user.findUnique({
      where: { email: body.email },
    });

    if (existingUser) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
    }
    const response = await this.prismaService.user.create({
      data: body,
    });
    const jsonWebToken = jwt.sign(
      { id: response.id },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );
    res.cookie('token', jsonWebToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return {
      success: true,
      message: 'User created successfully',
      data: { name: response.name, email: response.email },
    };
  }

  async signin(body: signInDTO, res: Response) {
    const response = await this.prismaService.user.findUnique({
      where: { email: body.email, password: body.password },
    });
    if (!response) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    const jsonWebToken = jwt.sign(
      { id: response.id },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    )
    res.cookie('token', jsonWebToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return {
      success: true,
      message: 'Sign-in successfully',
      data: { name: response.name, email: response.email },
    };
  }
}
