import { PrismaService } from '../../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { SignupRequest } from '../../auth/dto/request/signup.request';

@Injectable()
export class UserQueryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number) {
    return await this.prisma.users.findUnique({
      // include: {
      //   company_info: {
      //     select: {
      //       type: true,
      //       status: true,
      //     },
      //   },
      // },
      where: {
        id: id,
      },
    });
  }

  async findByEmail(email: string) {
    return await this.prisma.users.findUnique({
      where: {
        email: email,
      },
    });
  }

  async create(signupRequest: SignupRequest, hash, uuid) {
    return await this.prisma.users.create({
      data: {
        firstName: signupRequest.firstName,
        lastName: signupRequest.lastName,
        email: signupRequest.email,
        password: hash,
        uuid: uuid,
      },
    });
  }
}
