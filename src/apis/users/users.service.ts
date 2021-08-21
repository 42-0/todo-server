import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from '@prisma/client';
import { UserQueryRepository } from './repository/userQueryRepository';
// import argon2 from 'argon2';
const argon2 = require('argon2');

import { parse as uuidParse, v4 as uuidv4 } from 'uuid';
import UUIDParse from 'uuid-parse';

import { SignupRequest } from '../auth/dto/request/signup.request';

@Injectable()
export class UsersService {
  constructor(private readonly userQueryRepository: UserQueryRepository) {}

  async findById(id: number) {
    const user: Users = await this.userQueryRepository.findById(id);
    return delete user.password && user;
  }

  async login(email: string, password: string): Promise<Users> {
    const user = await this.userQueryRepository.findByEmail(email);

    if (!user) {
      throw new HttpException('Account not found.', HttpStatus.BAD_REQUEST);
    }

    try {
      const match = await argon2.verify(user.password, password);
      if (!match) {
        throw new HttpException('Incorrect password.', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException('Incorrect password.', HttpStatus.BAD_REQUEST);
    }

    // await this.prisma.users.update({
    //   where: { id: user.id },
    //   data: {
    //     updatedAt: new Date(),
    //   },
    // });

    return user;
  }

  async signup(signupRequest: SignupRequest) {
    const password = await argon2.hash(signupRequest.password);
    try {
      return await this.userQueryRepository.create(
        signupRequest,
        password,
        Buffer.from(uuidParse(uuidv4())),
      );
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'internal_server_error - signup.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
