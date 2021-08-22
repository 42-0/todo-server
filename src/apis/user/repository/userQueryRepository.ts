import { PrismaService } from '../../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { SignupRequest } from '../../auth/dto/request/signup.request';

@Injectable()
export class UserQueryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        profileImage: true,
        uuid: true,
      },
    });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async create(signupRequest: SignupRequest, hash, uuid) {
    return await this.prisma.user.create({
      data: {
        firstName: signupRequest.firstName,
        lastName: signupRequest.lastName,
        email: signupRequest.email,
        password: hash,
        uuid: uuid,
      },
    });
  }

  async findByIdAll(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }
}
