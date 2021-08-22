import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { UserQueryRepository } from './repository/userQueryRepository';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, UserQueryRepository],
})
export class UserModule {}
