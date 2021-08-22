import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserQueryRepository } from './repository/userQueryRepository';
import argon2 from 'argon2';
// const argon2 = require('argon2');

import { parse as uuidParse, v4 as uuidv4 } from 'uuid';
import UUIDParse from 'uuid-parse';
// const UUIDParse = require('uuid-parse');

import { SignupRequest } from '../auth/dto/request/signup.request';

@Injectable()
export class UserService {
  constructor(private readonly userQueryRepository: UserQueryRepository) {}

  async getUserInfo(id: number) {
    const user = await this.userQueryRepository.findById(id);
    return {
      ...user,
      uuid: UUIDParse.unparse(user.uuid),
    };
  }

  async login(email: string, password: string) {
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

    // await this.prisma.user.update({
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
}
